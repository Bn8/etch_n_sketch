jQuery(document).ready(function() {
	$('a').on('click', function() {
		$('a').removeClass('highlighted');
		$(this).addClass('highlighted');
	});
});