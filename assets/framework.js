( function( exports, wp ) {

	exports.init = function() {
		var settings_keys = Object.keys( exports.settings );

		for ( var i in settings_keys ) {
			var setting_slug = settings_keys[ i ];
			var setting_args = exports.settings[ setting_slug ];
			var setting_function = undefined;
			var setting_timeout = 0;

			if ( typeof setting_args.callback !== 'undefined' ) {
				if ( typeof setting_args.callback === 'string' && typeof exports.callbacks[ setting_args.callback ] === 'function' ) {
					setting_function = exports.callbacks[ setting_args.callback ];
				} else if ( typeof setting_args.callback === 'function' ) {
					setting_function = setting_args.callback;
				}
				setting_args.callback = undefined;
			}

			if ( typeof setting_args.timeout !== 'undefined' ) {
				setting_timeout = parseInt( setting_args.timeout, 10 );
				setting_args.timeout = undefined;
			}

			if ( setting_function ) {
				if ( setting_timeout > 0 ) {
					wp.customize( setting_slug, function( style ) {
						var intent = undefined;

						style.bind( function( value ) {
							if ( typeof intent !== 'undefined' ) {
								window.clearTimeout( intent );
							}

							intent = window.setTimeout( function() {
								exports.update_setting( setting_function, value, setting_args );
							}, setting_timeout );
						});
					});
				} else {
					wp.customize( setting_slug, function( style ) {
						style.bind( function( value ) {
							exports.update_setting( setting_function, value, setting_args );
						});
					});
				}
			}
		}
	};

	exports.update_setting = function( callback, value, args ) {
		callback.call( value, args );
	};

})( wpcd_customizer, wp );