var pen_color = '#111';

function randInt(n) {
	return Math.floor(Math.random() * n);
}

function randColor() {
	return '#' + randInt(16*16*16).toString(16); // random 3-digits hex-length integer then convert it to hex via toString(16)
}

function initTable(matrix, size) {
	var table = $('<table></table>');
	var tr = $('<tr></tr>');
	var td = $('<td></td>');
	var square = $(`<div class='square'></div>`);
	td.append(square);
	
	for(var i=0; i<size; i++) {
		tr.append(td.clone()); // need to clone because otherwise it'll remove the previous DOM element we created when using append
	}
	for(var i=0; i<size; i++) {
		table.append(tr.clone());
	}
	
	matrix.append(table);
	
	initTableHover();
}


function initTableHover() {
	// highlight squares
	$('.square').on('mouseover', function() {
		//$(this).addClass('highlighted');
		$(this).css('background-color', randColor());
	});
}




jQuery(document).ready(function() {
	// 
	$('.top_button').on('click', function() {
		$('.top_button').removeClass('highlighted');
		$(this).addClass('highlighted');
	});
	
	initTableHover();
	
	// make squares
	$('#create_pad').on('click', function() {
		var matrix = $('#matrix');
		matrix.find('table').remove();
		initTable(matrix, 30);
		
	});
});









