"""
Grok + X Search — handle specified only in the prompt (not in the tool).

The x_search tool is declared with NO allowed_x_handles. The target account
is mentioned only in the natural-language prompt. Grok reads the prompt,
infers the account, and translates it into a `from:<handle>` operator
in its internal query automatically.

This makes the tool fully reusable across any account without ever touching
the tool definition — just change what you ask for in the prompt.

Run:
    uv run python scripts/test2.py

Required env var in .env at project root:
    XAI_API_KEY=xai-...
"""

import json
import os

import requests
from dotenv import load_dotenv


# ── Change this to any X account you want ─────────────────────────────────────
TARGET_ACCOUNT = "FabrizioRomano"

GROK_RESPONSES_URL = "https://api.x.ai/v1/responses"
GROK_MODEL = "grok-4-1-fast-reasoning"  # x_search requires grok-4 family


def build_x_search_tool() -> dict:
    """
    Bare x_search tool with no account restrictions.

    No allowed_x_handles is set — the model picks up the target account
    from the user prompt and applies `from:<handle>` in its internal query.
    """
    return {
        "type": "x_search",
        # allowed_x_handles intentionally omitted — prompt drives the account.
        "enable_image_understanding": False,
        "enable_video_understanding": False,
    }


def fetch_tweets_via_grok(api_key: str) -> dict:
    """
    Sends a Responses API request where the X handle lives only in the prompt.

    Grok receives a generic x_search tool (no handle pinned) and a prompt
    that names the account. It infers `from:FabrizioRomano` (or whichever
    account is mentioned) and fires the search internally.
    """
    payload = {
        "model": GROK_MODEL,
        "input": [
            {
                "role": "user",
                "content": (
                    f"Search X for the 10 most recent tweets posted by @{TARGET_ACCOUNT}. "
                    "For each tweet include: the tweet text, the date it was posted, "
                    "the number of likes, and the number of retweets. "
                    "Return results as a JSON array."
                ),
            }
        ],
        "tools": [build_x_search_tool()],
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    response = requests.post(
        GROK_RESPONSES_URL, headers=headers, json=payload, timeout=60
    )
    if not response.ok:
        print(f"API error {response.status_code}:", json.dumps(response.json(), indent=2))
    response.raise_for_status()
    return response.json()


def main():
    load_dotenv()
    api_key = os.getenv("XAI_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "XAI_API_KEY is not set. Add it to your .env file at the project root."
        )

    print(f"Fetching tweets from @{TARGET_ACCOUNT} via Grok ({GROK_MODEL}) …")
    print("(Handle passed only via prompt — not set in the tool definition)\n")

    raw_response = fetch_tweets_via_grok(api_key)

    # ── Show the internal query Grok generated from the prompt ────────────────
    output_items = raw_response.get("output", [])
    for item in output_items:
        if item.get("type") == "custom_tool_call":
            print("── Internal query Grok generated from the prompt ────────────────────")
            print(json.dumps(json.loads(item["input"]), indent=2))
            print()

    # ── Show the final structured tweet list ──────────────────────────────────
    for item in output_items:
        if item.get("role") == "assistant":
            for block in item.get("content", []):
                if block.get("type") == "output_text":
                    print("── Tweets fetched ───────────────────────────────────────────────────")
                    try:
                        parsed = json.loads(block["text"])
                        print(json.dumps(parsed, indent=2, ensure_ascii=False))
                    except json.JSONDecodeError:
                        print(block["text"])


if __name__ == "__main__":
    main()
