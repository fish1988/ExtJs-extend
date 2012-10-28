/* ==========================================================
 * 
 * jason-mask.js
 * 
 * loading mask
 * 2012/10/25
 * 
 * ========================================================== */
!function(J) {
	'use strict'

	J.mask = {
		loadingMask : null
	}
	J.mask.show = function(text) {
		J.mask.loadingMask = new Ext.LoadMask(Ext.getBody(), {
					msg : text || 'loading',
					removeMask : true
				})
		J.mask.loadingMask.show()
	}

	J.mask.hide = function() {
		J.mask.loadingMask.hide()
	}

}(window.J)