// this file managers the options menu

$(function() {
	chrome.storage.sync.get('limit', function(budget) {
		$('#limit').val(budget.limit);
	});
	// when we click the saveLimit button
	$('#saveLimit').click(function() {
		// set value of the limit span in popup.html to the limit variable
		let limit = $('#limit').val();
		if (limit) {
			chrome.storage.sync.set({ limit: limit }, function() {
				close();
			});
		}
	});

	$('#resetTotal').click(function() {
		chrome.storage.sync.set({ total: 0 }, function() {
			let notifOptions = {
				type: 'basic',
				iconUrl: 'icon48.png',
				title: 'Total Reset!',
				message: 'Total has been reset to 0!'
			};
			// takes 2 arguments. one for id, and one for the object abov
			chrome.notifications.create('limitNotif', notifOptions);
		});
	});
});
