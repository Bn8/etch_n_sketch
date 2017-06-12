const CONST_PEN_COLOR = "#fff";

var pen_options = ["Constant", "Rainbow", "Gradient"];
var pen_type = undefined;
var pen_paint_on = true;

function randInt(n) {
	return Math.floor(Math.random() * n);
}

function randColor() {
	return "rgb("+randInt(255)+","+randInt(255)+","+randInt(255)+")";
}

function initTable(matrix, size) {
	var table = $('<table cellspacing="0" cellpadding="0"></table>');
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
		if(false == pen_paint_on) {
			return;
		}
		
		var pen_color = getPenColor($(this));
		if(pen_color != undefined) {
			$(this).css('background-color', pen_color);
		}
		
	});
}

// get the pen color to paint a given square with depending on the current pen_type
function getPenColor(square) {
	switch(pen_type) {
		case "Rainbow":
			return randColor();
		case "Gradient":
			square.css("opacity", square.css("opacity")-0.1);
			return undefined;
		case "Constant":
		default:
			return CONST_PEN_COLOR;
	}
}

function addHoverHighlightEffect(dom_obj) {
	dom_obj.on('mouseenter', function() {
		$(this).addClass('highlighted');
	});
	dom_obj.on('mouseleave', function() {
		$(this).removeClass('highlighted');
	});
}

jQuery(document).ready(function() {
	// 
	addHoverHighlightEffect($('.top_button'));
	
	//
	initTableHover();
	
	// make squares
	$('#create_pad').on('click', function() {
		var matrix = $('#matrix');
		matrix.find('table').remove();
		initTable(matrix, 30);
		
	});
	
	// pen options initialize
	var dom_pen_option = $('#pen_option');
	for(var i=0; i<pen_options.length; i++) {
		dom_pen_option.append('<div class="d_p_o">'+pen_options[i]+'</div>');
		addHoverHighlightEffect($('.d_p_o'));
	}
	
	// pen options functionality
	dom_pen_option.on('click', 'div', function() {
		pen_type = $(this).text();
	});
	
	// keypress
	$('body').on('keypress', function(event) {
		switch(String.fromCharCode(event.which)) {
			case 'T':
			case 't':
				pen_paint_on = !pen_paint_on;
				$("#toggle_indicator").css("background-color", pen_paint_on ? "yellow" : "#880"); 
				break;
		}
		
	});
	
});









