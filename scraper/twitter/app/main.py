import json
from app.utils.get_twitter_stats import (
    get_top_mention,
    get_top_follower,
    get_page_summary
)


def main():
    """

    The basic main method to send all over the time

    """
    try:
        start_time = "1604188800000"
        end_time = "1605225599999"
        print("\n------------------------------------------")

        print("> - - - - - - - - - - - -")
        print("> Scraping Top-Mentions : ")
        # we write in a file
        with open("top_mentions.json", "w") as fr:
            json.dump(get_top_mention(start_time, end_time), fr, indent=4)
        print("- - - - - - - -\n", )

        print("> - - - - - - - - - - - -")
        print("> Scraping Top-Follower : ")
        # we write in a file
        with open("top_followers.json", "w") as fr:
            json.dump(get_top_follower(start_time, end_time), fr, indent=4)

        print("> - - - - - - - - - - - -")
        print("> Scraping Page-Summary : ")
        # we write in a file
        with open("page_summary.json", "w") as fr:
            json.dump(get_page_summary(start_time, end_time), fr, indent=4)

        print("\n------------------------------------------")
    except KeyboardInterrupt:
        print("[x] Twitter stats-scraper stopped")


if __name__ == "__main__":
    main()
