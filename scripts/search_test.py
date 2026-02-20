"""First X API call - just see if it works."""

import os
import requests
from dotenv import load_dotenv
import json


def main():
    load_dotenv()
    token = os.getenv("X_BEARER_TOKEN")

    url = "https://api.x.com/2/tweets/search/recent"
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "query": "fc barcelona news lang:en -is:retweet -is:reply",
        "max_results": 10,
        "sort_order": "relevancy",
        "tweet.fields": "author_id,created_at,public_metrics",
        "expansions": "author_id",
        "user.fields": "username,name",
    }
    response = requests.get(url, headers=headers, params=params)

    print(json.dumps(response.json(), indent=2, sort_keys=True, ensure_ascii=False))



if __name__ == "__main__":
    main()