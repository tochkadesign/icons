/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_normaliseSVG__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_sortFiles__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_renameFiles__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_createDocumentation__ = __webpack_require__(6);





let currentDirectory = __webpack_require__(1).resolve(process.cwd(), '');

Object(__WEBPACK_IMPORTED_MODULE_0__services_normaliseSVG__["a" /* default */])(currentDirectory);
Object(__WEBPACK_IMPORTED_MODULE_1__services_sortFiles__["a" /* default */])(currentDirectory);
Object(__WEBPACK_IMPORTED_MODULE_2__services_renameFiles__["a" /* default */])(currentDirectory);
Object(__WEBPACK_IMPORTED_MODULE_3__services_createDocumentation__["a" /* default */])(currentDirectory);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normaliseSVG;
const fs = __webpack_require__(0);

function normaliseSVG(directory) {
    findSVG(directory);
};

function findSVG(directory) {
    fs.readdirSync(directory).forEach(file => {
        let filePath = directory + "/" + file;
        let stat = fs.statSync(filePath);

        if (!stat.isDirectory()) {
            if (/.*\.svg/.test(filePath))
                resaveSVG(filePath);
        }
        else
            findSVG(filePath);
    })
}

function resaveSVG(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    fs.writeFileSync(filePath, updateSVG(fileContent), 'utf8');
}

function updateSVG(svgContent) {
	let svg = svgContent.match('<svg(.*?)>');
	let path = svgContent.match('<path(.*?)>');

	return svg[0] + path[0] + '</svg>';
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sortFiles;
const fs = __webpack_require__(0);
const logFilePath = __webpack_require__(1).resolve(process.cwd(), '') + '/log.txt';

function sortFiles(directory) {
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

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = renameFiles;
const fs = __webpack_require__(0);
const logFilePath = __webpack_require__(1).resolve(process.cwd(), '') + '/log.txt';

let baseDirectory = '';

function renameFiles(directory) {
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



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDocumentation;
const fs = __webpack_require__(0);

let baseDirectory = '';
let htmlConent = '';

function createDocumentation(directory) {
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

/***/ })
/******/ ]);