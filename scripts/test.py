"""
Grok + X Search (native xAI tool) example.

Uses the Grok Responses API (/v1/responses) with xAI's built-in `x_search`
tool to fetch recent tweets from a specific X account.

IMPORTANT: x_search is a NATIVE tool provided by xAI — it is NOT a custom
function you define yourself. You simply declare {"type": "x_search"} and xAI
handles the search execution internally inside the model call.

Run:
    uv run python scripts/test.py

Required env var in .env at project root:
    XAI_API_KEY=xai-...

──────────────────────────────────────────────────────────────────────────────
FILTERS YOU CAN APPLY VIA THE x_search TOOL PARAMETERS
──────────────────────────────────────────────────────────────────────────────

All filters are passed as fields on the tool object itself (not as a query
string). The full parameter reference:

  ACCOUNT FILTERING  (mutually exclusive — use only one per request)
  ─────────────────
  allowed_x_handles  list[str]  Up to 10 handles. Restricts search to ONLY
                                tweets from these accounts.
                                e.g. ["FabrizioRomano"]

  excluded_x_handles list[str]  Up to 10 handles. Excludes tweets FROM these
                                accounts but searches everything else.
                                e.g. ["someSpamBot"]

  DATE RANGE
  ──────────
  from_date          str        ISO 8601 date (YYYY-MM-DD). Only tweets on or
                                after this date.  e.g. "2026-02-01"

  to_date            str        ISO 8601 date (YYYY-MM-DD). Only tweets before
                                or on this date.  e.g. "2026-02-25"

  MEDIA UNDERSTANDING
  ───────────────────
  enable_image_understanding  bool  Grok will read and analyse images embedded
                                    in matching tweets. Default: false.

  enable_video_understanding  bool  Grok will read and analyse videos embedded
                                    in matching tweets. Exclusive to x_search
                                    (not available for web search). Default: false.

  COMBINING FILTERS (example)
  ────────────────
  {
    "type": "x_search",
    "allowed_x_handles": ["FabrizioRomano"],
    "from_date": "2026-02-01",
    "to_date": "2026-02-25",
    "enable_image_understanding": true
  }
  → Original tweets by Fabrizio Romano in February 2026, with images analysed.

──────────────────────────────────────────────────────────────────────────────
"""

import json
import os

import requests
from dotenv import load_dotenv


# ── Target account ────────────────────────────────────────────────────────────
TARGET_ACCOUNT = "FabrizioRomano"

# ── Grok API settings ─────────────────────────────────────────────────────────
# Native tools (x_search, web_search) use the Responses API, NOT chat/completions.
GROK_RESPONSES_URL = "https://api.x.ai/v1/responses"
GROK_MODEL = "grok-4-1-fast-reasoning"  # x_search requires grok-4 family


def build_x_search_tool() -> dict:
    """
    Returns the x_search tool definition for the Grok Responses API.

    x_search is a NATIVE xAI tool — you only declare its type and configuration
    parameters. xAI executes the search internally; you do not write any search
    logic yourself.
    """
    return {
        "type": "x_search",
        # Restrict search to only this account's tweets.
        "allowed_x_handles": [TARGET_ACCOUNT],
        # Optional date range — remove or adjust as needed.
        # "from_date": "2026-02-01",
        # "to_date": "2026-02-25",
        # Set to True if you want Grok to describe images in the tweets.
        "enable_image_understanding": False,
        # Set to True if you want Grok to describe videos (x_search only).
        "enable_video_understanding": False,
    }


def fetch_tweets_via_grok(api_key: str) -> dict:
    """
    Sends a request to the Grok Responses API with x_search enabled.

    The Responses API uses an `input` list (not `messages`) and returns a
    structured output object (not `choices`).
    """
    payload = {
        "model": GROK_MODEL,
        "input": [
            {
                "role": "user",
                "content": (
                    f"Search X for the 10 most recent tweets from @{TARGET_ACCOUNT}. "
                    "For each tweet include: the tweet text, the date it was posted, "
                    "the number of likes, and the number of retweets. "
                    "Return results as a JSON array."
                ),
            }
        ],
        "tools": [build_x_search_tool()],
        # "temperature" is not supported on the Responses API — omit it.
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

    print(f"Fetching tweets from @{TARGET_ACCOUNT} via Grok ({GROK_MODEL}) …\n")

    raw_response = fetch_tweets_via_grok(api_key)

    # ── Pretty-print the raw API response for inspection ──────────────────────
    print("── Raw Grok Responses API output ────────────────────────────────────")
    print(json.dumps(raw_response, indent=2, ensure_ascii=False))

    # ── Extract and display the model's answer ────────────────────────────────
    # The Responses API returns an `output` list; the last item with role
    # "assistant" contains the final text.
    output_items = raw_response.get("output", [])
    for item in output_items:
        if item.get("role") == "assistant":
            content_blocks = item.get("content", [])
            for block in content_blocks:
                if block.get("type") == "output_text":
                    print("\n── Grok's answer ────────────────────────────────────────────────────")
                    print(block.get("text", ""))
                    break


if __name__ == "__main__":
    main()
