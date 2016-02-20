( function( wp, $ ) {

	var api = wp.customize;

	api.WPDLibColorControl = api.Control.extend({
		ready: function() {
			var control = this;
			var input = this.container.find( '.wpdlib-input-color' );

			input.wpColorPicker({
				change: function() {
					control.setting.set( input.wpColorPicker( 'color' ) );
				},
				clear: function() {
					control.setting.set( '' );
				}
			});

			this.setting.bind( function( value ) {
				input.val( value );
				input.wpColorPicker( 'color', value );
			});
		}
	});

	api.WPDLibMediaControl = api.Control.extend({
		/*ready: function() {
			var control = this;
			var input = this.container.find( '.wpdlib-input-media' );

			input.wpMediaPicker({
				change: function() {
					control.setting.set( input.wpMediaPicker( 'value' ) );
				},
				clear: function() {
					control.setting.set( '' );
				}
			});
		}*/
	});

	api.WPDLibMapControl = api.Control.extend({
		/*ready: function() {
			var control = this;
			var input = this.container.find( '.wpdlib-input-map' );

			input.wpMapPicker({
				change: function() {
					control.setting.set( input.wpMapPicker( 'value' ) );
				}
			});
		}*/
	});

	api.controlConstructor.wpdlib_color = api.WPDLibColorControl;
	api.controlConstructor.wpdlib_media = api.WPDLibMediaControl;
	api.controlConstructor.wpdlib_map = api.WPDLibMapControl;

})( wp, jQuery );