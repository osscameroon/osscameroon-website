package main

import (
	"fmt"
	"os"
)

func main() {

	option := os.Args[1]

	if option == "export" {
		export_data_from_gcp()
	} else if option == "import" {
		import_to_postgres()
	} else {
		fmt.Println("Error: unrecoginzed arg given...")
	}
}
