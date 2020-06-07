window.addEventListener( 'load', () => {
	const container  = document.querySelector( '.container' ),
	      task       = document.querySelector( '.task' ),
	      btn_add    = document.querySelector( '.add' ),
	      btn_save   = document.querySelector( '.save' ),
	      btn_get    = document.querySelector( '.get' ),
	      list_group = document.querySelector( '.list-group' ),
	      notice     = document.querySelector( '.notices' );

	// Add items to list with button
	btn_add.addEventListener( 'click', () => {
		// Check if input is empty and show error if it is
		if ( task.value == 0 ) {
			notice.innerHTML = '';
			let error        = document.createElement( 'p' );
			error.classList.add( 'alert', 'alert-danger' );
			error.textContent = 'Input is empty. Add value to input!';
			notice.appendChild( error );
			task.focus();
			return;
		}

		addItem( task.value, list_group );
		notice.innerHTML = '<p class="alert alert-success">Item added successfully!</p>';
		task.value       = '';
	} );

	// Get saved list from local storage
	btn_get.addEventListener( 'click', () => {
		// Get item from local storage with name 'To do'
		const saved_list = JSON.parse( window.localStorage.getItem( 'To do' ) );

		// Check if there is saved list with name 'To do'
		if ( saved_list == null ) {
			notice.innerHTML = '';
			let error        = document.createElement( 'p' );
			error.classList.add( 'alert', 'alert-warning' );
			error.textContent = 'There is no saved list in local storage!';
			notice.appendChild( error );
			task.focus();
			return;
		}

		notice.innerHTML     = '<p class="alert alert-success">You\'ve got your saved list!</p>';
		list_group.innerHTML = '';

		// Loop through array of list items and add them to the list
		saved_list.map( list_item => addItem( list_item.value, list_group ) );
	} );

	// Save list to local storage
	btn_save.addEventListener( 'click', () => {
		const todo_items = list_group.querySelectorAll( '.list-group-item span' );

		// Check if list is empty
		if ( todo_items.length ) {
			notice.innerHTML = '';
			let error        = document.createElement( 'p' );
			error.classList.add( 'alert', 'alert-danger' );
			error.textContent = 'You don\'t have any items in list. Add items to list!';
			notice.appendChild( error );
			task.focus();
			return;
		}

		// Turn all span elements in li into array and than make objects with their value
		let list_items = [ ...todo_items ].map( item => {
			return { value: item.textContent };
		} );

		// Store created array of objects into local storage as JSON
		window.localStorage.setItem( 'To do', JSON.stringify( list_items ) );
		notice.innerHTML = '<p class="alert alert-primary">Your list is saved!</p>';
	} );

	// Add item to the list when enter is pressed
	task.addEventListener( 'keypress', e => {
		if ( e.code != 'Enter' ) return;

		if ( task.value == 0 ) {
			notice.innerHTML = '';
			let error        = document.createElement( 'p' );
			error.classList.add( 'alert', 'alert-danger' );
			error.textContent = 'Input is empty. Add value to input!';
			notice.appendChild( error );
			task.focus();
			return;
		}

		addItem( task.value, list_group );
		notice.innerHTML = '<p class="alert alert-success">Item added successfully!</p>';
		task.value       = '';
	} );

	// Listener for click events in container div and checks if the target is button with class remove
	// If it is, than it removes closest li
	// Remove button is visible while hovering on the right side of the li element
	container.addEventListener( 'click', e => {
		removeItem( e, e.target.closest( '.list-group-item' ) );
	} );

	function removeItem( event, target ) {
		let target_element = event.target;
		if ( target_element.classList.contains( 'remove' ) ) {
			target.remove();
		}
	}

	// Adds li elements to some HTML element provided
	function addItem( value, output ) {
		let list_item = document.createElement( 'li' );
		list_item.classList.add( 'list-group-item' );
		list_item.innerHTML = `<span>${ value }</span> <button type="button" class="btn btn-danger remove">-</button>`;
		output.appendChild( list_item );
	}
} );