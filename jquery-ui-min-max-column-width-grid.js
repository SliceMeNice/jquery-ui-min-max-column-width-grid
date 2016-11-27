/*!
 * Min/Max Column-Width Grid based on jQuery UI Widget
 * Author: office@slicemenice.de
 * Licensed under the MIT license
 *
 *  Requires UI version 1.9+
 */

( function ( $, window, document, undefined ) {

	$.widget( 'smn.minMaxColumnWidthGrid', {

		options: {
			minColumnWidth: 250,
			maxColumnWidth: 300
		},

		_create: function() {
			var widget = this;

			widget.layout = $.debounce( 100, widget._layout );
			widget.layout();

			widget._on( true, window, {
				'resize': function( event ) {
					widget.layout();
				}
			} );
		},

		_layout: function() {
			var widget = this;

			var $container = this.element;
			var columnWidth = widget._computeColumnWidth();

			$container.children().css( {
				width: columnWidth + 'px'
			} );
		},

		_computeColumnWidth: function() {
			var widget = this;

			var $container = this.element;

			var minColumnWidth = widget.options.minColumnWidth;
			var maxColumnWidth = widget.options.maxColumnWidth;
			var containerWidth = Math.floor( $container.width() - 1 );

			var minColumnCount = containerWidth / minColumnWidth;
			var maxColumnCount = containerWidth / maxColumnWidth;

			var columnCount = Math.max( Math.round( ( maxColumnCount + minColumnCount ) / 2 ), 1 );

			return Math.floor( containerWidth / columnCount );
		}

	} );

})( jQuery, window, document );
