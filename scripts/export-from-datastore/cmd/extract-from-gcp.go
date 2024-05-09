package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v3"
)

const (
	keyFile   = "client_secrets.json"
	outputDir = "downloads"
)

func export_data_from_gcp() {
	ctx := context.Background()

	// Read the service account key file.
	keyBytes, err := ioutil.ReadFile(keyFile)
	if err != nil {
		log.Fatalf("Failed to read service account key file: %v", err)
	}

	// Parse the service account key.
	key, err := google.JWTConfigFromJSON(keyBytes, drive.DriveReadonlyScope, drive.DriveFileScope)
	if err != nil {
		log.Fatalf("Failed to parse service account key: %v", err)
	}

	// Create a new Drive client using the service account key.
	client := key.Client(ctx)

	// Create a new Drive API client.
	driveService, err := drive.New(client)
	if err != nil {
		log.Fatalf("Failed to create Drive API client: %v", err)
	}

	// Retrieve a list of all files in the root folder.
	query := "trashed = false and 'root' in parents"
	files, err := driveService.Files.List().Q(query).Fields("nextPageToken, files(id, name)").Do()
	if err != nil {
		log.Fatalf("Failed to retrieve files: %v", err)
	}

	// Create the output directory if it doesn't exist.
	if _, err := os.Stat(outputDir); os.IsNotExist(err) {
		if err := os.Mkdir(outputDir, 0700); err != nil {
			log.Fatalf("Failed to create output directory: %v", err)
		}
	}

	// Download each file to the output directory.
	for _, file := range files.Files {
		fmt.Printf("Downloading %q (%s)...\n", file.Name, file.Id)

		// Download the file content.
		res, err := driveService.Files.Export(file.Id, "application/json").Download()
		if err != nil {
			log.Printf("Failed to download %q: %v", file.Name, err)
			continue
		}
		defer res.Body.Close()

		// Read the file content.
		content, err := ioutil.ReadAll(res.Body)
		if err != nil {
			log.Printf("Failed to read %q: %v", file.Name, err)
			continue
		}

		// Write the file content to disk.
		filename := filepath.Join(outputDir, file.Id+".json")
		if err := ioutil.WriteFile(filename, content, 0644); err != nil {
			log.Printf("Failed to write %q to disk: %v", file.Name, err)
			continue
		}
	}

	fmt.Println("Done!")
}
