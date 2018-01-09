const fs = require('fs');
const logFilePath = require('path').resolve(process.cwd(), '') + '/log.txt';

let baseDirectory = '';

export default function renameFiles(directory) {
    baseDirectory = directory;

    handleFiles(directory);
};

function handleFiles(directory) {
    fs.readdirSync(directory).forEach(file => {
        let filePath = directory + "/" + file;
        let stat = fs.statSync(filePath);

        if (!stat.isDirectory()) {
            let extension = getExtension(filePath);

            if (extension == 'svg')
                renameFile(directory, file, getAndroidStyleName(file));

            if (extension == 'pdf')
                renameFile(directory, file, getIOSStyleName(file));
        }
        else
            handleFiles(filePath);
    })
}

function renameFile(directory, fileName, newFileName) {
    if (!wasFileUpdated(directory, fileName)) {
        let oldPath = directory + '/' + fileName;
        let newPath = directory + '/' + newFileName;

        fs.renameSync(oldPath, newPath);
        markFileAsUpdated(directory, fileName, newFileName);
    }
}

function getExtension(fileName) {
    return fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
}

function getIOSStyleName(fileName) {
    let name = '';
    let extension = getExtension(fileName);

    let words = fileName.substring(0, fileName.length - (extension.length + 1))
                        .split(' ');

    words.forEach(function(word, i) {
        let symbols = word.split('');

        symbols.forEach(function(symbol, j) {
            if (j == 0)
                name += symbol.toUpperCase();
            else
                name += symbol.toLowerCase();
        });
    });

    return name + '.' + extension;
}

function getAndroidStyleName(fileName) {
    return 'ic_' + fileName.split(' ').join('_').toLowerCase();
}

function wasFileUpdated(directory, fileName) {
    let logContent = fs.readFileSync(logFilePath, 'utf8');
    let relativePath = directory.replace(baseDirectory + '/', '');

    if (logContent.indexOf(relativePath + '/' + fileName) != -1)
        return true;
  
    return false;
}

function markFileAsUpdated(directory, fileName, newFileName)
{
    let logContent = fs.readFileSync(logFilePath, 'utf8');    
    let relativePath = directory.replace(baseDirectory + '/', '');
    let date = new Date();

    fs.writeFileSync(logFilePath, logContent + '\n' + date.toLocaleString('ru') + ' ' + relativePath + '/' + newFileName);  
}

