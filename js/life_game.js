//=============Initializatiom=================//

function randomSort(a, b) {
    return Math.random() > 0.5 ? -1 : 1;
}

function random_init(mask) {
	var num = parseInt(document.getElementById("input").value);  
	var cols = mask.length
	if (cols<=0) return mask;
	var rows = mask[0].length;
	if (rows <= 0) return mask;
	for (var i = 0; i < cols; i ++) {
		for (var j = 0; j < rows; j++) {
			mask[i][j] = 0;
		}
	}
	
	var random_sort = new Array(cols*rows);
	for (var i = 0; i < cols*rows; i ++ ) {
		random_sort[i] = i;
	}

	random_sort.sort(randomSort);
	for (var i = 0; i < cols*rows && i < num; i ++ ) {
		var x = Math.floor(random_sort[i] / rows);
		var y = random_sort[i] % rows;
		mask[x][y] = 1;
	}
	return mask;
}

function generate_map(parent, cols, rows) {
	var map = new Array(cols);
	for (var i = 0; i < cols; i ++) {
		map[i] = new Array(rows);
		for (var j = 0; j < rows; j++) {
			map[i][j] = document.createElement("div");
			map[i][j].style.backgroundColor = "black";
			map[i][j].style.position = "absolute";
			map[i][j].style.left = (i*8).toString();
			map[i][j].style.top = (j*8).toString();
			map[i][j].style.width = "7";
			map[i][j].style.height = "7";
			parent.appendChild(map[i][j]);
		}
	}
	return map;
}

function generate_mask(cols, rows) {
	var mask = new Array(cols);
	for (var i = 0; i < cols; i ++) {
		mask[i] = new Array(rows);
		for (var j = 0; j < rows; j++) {
			mask[i][j] = 0;
		}
	}
	return mask;
}

//===============Update===================//

function get_population(mask) {
	var num = 0;
	var cols = mask.length
	if (cols<=0) return 0;
	var rows = mask[0].length;
	if (rows <= 0) return 0;
	for (var i = 0; i < cols; i ++) {
		for (var j = 0; j < rows; j++) {
			if (mask[i][j] == 1) num ++;
		}
	}
	return num;
}

function update_map(map, mask){
	var cols = map.length;
	var rows = map[0].length;
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
				if (mask[i][j]) map[i][j].style.backgroundColor = "white";
				else map[i][j].style.backgroundColor = "black";
		}
	}
	document.getElementById("population").innerHTML = get_population(mask).toString();
}

function update_mask(mask) {
	var cols = mask.length;
	var rows = mask[0].length;
	var update_mask = generate_mask(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			var count = 0;
			
			// find living cells
			for (var m = -1; m <= 1; m++) {
				for (var n = -1; n <= 1; n++) {
					if (m == 0 && n == 0) continue;
					var im = (i + m + cols) % cols;
					var jn = (j + n + rows) % rows;
					if (mask[im][jn] == 1) count ++;
				}
			}

			// game rules
			if (count == 3 ) {
				update_mask[i][j] = 1;
			}
			else if (count == 2 ) {
				update_mask[i][j] = mask[i][j];
			}
			else update_mask[i][j] = 0;
		}
	}

	// transform update_mask to mask
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			mask[i][j] = update_mask[i][j];
		}
	}
	return mask;
}

function update_generation(generation) {
	document.getElementById("generation").innerHTML = generation.toString();
}

function update(map, mask) {
	var cols = map.length;
	if (cols <= 0) return -1;
	var rows = map[0].length;
	if (cols != mask.length || rows != mask[0].length || rows <= 0) return -1;
	mask = update_mask(mask);
	update_map(map, mask);
	return mask;
}

(function(){
	var canvas = document.getElementById('draw-animation');

	var cols = 60;
	var rows = 60;
	var num = cols * rows;
	var map = generate_map(canvas, cols, rows);
	var mask = generate_mask(cols, rows);

	// NOTE:
	// map(html dome) / mask(2D Matrix): 
	// white / 1 => live
	// black / 0 => dead

	// Global variables
	var running = false;
	var init = false;
	var generation = 0;
	var population = 0;


	//=============Interaction=================//

	document.getElementById("start").onclick = function (){
		if (running == false) {
			running = true;
			if (init == false) {
				init = true;
				mask = random_init(mask);
				update_map(map, mask);
			}
			var id = setInterval(function() {
				if (running == false) clearInterval(id);
				else {
					mask = update(map, mask);
					generation ++;
					update_generation(generation);
				}
			}, 200);
		}
		return running;
	}

	document.getElementById("pause").onclick = function () {
		if (running == true) {
			init = true;
			running = false;
		}
		return running;
	}

	document.getElementById("reset").onclick = function() {
		running = false;
		init = true;
		mask = random_init(mask);
		update_map(map, mask);
		update_generation(0);
		return mask;
	}
})(); 
