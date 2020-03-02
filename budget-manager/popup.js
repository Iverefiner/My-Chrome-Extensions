// this file managers what you see when you click the extension icon

// jquery
//$(#total) = document.getElementById(total)

$(function() {
	// everytime it loads, it grabs the value of total from the state and sets it to the total id
	chrome.storage.sync.get([ 'total', 'limit' ], function(budget) {
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);
	});
	//when spendAmount id button is clicked
	$('#spendAmount').click(function() {
		// first argument: get the variable from total id using chrome storage api
		// second argument: asynchronous function takes an object
		// I think it creates an object called budget with a total key inside?
		chrome.storage.sync.get([ 'total', 'limit' ], function(budget) {
			// set a new variable to hold newTotal
			let newTotal = 0;
			// if budget.total exists
			if (budget.total) {
				// then add it to the newTotal
				// parse turns string input into integer
				newTotal += parseInt(budget.total);
			}
			// set value from amount (whatever user enters) id to a variable
			let amount = $('#amount').val();
			// if the amount value exists
			if (amount) {
				// then add it to the newTotal
				newTotal += parseInt(amount);
			}
			// set/send back the storage state with what we have
			chrome.storage.sync.set({ total: newTotal }, function() {
				if (amount && newTotal >= budget.limit) {
					let notifOptions = {
						type: 'basic',
						iconUrl: 'icon48.png',
						title: 'Limit reached!',
						message: "Uh oh! Looks like you've reached your limit!"
					};
					// takes 2 arguments. one for id, and one for the object above
					chrome.notifications.create('limitNotif', notifOptions);
				}
			});
			// reset the UI to show the newTotal and empty input box afterwards
			$('#total').text(newTotal);
			$('#amount').val('');
		});
	});
});
