/* ==========================================================
 * 
 * jason-actions.js
 * 
 * common actions config
 * 2012/10/24
 * 
 * ========================================================== */
!function(J) {

	'use strict'

	J.toolbar = {
		hasOne : function(records) {
			if (records == null || records.length == 0) {
				Ext.Msg.alert('提示', "请选择记录")
				return false
			} else if (records.length > 1) {
				Ext.Msg.alert('提示', "只能选择一条记录进行修改")
				return false
			} else {
				return true
			}
		},
		hasMore : function(records) {
			if (records == null || records.length == 0) {
				Ext.Msg.alert('提示', "请选择记录")
				return false
			} else {
				return true
			}
		}
	}

	J.actions = {

		/************************
		 *  about form actions
		 */
		// grid afterrender
		'grid' : {
			afterrender : function(grid) {
				var form = grid.down('form')
				form
						? grid.store.proxy.url = grid.store.proxy.api.query
								+ '?' + form.getForm().getValues(true, true)
						: grid.store.proxy.url = grid.store.proxy.api.query
				grid.store.load()
			}
		},

		// form query btn
		'button[action=query]' : {
			click : function(btn) {
				var grid = btn.up('grid')
				grid.store.proxy.url = grid.store.proxy.api.query + '?'
						+ grid.down('form').getForm().getValues(true, true)
				grid.store.loadPage(1)
			}
		},
		// reset query form
		'button[action=reset]' : {
			click : function(btn) {
				btn.up('form').getForm().reset()
			}
		},

		/************************
		 *  grid toolbar actions
		 */
		// grid add
		'button[action=add]' : {
			click : function(btn) {
				var win = Ext.widget(btn.target)
				win.show()
				win.reloadStore = btn.up('grid').store
			}
		},
		// grid one
		// grid more

		// grid edit
		'button[action=edit]' : {
			click : function(btn) {
				var grid = btn.up('grid'), records = grid.getSelectionModel()
						.getSelection()
				if (!J.toolbar.hasOne(records)) {
					return
				}
				var win = Ext.widget(btn.target), form = win.down('form')
				form.getForm().loadRecord(records[0])
				win.setTitle(win.title.replace('增加', '编辑'))
				win.show()
				win.reloadStore = grid.store
			}
		},
		// grid invalid
		'button[action=invalid]' : {
			click : function(btn) {
				console.log('invalid')
				var grid = btn.up('grid'), records = grid.getSelectionModel()
						.getSelection(), rowId = grid.rowId, ids = []
				if (!J.toolbar.hasMore(records)) {
					return
				}

				for (var i in records) {
					ids.push(records[i].get(rowId))
				}

				// confirm
				Ext.MessageBox.confirm('提示', '确认无效 ' + ids.length + '条记录？',
						function(btnText) {
							if (btnText == 'no')
								return
							Ext.Ajax.request({
										waitMsg : '正在删除...',
										url : grid.store.proxy.api.invalid
												+ '?ids=' + ids,
										method : 'POST',
										success : function(response) {
											var result = Ext
													.decode(response.responseText)
											if (result.success == true) {
												Ext.Msg.alert('提示', J.msg.get(
																result.message,
																result.value)
																|| '操作成功')
												grid.store.reload()
											} else
												Ext.Msg.alert('提示', J.msg.get(
																result.message,
																result.value)
																|| '操作失败')
										}
									})
						})
			}
		},
		// grid excel
		'button[action=excel]' : {
			click : function(btn) {
				console.log('excel')

				var grid = btn.up('grid'), form = grid.down('form').getForm()
				if (form.isValid()) {
					J.mask.show('操作进行中')
					Ext.Ajax.request({
								url : grid.store.proxy.api.excel + '?'
										+ form.getValues(true, true),
								method : 'POST',
								success : function(response) {
									J.mask.hide()
									var result = Ext
											.decode(response.responseText);
									if (result.success == true
											&& result.message)
										location.href = result.message
									else
										Ext.Msg.alert('提示', J.msg.get(
														result.message,
														result.value)
														|| '数据导出失败')
								}
							});
				}
			}
		},
		// grid reload
		'button[action=f5]' : {
			click : function(btn) {
				var grid = btn.up('grid')
				grid.store.reload()
			}
		},

		/************************
		 *  window forms
		 */
		// window form save action
		'button[action=save]' : {
			click : function(btn) {

				var win = btn.up('window'), form = win.down('form').getForm(), store = win.reloadStore
				if (typeof store == 'undefined') {
					console.log('win.reloadStore 不存在')
					return
				}

				if (form.isValid()) {
					form.submit({
								waitMsg : '正在保存...',
								url : store.proxy.api.edit, //
								method : 'POST',
								success : function(form, action) {
									Ext.Msg.alert('提示', J.msg.get(
													action.result.message,
													action.result.value)
													|| '操作成功')
									win.close()
									store.reload()
								},
								failure : function(form, action) {
									Ext.Msg.alert('提示', J.msg.get(
													action.result.message,
													action.result.message)
													|| '操作失败')
								}
							});
				}
			}
		},
		// cancel window
		'button[action=cancel]' : {
			click : function(btn) {
				btn.up('window').close()
			}
		}

	}

}(window.J)