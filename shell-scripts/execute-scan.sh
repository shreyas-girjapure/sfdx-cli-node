#!/bin/bash


# Echo the message
rm -rf scan output

# Get the zipName parameter from the command-line argument
zipName="$2"

# Unzip the file to the "scan" directory
unzip -d scan zip-container/$zipName.zip

# Create the "output" directory if it doesn't exist
mkdir -p output

# Get the format parameter from the command-line argument
format="$1"


# Run the sfdx scanner command with the format parameter
sfdx scanner run --target scan -f "$format" -o "output/Report-$zipName.$format"