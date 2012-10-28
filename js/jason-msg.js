/* ==========================================================
 * 
 * jason-msg.js
 * 
 * msg in app
 * 2012/10/24
 * 
 * ========================================================== */
!function(J) {
	'use strict'

	J.msg = {
		success : '操作成功',
		failure : '操作失败',
		validation_error : '验证失败',
		error_duplicate_name : '名称重复',
		phone_message : '操作成功，资产编号：{0}'
	}

	J.msg.get = function(msg, val) {
		if (typeof J.msg[msg] == 'undefined') {
			return null
		}

		if (!val)
			return J.msg[msg]
		return Ext.String.format(J.msg[msg], val)
	}
}(window.J)