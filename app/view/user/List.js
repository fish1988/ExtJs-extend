/**
 * user list view 
 * 
 * layout:
 *     -----------
 *     |query form  -[i] [i] [s] [i]   [b]
 *     |                        
 *     -----------
 *     |grid
 */
J.view('user.UserQueryForm', {
			extend : 'Ext.form.Panel',
			alias : 'widget.userqueryform',
			requires : ['Ext.layout.container.Table'],
			initComponent : function() {
				var me = this
				Ext.apply(me, {
							defaultType : 'textfield',
							border : false,
							layout : {
								type : 'table',
								columns : 6
							},
							items : [{
										fieldLabel : '英文名',
										emptyText : '请输入...',
										name : 'englishName'
									}, {
										fieldLabel : '中文名',
										emptyText : '请输入...',
										name : 'chineseName'
									}, {
										fieldLabel : '联系人',
										emptyText : '请输入...',
										name : 'contactPerson'
									}, {
										xtype : 'button',
										width : 65,
										style : 'margin-left:40px;',
										text : '查询',
										action : 'query'
									}, {
										xtype : 'button',
										width : 65,
										style : 'margin-left:20px;',
										text : '重置',
										action : 'reset'
									}]
						})

				me.callParent(arguments)
			}
		});

J.view('user.List', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.userlist',
			requires : ['Ext.grid.RowNumberer'],
			initComponent : function() {
				var me = this
				Ext.apply(me, {
							title : '用户管理',
							rowId : 'userId',
							store : 'Users',
							columns : [{
										xtype : 'rownumberer',
										width : 37,
										sortable : false
									}, {
										header : '序号',
										dataIndex : 'userId',
										sortable : true,
										hidden : true
									}, {
										header : '英文名',
										dataIndex : 'englishName',
										sortable : true,
										flex : 1
									}, {
										header : '中文名',
										dataIndex : 'chineseName',
										sortable : true,
										flex : 1
									}, {
										header : '密码',
										dataIndex : 'password',
										sortable : false,
										hidden : true
									}, {
										header : '类型',
										dataIndex : 'userType',
										sortable : true,
										flex : 1
									}, {
										header : '父编号',
										dataIndex : 'userParentId',
										sortable : true,
										flex : 1
									}, {
										header : '联系人',
										dataIndex : 'contactPerson',
										sortable : true,
										flex : 1
									}, {
										header : '邮箱',
										dataIndex : 'email',
										sortable : true,
										flex : 1
									}, {
										header : '联系方式',
										dataIndex : 'phoneNumber',
										sortable : true,
										flex : 1
									}, {
										header : '描述',
										dataIndex : 'desc',
										sortable : true,
										flex : 1
									}, {
										header : '用户地址',
										dataIndex : 'address',
										sortable : true,
										flex : 1
									}, {
										header : '状态',
										dataIndex : 'status',
										sortable : true,
										flex : 1
									}],

							dockedItems : [{
										xtype : 'container',
										dock : 'top',
										items : Ext.widget('userqueryform')
									}, {
										xtype : 'toolbar',
										dock : 'top',
										items : [{
													xtype : 'button',
													text : '添加',
													action : 'add',
													target : 'useredit'
												}, {
													xtype : 'button',
													text : '编辑',
													action : 'edit',
													target : 'useredit'
												}, {
													xtype : 'button',
													text : '无效',
													action : 'invalid'
												}, {
													xtype : 'button',
													text : '导出',
													action : 'excel'
												}, {
													xtype : 'button',
													text : '刷新',
													action : 'f5'
												}]
									}]
						})
				me.callParent(arguments)
			}
		})