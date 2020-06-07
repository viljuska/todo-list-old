import { removeItem, createElement, addListItem } from './utils';

window.addEventListener( 'load', () => {
	const task_input = document.querySelector( '#task' ),
	      task_list  = document.querySelector( '.tasks' ),
	      notices    = document.querySelector( '.notices' );

	document.addEventListener( 'click', e => {
		if ( !e.target.closest( '.add' ) ) return;
		addListItem( e, task_input, task_list, notices );
	} );

	document.addEventListener( 'keyup', e => {
		if ( e.key !== 'Enter' ) return;
		addListItem( e, task_input, task_list, notices );
	} );

	document.addEventListener( 'click', e => {
		if ( !e.target.closest( '.remove' ) ) return;

		removeItem( e.target );
	} );
} );