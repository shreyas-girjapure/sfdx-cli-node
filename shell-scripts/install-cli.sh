#!/bin/bash

# Check if sfdx-cli is installed globally
if command -v sfdx >/dev/null 2>&1; then
    echo "sfdx-cli is already installed"
    # Check if scanner plugin is installed
    if sfdx plugins | grep -q "@salesforce/sfdx-scanner"; then
        echo "Scanner plugin is already installed"
        node index.js
    else
        echo "Installing scanner plugin..."
        sfdx plugins:install @salesforce/sfdx-scanner
        node index.js
    fi
else
    echo "sfdx-cli is not installed. Installing now..."
    npm install -g sfdx-cli
    sfdx plugins:install @salesforce/sfdx-scanner
    node index.js
fi
