# main.py
# just to test the bot

from app.utils import create_project_idea

def main():
    """
    The main function

    """
    print("[+] PROJECT-IDEA creator as issue !")
    print("[+] - - - - - - - - - - - - - - -")
    print("[!] Please provide these fields :")

    title = input("[+] title: ")
    short_desc = input("[+] short_desc (A quick description): ")
    why = input("[+] why (Why this project): ")
    description = input("[+] description: ")
    labels = input("[+] labels(separate with ,): ")

    create_project_idea(title, short_desc, why, description, labels.split(","))
    print("[+] - - - - - - - - - - - - - - -")


if __name__ == "__main__":
    main()
