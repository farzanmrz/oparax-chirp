"""
Periodic tweet monitor using Grok x_search.

Asks the user (once) for a natural-language description of what tweets to
watch, then polls X on a fixed interval, printing only tweets that haven't
been seen before.

Run:
    uv run python scripts/test3.py

Required env var in .env at project root:
    XAI_API_KEY=xai-...

Prompt examples the user can type at the prompt:
    "Get the 5 latest tweets from @FabrizioRomano"
    "Show me breaking transfer news from @FabrizioRomano and @David_Ornstein"
    "Find tweets from @SkySportsNews mentioning Manchester United"

Changing the poll interval:
    POLL_INTERVAL_SECONDS = 30    → every 30 seconds (good for testing)
    POLL_INTERVAL_SECONDS = 3600  → every hour (production)
"""

import argparse
import json
import os
import time
from datetime import datetime, timezone

import requests
from dotenv import load_dotenv


# ── Config ────────────────────────────────────────────────────────────────────
POLL_INTERVAL_SECONDS = 30       # Change to 3600 for hourly production runs
GROK_RESPONSES_URL = "https://api.x.ai/v1/responses"
GROK_MODEL = "grok-4-1-fast-reasoning"  # x_search requires grok-4 family


# ── Tool ──────────────────────────────────────────────────────────────────────
def build_x_search_tool(from_date: str) -> dict:
    """
    Generic x_search tool with no account pinned.

    from_date restricts results to tweets on or after that date, so each
    poll only surfaces recent content rather than replaying old tweets.
    The model determines which account(s) to search from the user's prompt.
    """
    return {
        "type": "x_search",
        "from_date": from_date,
        # No allowed_x_handles — the prompt tells Grok which account to target.
        "enable_image_understanding": False,
        "enable_video_understanding": False,
    }


# ── API call ──────────────────────────────────────────────────────────────────
def search_tweets(api_key: str, user_prompt: str, from_date: str) -> dict:
    """
    Sends the user's free-form prompt to Grok with x_search enabled.

    A system instruction is appended to ensure Grok always returns parseable
    JSON, regardless of what the user typed. This keeps the user prompt
    natural while giving us a predictable output format.
    """
    structured_prompt = (
        f"{user_prompt}\n\n"
        "Return ONLY a raw JSON array — no prose, no markdown fences. "
        "Each element must have: url (full https://x.com/i/status/... link), "
        "text (string), date (string), likes (integer), retweets (integer)."
    )

    payload = {
        "model": GROK_MODEL,
        "input": [{"role": "user", "content": structured_prompt}],
        "tools": [build_x_search_tool(from_date)],
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    response = requests.post(
        GROK_RESPONSES_URL, headers=headers, json=payload, timeout=60
    )
    if not response.ok:
        print(f"  API error {response.status_code}:", json.dumps(response.json(), indent=2))
    response.raise_for_status()
    return response.json()


def tweet_id_from_url(url: str) -> str | None:
    """
    Extracts the numeric Snowflake tweet ID from a URL.

    e.g. https://x.com/i/status/2026790500087238847 → "2026790500087238847"
    Returns None if the URL doesn't match the expected shape.
    """
    try:
        part = url.rstrip("/").split("/")[-1]
        return part if part.isdigit() else None
    except (AttributeError, IndexError):
        return None


def extract_tweets(raw_response: dict) -> list[dict]:
    """Pulls the JSON tweet list out of Grok's output block."""
    for item in raw_response.get("output", []):
        if item.get("role") == "assistant":
            for block in item.get("content", []):
                if block.get("type") == "output_text":
                    try:
                        return json.loads(block["text"])
                    except json.JSONDecodeError:
                        # Grok occasionally wraps output in markdown fences.
                        # Strip them and retry.
                        text = block["text"].strip().strip("```json").strip("```").strip()
                        try:
                            return json.loads(text)
                        except json.JSONDecodeError:
                            print("  Could not parse Grok output as JSON:")
                            print(" ", block["text"][:300])
                            return []
    return []


# ── Main loop ─────────────────────────────────────────────────────────────────
def main():
    load_dotenv()
    api_key = os.getenv("XAI_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "XAI_API_KEY is not set. Add it to your .env file at the project root."
        )

    print("╔══════════════════════════════════════════════════════════════╗")
    print("║              Periodic Tweet Monitor (Grok)                   ║")
    print(f"║  Polling every {POLL_INTERVAL_SECONDS}s  │  Model: {GROK_MODEL[:24]:<24}║")
    print("╚══════════════════════════════════════════════════════════════╝\n")

    parser = argparse.ArgumentParser(description="Periodic tweet monitor via Grok x_search.")
    parser.add_argument(
        "--prompt", "-p",
        type=str,
        default=None,
        help='What tweets to monitor. e.g. "Get the 5 latest tweets from @FabrizioRomano"',
    )
    parser.add_argument(
        "--polls", "-n",
        type=int,
        default=3,
        help="Number of polls to run before exiting (default: 3). Set to 0 for infinite.",
    )
    args = parser.parse_args()

    if args.prompt:
        user_prompt = args.prompt.strip()
    else:
        print("Describe the tweets you want to monitor.")
        print("Examples:")
        print("  • Get the 5 latest tweets from @FabrizioRomano")
        print("  • Show transfer news from @FabrizioRomano and @David_Ornstein")
        print("  • Find tweets from @SkySportsNews mentioning Manchester United\n")
        user_prompt = input("Your prompt: ").strip()

    if not user_prompt:
        user_prompt = "Get the 5 most recent tweets from @FabrizioRomano"
        print(f"(No prompt entered — using default: \"{user_prompt}\")")

    # Seen tweet IDs — deduplicates by Snowflake ID, not text content.
    # IDs are stable: the same tweet always has the same ID regardless of how
    # Grok phrases or truncates it in different responses.
    # In production, persist this set to disk so it survives process restarts.
    seen_ids: set[str] = set()
    poll_count = 0

    max_polls = args.polls  # 0 = infinite
    poll_limit_label = f"{max_polls} polls" if max_polls else "infinite"
    print(f"\nStarting monitor … {poll_limit_label} · Ctrl+C to stop.\n{'─' * 64}")

    while True:
        poll_count += 1
        if max_polls and poll_count > max_polls:
            print(f"\nReached {max_polls} poll(s). Done.")
            break
        now_utc = datetime.now(timezone.utc)
        from_date = now_utc.strftime("%Y-%m-%d")  # today's date as the search floor

        print(f"\n[Poll #{poll_count}]  {now_utc.strftime('%H:%M:%S UTC')}  —  searching …")

        try:
            raw = search_tweets(api_key, user_prompt, from_date)
            tweets = extract_tweets(raw)

            # Resolve each tweet's ID from its URL; fall back to text hash
            # if Grok omitted the URL for a particular tweet.
            def get_id(t: dict) -> str:
                return tweet_id_from_url(t.get("url", "")) or t.get("text", "")[:80]

            new_tweets = [t for t in tweets if get_id(t) not in seen_ids]

            if new_tweets:
                print(f"  ✓ {len(new_tweets)} new tweet(s):\n")
                for tweet in new_tweets:
                    tid = get_id(tweet)
                    seen_ids.add(tid)
                    text = tweet.get("text", "")
                    date = tweet.get("date", "N/A")
                    likes = tweet.get("likes", 0)
                    rts = tweet.get("retweets", 0)
                    url = tweet.get("url", "")
                    print(f"  {date}")
                    print(f"  {likes:,} likes  ·  {rts:,} retweets  ·  ID: {tid}")
                    if url:
                        print(f"  {url}")
                    for line in text.splitlines():
                        print(f"    {line}")
                    print()
            else:
                print(f"  No new tweets since last poll.  ({len(seen_ids)} IDs tracked)")

        except requests.HTTPError:
            pass  # error already printed inside search_tweets
        except Exception as exc:
            print(f"  Unexpected error: {exc}")

        if max_polls and poll_count >= max_polls:
            continue  # skip sleep on the last poll — exit check at top of next iteration
        print(f"  Next poll in {POLL_INTERVAL_SECONDS}s …")
        time.sleep(POLL_INTERVAL_SECONDS)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nMonitor stopped.")
