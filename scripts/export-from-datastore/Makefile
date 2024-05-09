install:
	go get -d ./cmd/

build:
	go build -o exe ./cmd/*.go

export_data: build
	./exe export

import_data: build
	./exe import

.PHONY: install export_data import_data build
