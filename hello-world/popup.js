// The following is a jQuery function call:

// $(...);
// Which is the "jQuery function." $ is a function, and $(...) is you calling that function.

// The first parameter you've supplied is the following:

// function() {}
// The parameter is a function that you specified, and the $ function will call the supplied method when the DOM finishes loading.

// $('#name) is just document.getElementById(name)

$(function() {
	$('#name').keyup(function() {
		$('#greet').text('Hello ' + $('#name').val());
	});
});
