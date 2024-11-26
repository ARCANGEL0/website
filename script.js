const fs = require('fs');
const path = require('path');
const pug = require('pug');

// Define the directories
const viewsDir = path.join(__dirname, 'views'); // Adjust if your PUG files are in a different folder
const outputDir = path.join(__dirname, 'output');
const cssDir = path.join(outputDir, 'css');
const jsDir = path.join(outputDir, 'js');

// Create output directories if they don't exist
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir);

// Function to convert PUG files to HTML
function convertPugToHtml() {
    fs.readdir(viewsDir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            if (path.extname(file) === '.pug') {
                const filePath = path.join(viewsDir, file);
                const html = pug.renderFile(filePath);

                // Create an output HTML file
                const outputFilePath = path.join(outputDir, file.replace('.pug', '.html'));
                fs.writeFileSync(outputFilePath, html);
                console.log(`Converted: ${file} to ${outputFilePath}`);
            }
        });
    });
}

// Function to move CSS and JS files
function moveAssets() {
    // Move CSS files
    fs.readdir(viewsDir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            if (path.extname(file) === '.css') {
                const src = path.join(viewsDir, file);
                const dest = path.join(cssDir, file);
                fs.copyFileSync(src, dest);
                console.log(`Moved CSS: ${file} to ${cssDir}`);
            }
            if (path.extname(file) === '.js') {
                const src = path.join(viewsDir, file);
                const dest = path.join(jsDir, file);
                fs.copyFileSync(src, dest);
                console.log(`Moved JS: ${file} to ${jsDir}`);
            }
        });
    });
}

// Execute the functions
convertPugToHtml();
moveAssets();