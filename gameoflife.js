(function(){
	var ctx,
		requestAnimationFrame = window.requestAnimationFrame || function(callback){ window.setInterval(callback, 100 / 6); },
		iterations = 0,

		cells = [],
		width = 100,
		height = 100,
		scale = 3,
		x, y, x2, y2, i, j;

	function init(){
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

		cells = [];
		for (x=0; x<width; ++x) {
			cells[x] = [];
			for (y=0; y<height; ++y) {
				cells[x][y] = Math.random() > 0.5;
			}
		}

		ctx.clearRect(0,0,width*scale,height*scale);

		run();
	}

	function draw(){
		ctx.clearRect(0, 0, width*scale, height*scale);
		for (x=0; x<width; ++x) {
			for (y=0; y<height; ++y) {
				if (cells[x][y]) {
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

		if (window.stopped) {
			window.iterations = iterations;
			return;
		}

		++iterations;
		requestAnimationFrame(run);
		draw();

		newCells = [];
		for (x=0; x<width; ++x) {
			newCells[x] = [];
			for (y=0; y<height; ++y) {
				liveNeigbours = 0;

				for (i=-1; i<2; ++i) {
					x2 = x+i;
					x2 = x2 < 0 ? width - 1 : (x2 > width - 1 ? 0 : x2);

					for (j=-1; j<2; ++j) {
						y2 = y+j;
						y2 = y2 < 0 ? height - 1 : (y2 > height - 1 ? 0 : y2);

						liveNeigbours += cells[x2][y2];
					}
				}

				liveNeigbours -= cells[x][y];

				newCells[x][y] = liveNeigbours === 3 || liveNeigbours === 2 && cells[x][y];
			}
		}

		cells = newCells;
	}

	init();
})();
