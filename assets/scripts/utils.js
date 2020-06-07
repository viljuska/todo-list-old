/**
 * Removes parent Element
 *
 * @param target_element
 */
function removeItem( target_element ) {
	target_element.parentElement.remove();
}

/**
 * Adds li elements to some HTML element provided
 *
 * @param e
 * @param task_input
 * @param output_element
 * @param notices
 */
function addListItem( e, task_input, output_element, notices ) {
	if ( !task_input.value ) {
		!notices.childElementCount && notices.insertAdjacentElement( 'beforeend', createElement( 'p', [ 'alert', 'alert-danger' ], 'You must add task.' ) );
		return;
	}
	const list_item_value = `<span>${ task_input.value }</span> <button type="button" class="btn btn-danger remove">&times;</button>`;
	output_element.appendChild( createElement( 'li', [ 'list-group-item' ], list_item_value ) );
	task_input.value  = '';
	notices.innerHTML = '';
}

/**
 *
 * @param element
 * @param el_class
 * @param el_value
 * @returns {*} HTML Element with entered class and value
 */
function createElement( element, el_class, el_value ) {
	const new_element = document.createElement( element );
	if ( el_class ) {
		new_element.classList.add( ...el_class );
	}
	new_element.innerHTML = el_value;
	return new_element;
}

export {
	removeItem,
	addListItem,
	createElement,
};