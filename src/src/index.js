import normaliseSVG from './services/normaliseSVG';
import sortFiles from './services/sortFiles';
import renameFiles from './services/renameFiles';
import createDocumentation from './services/createDocumentation';

let currentDirectory = require('path').resolve(process.cwd(), '');

normaliseSVG(currentDirectory);
sortFiles(currentDirectory);
renameFiles(currentDirectory);
createDocumentation(currentDirectory);