(function(){
	var y, y2, i,
		x, x2,
		intervalId,
		cycleDelay = 50,
		iterations = 0,

		cells = [],
		width = 10,
		height = 10,
		neighbourCells = [
			[-1, -1], [-1, 0], [-1, 1],
			[ 0, -1],          [ 0, 1],
			[ 1, -1], [ 1, 0], [ 1, 1]
		],

		ctx,
		requestAnimationFrame = window.requestAnimationFrame || function(callback){
			window.setTimeout(function(){
				callback((new Date()).getTime());
			}, 1000 / 60);
		},
		previousTimestamp = 0,
		scale = 10;

	function createCells(){
		cells = [];
		for (y=0; y<height; ++y) {
			cells[y] = Math.round(Math.random() * (1 << width));
		}

		window.cells = cells;
	}

	function createCanvas(){
		var _canvas = document.createElement('canvas');

		ctx = _canvas.getContext && _canvas.getContext('2d');

		if (!ctx) {
			return;
		}

		_canvas.width = width * scale;
		_canvas.height = height * scale;
		_canvas.style.width = width * scale + 'px';
		_canvas.style.height = height * scale + 'px';

		document.body.appendChild(_canvas);
	}

	function init(){
		createCells();
		createCanvas();

		intervalId = setInterval(run, cycleDelay);

		if (ctx) {
			draw(0);
		}
	}

	function draw(timestamp){
		if (!window.stopDraw) {
			requestAnimationFrame(draw);
		}

		document.title = 'I: ' + iterations + ' FPS: ' + Math.round(1/(timestamp - previousTimestamp)*1000);
		previousTimestamp = timestamp;

		ctx.clearRect(0, 0, width*scale, height*scale);

		for (y=0; y<height; ++y) {
			for (x=0; x<width; ++x) {
				if (cells[y] & (1 << x)) {
					ctx.fillRect(x*scale, y*scale, scale, scale);
				}
			}
		}
	}

	function run(){
		/**
		 * RULES:
		 * 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
		 * 2. Any live cell with two or three live neighbours lives on to the next generation.
		 * 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
		 * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
		 */
		var liveNeigbours,
			newCells;

		if (window.stopIteration) {
			clearInterval(intervalId);
		}

		newCells = [];
		for (y=0; y<height; ++y) {
			newCells[y] = 0;

			for (x=0; x<width; ++x) {
				liveNeigbours = 0;

				for (i=0; i<neighbourCells.length; ++i) {
					y2 = y+neighbourCells[i][0];
					x2 = x+neighbourCells[i][1];

					if (x2 > -1 && x2 < width && y2 > -1 && y2 < height) {
						liveNeigbours += (cells[y2] & (1 << x2)) > 0;
					}
				}

				if (liveNeigbours === 3 || liveNeigbours === 2 && cells[y] & (1 << x)) {
					newCells[y] |= 1 << x;
				}
			}
		}

		cells = newCells;
		++iterations;
	}

	init();
})();
