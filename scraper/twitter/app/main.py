from app.utils import *


def main():
    """

    The basic main method to send all over the time

    """

    try:
        proceed()
    except KeyboardInterrupt:
        print("[x] Twitter stats-scraper stopped")



if __name__ == "__main__":
    main()
