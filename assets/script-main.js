const CONST_PEN_COLOR = "#fff";
const MATRIX_CELLSPACING = 0;
const MATRIX_CELLPADDING = 0;
const MATRIX_SIZE_NUM = 540;
const MATRIX_SIZE_PX = MATRIX_SIZE_NUM + 'px';
const MATRIX_DEFAULT_DIMENSION = 20;
const SQUARE_CLASS_NAME = "square";
const SQUARE_BORDER_ON = "1px solid rgba(0, 255, 0, 0.1)"
const SQUARE_BORDER_OFF = "0px solid rgba(0, 255, 0, 0.1)"

var pen_options = ["Constant", "Rainbow", "Gradient"];
var pen_type = undefined;
var pen_paint_on = true;
var is_square_border_on = false;

function randInt(n) {
	return Math.floor(Math.random() * n);
}

function randColor() {
	return "rgb("+randInt(255)+","+randInt(255)+","+randInt(255)+")";
}

function initTable(matrix, dim) {
	// create table with no spaces between rows and columns
	var table = $('<table></table>');
	table.attr('cellspacing',MATRIX_CELLSPACING);
	table.attr('cellpadding',MATRIX_CELLPADDING);
	var tr = $('<tr></tr>');
	var td = $('<td></td>');
	var square = $('<div></div>');
	square.attr('class',SQUARE_CLASS_NAME);	
	square.css('width',MATRIX_SIZE_NUM/dim + 'px');
	square.css('height',MATRIX_SIZE_NUM/dim + 'px');
	td.append(square);
	
	for(var i=0; i<dim; i++) {
		tr.append(td.clone()); // need to clone because otherwise it'll remove the previous DOM element we created when using append
	}
	for(var i=0; i<dim; i++) {
		table.append(tr.clone());
	}
	
	matrix.append(table);
	
	initTableHover();
}


function resetMatrix(dim) {
	var matrix = $('#matrix');	
	matrix.find('table').remove();
	matrix.attr('width',MATRIX_SIZE_PX);
	matrix.attr('height',MATRIX_SIZE_PX);
	initTable(matrix, dim);
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

// add highlight effect for selected dom objects (like dropdown)
function addHoverHighlightEffect(dom_obj) {
	dom_obj.on('mouseenter', function() {
		$(this).addClass('highlighted');
	});
	dom_obj.on('mouseleave', function() {
		$(this).removeClass('highlighted');
	});
}

// "main" if u will
jQuery(document).ready(function() {
	// make buttons highlight when hovering them
	addHoverHighlightEffect($('.top_button'));
	
	// default matrix
	resetMatrix(MATRIX_DEFAULT_DIMENSION);
	
	// reset the matrix
	$('#reset_pad').on('click', function() {
		var dim = Number(prompt("Please enter matrix dimension(1-100):", ""+MATRIX_DEFAULT_DIMENSION)); // more at their own risk! but im allowing it for fun
		resetMatrix(dim);
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
	
	// toggle borders buttons
	$("#btoggle_square_border").on('click', function(){
		var squares_dom = $("."+SQUARE_CLASS_NAME);
		squares_dom.css("border", is_square_border_on ? SQUARE_BORDER_OFF : SQUARE_BORDER_ON);
		is_square_border_on = !is_square_border_on;
	} );
	
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









