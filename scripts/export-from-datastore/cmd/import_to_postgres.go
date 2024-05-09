package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	// _ "github.com/lib/pq"
)

type User struct {
	Login     string `json:"login"`
	Id        int    `json:"id"`
	NodeId    string `json:"node_id"`
	AvatarUrl string `json:"avatar_url"`
}

func import_to_postgres() {
	// Read database credentials from environment variables
	host := os.Getenv("PG_HOST")
	port := os.Getenv("PG_PORT")
	user := os.Getenv("PG_USER")
	password := os.Getenv("PG_PASSWORD")
	dbname := os.Getenv("PG_DBNAME")

	// Connect to PostgreSQL database
	dbinfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", dbinfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// Get list of files in directory
	dirname := "./files"
	files, err := ioutil.ReadDir(dirname)
	if err != nil {
		panic(err)
	}

	// Loop through files and insert data into database
	for _, file := range files {
		filename := fmt.Sprintf("%s/%s", dirname, file.Name())

		// Read file contents into a byte array
		contents, err := ioutil.ReadFile(filename)
		if err != nil {
			panic(err)
		}

		// Unmarshal JSON into a User struct
		var user User
		err = json.Unmarshal(contents, &user)
		if err != nil {
			panic(err)
		}

		// Insert user into database
		stmt, err := db.Prepare("INSERT INTO users(login, id, node_id, avatar_url) VALUES($1, $2, $3, $4)")
		if err != nil {
			panic(err)
		}
		_, err = stmt.Exec(user.Login, user.Id, user.NodeId, user.AvatarUrl)
		if err != nil {
			panic(err)
		}
	}
}
