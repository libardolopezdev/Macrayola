const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const headerTemplate = (fileName) => `/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: ${fileName}
 */
`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            if (!content.includes('Desarrollado por: El Ingeniero de Software Libardo Lopez')) {
                const newContent = headerTemplate(file) + content;
                fs.writeFileSync(fullPath, newContent);
                console.log(`Added header to ${fullPath}`);
            }
        }
    }
}

// Process src directory
if (fs.existsSync(srcDir)) {
    processDirectory(srcDir);
}

// Process index.html
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
    const htmlContent = fs.readFileSync(indexPath, 'utf-8');
    if (!htmlContent.includes('Desarrollado por: El Ingeniero de Software Libardo Lopez')) {
        const headerHtml = `<!-- 
  Proyecto: Macrayola
  Desarrollado por: El Ingeniero de Software Libardo Lopez 
-->\n`;
        let newHtmlContent = htmlContent;
        if (htmlContent.toLowerCase().startsWith('<!doctype html>')) {
            newHtmlContent = htmlContent.replace(/<!doctype html>/i, '<!DOCTYPE html>\n' + headerHtml);
        } else {
            newHtmlContent = headerHtml + htmlContent;
        }

        fs.writeFileSync(indexPath, newHtmlContent);
        console.log(`Added header to ${indexPath}`);
    }
}
