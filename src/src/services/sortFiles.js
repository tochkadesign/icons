const fs = require('fs');
const logFilePath = require('path').resolve(process.cwd(), '') + '/log.txt';

export default function sortFiles(directory) {
    handleFiles(directory);

    if (!doesLogFileExist(directory)) {
        let date = new Date();
        fs.writeFileSync(directory + '/log.txt', 'Created at ' +  date.toLocaleString('ru'));
    }
};

function handleFiles(directory) {
    if (doesLogFileExist(directory))
        return;

    fs.readdirSync(directory).forEach(file => {
        let filePath = directory + '/' + file;
        let stat = fs.statSync(filePath);

        if (!stat.isDirectory()) {
            let extension = getExtension(filePath);

            if (extension == 'svg' || extension == 'pdf')
                moveFile(directory, file, extension);
        }
        else
            handleFiles(filePath);
    })
}

function moveFile(directory, fileName, extension) {
    createFolder(directory, extension);

    let oldPath = directory + '/' + fileName;
    let newPath = directory + '/' + extension + '/' + fileName;

	fs.renameSync(oldPath, newPath);
}

function createFolder(directory, folderName) {
    let path = directory + '/' + folderName;

    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}

function getExtension(fileName) {
    return fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
}

function doesLogFileExist(directory) {
    return fs.existsSync(logFilePath);
}