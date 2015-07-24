var cells,
	activeSections,
	x, y,

	width = 100,
	height = 100,

	intervalId;

function init(){

	cells = [];
	for (y=0; y<height; ++y) {
		cells[y] = [];

		for (x=0; x<width; ++x) {
			cells[y][x] = Math.random() > 0.5;
			cells[y][x] = 0;
		}
	}

	cells[32][32] = true;

	activeSections = [true];
}

function sectionTest(section, path){
	var i,
		sectionPart,
		sectionPath;

	path = path || [];

	for (i=0; i<2; ++i) {
		sectionPart = section[i];
		sectionPath = path.concat(i);

		if (typeof sectionPart === 'boolean') {
			if (sectionPart) {
				runSection(getSectionCoords(path));
			}
		} else {
			sectionTest(sectionPart, sectionPath);
		}
	}
}

function getSectionCoords(path){
	var startCoords = [0, 0],
		endCoords = [height, width],
		middleCoords,
		coordIndex,
		i;

	for (i=0; i<path.length; ++i) {
		middleCoords = [
			startCoords[0] + Math.round((endCoords[0] - startCoords[0]) / 2),
			startCoords[1] + Math.round((endCoords[1] - startCoords[1]) / 2)
		];

		// minden páros indexû felezés vízszintesen, minden páratlan indexû felezés függõlegesen vágja fel a területet
		coordIndex = i % 2;

		// path[i] meghatározza hogy a felvágott terület elsõ (felsõ/bal oldali) vagy második (alsó/jobb oldali) területe kell
		if (path[i]) {
			startCoords[coordIndex] = middleCoords[coordIndex];
		} else {
			endCoords[coordIndex] = middleCoords[coordIndex];
		}
	}

	return [startCoords, endCoords];
}

function runSection(sectionCoords){
	var startCoords = sectionCoords[0],
		endCoords = sectionCoords[1],
		y, x;

	console.log(startCoords, endCoords);

	for (y=startCoords[0]; y<endCoords[0]; ++y) {
		for (x=startCoords[1]; x<endCoords[1]; ++x) {

		}
	}
}

function run(){
	sectionTest(activeSections);
}

function testSection(startY, startX, endY, endX, sectionIndex){
	var section = [];

	for (y=startY; y<endY; ++y) {
		for (x=startX; x<endX; ++x) {

		}
	}

	// ha a két szekció megegyezik akkor nem kell õket külön vizsgálnunk
	if (section[0] === section[1]) {
		section = section[0];
	}

	return section;
}

function test(){
	testSection(0,0, 99,99);

	console.log(activeSections);
}

init();





var x, y, w = 10, h = 10, a;

a = '';
for (y=0; y<h; ++y) {
	a += '\n';
	for (x=0; x<w; ++x) {
		a += (y % 2) & (x % 2);
	}
}

console.log(a);
