"""
Tweet pipeline: fetch → summarise → compose.

Stage 1 — Fetch: Uses Grok x_search (Responses API) to retrieve recent tweets
          from a target account.
Stage 2 — Generate: Passes those tweets to Grok (Chat Completions API) to
          write a single, original summary tweet in different phrasing,
          under 280 characters.

Run:
    uv run python scripts/test4.py

Required env var in .env at project root:
    XAI_API_KEY=xai-...
"""

import json
import os

import requests
from dotenv import load_dotenv


# ── Config ────────────────────────────────────────────────────────────────────
TARGET_ACCOUNT = "FabrizioRomano"
TWEET_COUNT = 5                         # how many source tweets to fetch
MAX_TWEET_CHARS = 280                   # X's hard character limit
MAX_RETRIES = 3                         # retries if Grok exceeds 280 chars

GROK_RESPONSES_URL = "https://api.x.ai/v1/responses"
GROK_CHAT_URL = "https://api.x.ai/v1/chat/completions"
GROK_SEARCH_MODEL = "grok-4-1-fast-reasoning"  # x_search requires grok-4 family
GROK_WRITE_MODEL = "grok-3"                     # plain text generation — grok-3 is fine


# ── Stage 1: Fetch tweets via x_search ───────────────────────────────────────

def fetch_tweets(api_key: str) -> list[dict]:
    """
    Retrieves recent tweets from TARGET_ACCOUNT using Grok's native x_search.

    Returns a list of dicts with keys: text, date, likes, retweets.
    """
    payload = {
        "model": GROK_SEARCH_MODEL,
        "input": [
            {
                "role": "user",
                "content": (
                    f"Get the {TWEET_COUNT} most recent tweets from @{TARGET_ACCOUNT}. "
                    "Return ONLY a raw JSON array — no prose, no markdown fences. "
                    "Each element must have: text (string), date (string), "
                    "likes (integer), retweets (integer)."
                ),
            }
        ],
        "tools": [
            {
                "type": "x_search",
                "allowed_x_handles": [TARGET_ACCOUNT],
                "enable_image_understanding": False,
                "enable_video_understanding": False,
            }
        ],
    }

    response = requests.post(
        GROK_RESPONSES_URL,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        json=payload,
        timeout=60,
    )
    if not response.ok:
        print("Fetch error:", json.dumps(response.json(), indent=2))
    response.raise_for_status()

    raw = response.json()
    for item in raw.get("output", []):
        if item.get("role") == "assistant":
            for block in item.get("content", []):
                if block.get("type") == "output_text":
                    text = block["text"].strip().strip("```json").strip("```").strip()
                    try:
                        return json.loads(text)
                    except json.JSONDecodeError:
                        print("Could not parse fetched tweets as JSON.")
                        return []
    return []


# ── Stage 2: Generate a summary tweet ────────────────────────────────────────

def generate_summary_tweet(api_key: str, tweets: list[dict]) -> str:
    """
    Takes the fetched tweets and asks Grok to compose one original summary
    tweet — different phrasing, under 280 characters, no hashtags.

    Retries up to MAX_RETRIES times if the output exceeds 280 chars.
    """
    # Format the source tweets as a numbered list for the prompt
    source_text = "\n".join(
        f"{i+1}. [{t.get('date', '')}] {t.get('text', '').strip()}"
        for i, t in enumerate(tweets)
    )

    system_prompt = (
        "You are a football news reporter with 400k+ followers on X. "
        "Your writing style is punchy, authoritative, and concise. "
        "You rephrase breaking news in your own voice — never quoting directly. "
        "You never use hashtags. You never exceed 280 characters."
    )

    user_prompt = (
        f"Here are the latest tweets from @{TARGET_ACCOUNT}:\n\n"
        f"{source_text}\n\n"
        "Write ONE tweet that summarises the most newsworthy stories above. "
        "Rules:\n"
        "- Use completely different wording from the originals\n"
        "- Maximum 280 characters (count carefully)\n"
        "- No hashtags\n"
        "- No emojis unless they add clear value\n"
        "- Sound like a confident reporter breaking the news yourself\n"
        "Reply with ONLY the tweet text — nothing else."
    )

    for attempt in range(1, MAX_RETRIES + 1):
        response = requests.post(
            GROK_CHAT_URL,
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json={
                "model": GROK_WRITE_MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.7,
            },
            timeout=60,
        )
        if not response.ok:
            print("Generate error:", json.dumps(response.json(), indent=2))
        response.raise_for_status()

        candidate = (
            response.json()
            .get("choices", [{}])[0]
            .get("message", {})
            .get("content", "")
            .strip()
        )

        if len(candidate) <= MAX_TWEET_CHARS:
            return candidate

        print(f"  [Attempt {attempt}] Generated tweet was {len(candidate)} chars — retrying …")
        # Tell Grok on the next attempt that it was too long
        user_prompt += f"\n\nYour previous attempt was {len(candidate)} characters. Be shorter."

    # If still too long after retries, hard-truncate at the last word boundary
    truncated = candidate[:MAX_TWEET_CHARS].rsplit(" ", 1)[0]
    print(f"  Truncated to {len(truncated)} chars after {MAX_RETRIES} failed attempts.")
    return truncated


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    load_dotenv()
    api_key = os.getenv("XAI_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "XAI_API_KEY is not set. Add it to your .env file at the project root."
        )

    # ── Stage 1 ───────────────────────────────────────────────────────────────
    print(f"[Stage 1] Fetching {TWEET_COUNT} tweets from @{TARGET_ACCOUNT} …")
    tweets = fetch_tweets(api_key)

    if not tweets:
        print("No tweets fetched. Exiting.")
        return

    print(f"  Fetched {len(tweets)} tweet(s):\n")
    for i, t in enumerate(tweets, 1):
        print(f"  {i}. {t.get('date', '')}  ·  {t.get('likes', 0):,} likes")
        print(f"     {t.get('text', '')[:120].strip()}{'…' if len(t.get('text','')) > 120 else ''}")
        print()

    # ── Stage 2 ───────────────────────────────────────────────────────────────
    print("[Stage 2] Generating summary tweet …\n")
    summary = generate_summary_tweet(api_key, tweets)

    print("─" * 64)
    print("Generated tweet:")
    print()
    print(f"  {summary}")
    print()
    print(f"  ({len(summary)} / {MAX_TWEET_CHARS} characters)")
    print("─" * 64)


if __name__ == "__main__":
    main()
