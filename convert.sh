#!/bin/bash

# Clone the repository
git clone https://github.com/Yalgie/website.git

# Navigate into the cloned directory
cd website

# Install PUG CLI globally
npm install pug-cli -g

# Create the output directory structure
mkdir -p output/assets output/css output/js

echo "Setup complete. Repository cloned and directories created."