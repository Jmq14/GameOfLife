function random_init(map) {

}

function user_init(mask) {
	for (var i = 5; i < 10; i++) {
		for (var j = 5; j < 10; j++) {
			mask[i][j] = 1;
		}
	}
	mask[4][6] = 1;
	mask[99][10] = 1;
	mask[99][11] = 1;
	mask[99][12] = 1;
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

function generate_mask(mask, cols, rows) {
	var mask = new Array(cols);
	for (var i = 0; i < cols; i ++) {
		mask[i] = new Array(rows);
		for (var j = 0; j < rows; j++) {
			mask[i][j] = 0;
		}
	}
	return mask;
}

function update_map(map, mask, cols, rows){
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
				if (mask[i][j]) map[i][j].style.backgroundColor = "white";
				else map[i][j].style.backgroundColor = "black";
			
		}
	}
}

function update_mask(mask, cols, rows) {
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

function update(map, mask, cols, rows) {
	mask = update_mask(mask, cols, rows);
	update_map(map, mask, cols, rows);
	return mask;
}


(function(){
	var canvas = document.getElementById('draw-animation');
	//var two = new Two({ width: 800, height: 800 }).appendTo(elem);

	var cols = 100;
	var rows = 100;
	var num = cols * rows;
	var map = generate_map(canvas, cols, rows);
	var mask = generate_mask(cols, rows);


	// map / mask: 
	// white / 1 => live
	// black / 0 => dead

	mask = user_init(mask);
	update_map(map, mask, cols, rows);

	var id = setInterval(function() {
		mask = update(map, mask, cols, rows);
	}, 500);
})(); 
