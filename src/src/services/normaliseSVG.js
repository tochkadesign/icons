const fs = require('fs');

export default function normaliseSVG(directory) {
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

