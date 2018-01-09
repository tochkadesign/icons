const fs = require('fs');

let baseDirectory = '';
let htmlConent = '';

export default function createDocumentation(directory) {
    baseDirectory = directory;

    createDocumentationFile(directory);
};

function createDocumentationFile(fileDirectory) {
    createFileContent(fileDirectory);

    fs.writeFileSync(fileDirectory + '/index.html', createHtml(), 'utf8');
}

function createFileContent(fileDirectory) {
    let content = '';

    fs.readdirSync(fileDirectory).forEach(file => {
        let filepath = fileDirectory + "/" + file;
        let stat = fs.statSync(filepath);
        
        if (!stat.isDirectory()) {
            if (/.*\.svg/.test(filepath))
                content += createIconCell(getPath(baseDirectory, filepath), file );
        }
        else
            createFileContent(filepath);
    });

    if (content) {
        let path = fileDirectory.split('/');
        let title = path[path.length - 2];

        htmlConent += createRow(title, content);
    }
}

function getPath(baseDirectory, fileDirectory)
{
    var i = 0;
    var j = 0;
    var result = "";

    while (j < fileDirectory.length)
    {
        if (baseDirectory[i] != fileDirectory[j] || i == baseDirectory.length)
            result += fileDirectory[j];
        else
            i++;

        j++;
    }

    return '.' + result;
}

function createStyles() {
    return '<style>' +
    'body { margin: 0 auto; font-family: arial, sans-serif; max-width: 1024px; padding: 100px; }' +
    '.header { font-weight: 600; font-size: 24px; margin-bottom: 100px; }' +
    '.row { margin: 50px 0 50px 0; }' +
    '.title { margin-bottom: 50px; font-weight: 600; font-size: 14px; }' +
    '.icons { display: flex; flex-wrap: wrap; }' +
    '.icon { margin: 0 30px 30px 0; width: 100px; }' +
    '.icon-name { font-size: 12px; opacity: 0.35; margin-top: 15px; }' +
    '</style>';
}

function createTitle(title) {
    return '<div class="title">' + title + '</div>';
}

function createIconCell(imgSrc, iconName) {
    let name = iconName.substring(3, iconName.length).split('_').join(' ');

    return '<div class="icon"><img src="' + imgSrc + '"/><div class="icon-name">' + name + '</div></div>';
}

function createRow(title, content) {
    return '<div class="row">' + createTitle(title) + '<div class="icons">' + content + '</div></div>';
}

function createHtml() {
    return '<html><head>' + createStyles() + '</head><body><div class="header">Tochka Icon Library</div>' + htmlConent + '</body></html>';
}