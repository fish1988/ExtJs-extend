J.view('user.Edit', {
			extend : 'Ext.window.Window',
			alias : 'widget.useredit',
			modal : true,
			requires : ['Ext.form.Panel'],

			title : 'add',
			layout : 'fit',
			autoShow : true,
			height : 180,
			width : 300,

			initComponent : function() {
				this.items = [{
							xtype : 'form',
							padding : '5 5 0 5',
							border : false,
							style : 'background-color: #fff;',

							items : [{
										xtype : 'textfield',
										name : 'name',
										fieldLabel : 'Name',
										allowBlank : false
									}, {
										xtype : 'textfield',
										name : 'email',
										fieldLabel : 'Email',
										allowBlank : false
									}]
						}]

				this.buttons = [{
							text : 'save',
							action : 'save'
						}, {
							text : 'cancel',
							action : 'cancel'
						}]

				this.callParent(arguments)
			}
		})
