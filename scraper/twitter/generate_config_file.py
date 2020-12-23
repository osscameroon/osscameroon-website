#!/bin/python3
import configparser


config_file = configparser.ConfigParser()

# Twitter Authentication
config_file["AUTH"] = {
	"BEARER_TOKEN": ""
}

# MySQL 
config_file["MYSQL"] = {
	"HOST": "",
	"USER": "",
	"PASSWORD": "",
	"DATABASE": ""
}

# save config file
with open("config.ini", "w") as file_object:
	config_file.write( file_object )
print("Config file 'config.ini' created")
