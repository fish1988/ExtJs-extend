/* ==========================================================
 * 
 * jason-base.js
 * 
 * use to build extjs application
 * 2012/10/24
 * 
 * ========================================================== */

!function(window) {

	'use strict'

	// IE debug
	if (!window.console) {
		window.console = {
			log : function(params) {
			}
		}
	}
	
	var J = {}

	// app config
	J.config = {
		name : 'DB'
	}

	// app cache
	J.cache = {}

	// name changed : make it to use short names
	J.changeName = function(name, compareStr) {
		if (name.indexOf(compareStr) == -1) {
			return J.config.name + compareStr + name
		} else
			return name
	}

	// use Ext.application
	J.app = function(options) {
		if (typeof options != 'undefined' && options.name
				&& options.name.length) {
			J.config.name = options.name
		} else {
			console.log('warning in app config : not set name #J.app')

		}
		Ext.application(options)
	}

	// model define : use Ext.define
	/**
	 * Ext.define('AM.model.User', {              ===> J.model('User',{
	 * 		extend: 'Ext.data.Model',					  fields: ['id', 'name', 'email']							
	 * 		fields: ['id', 'name', 'email']				})	
	 *	})												
	 *
	 */
	J.model = function(name, options) {
		if (typeof name != 'undefined' && typeof options != 'undefined'
				&& options.fields) {

			Ext.define(J.changeName(name, '.model.'), Ext.apply({
								extend : 'Ext.data.Model'
							}, options))
		} else {
			console.log('err in model define name:' + name + ' #J.model')
		}
	}

	// base store here
	J.config.baseStore = {
		extend : 'Ext.data.Store',
		autoLoad : false,
		pageSize : 15,
		remoteSort : true,
		proxy : {
			type : 'ajax',
			sortParam : 'sort',
			directionParam : 'dir',
			simpleSortMode : true,
			url : '',
			reader : {
				type : 'json',
				root : 'items',
				totalProperty : 'total',
				successProperty : 'success'
			}

		},
		sorters : [{
					property : 'lastModifyTime',
					direction : 'DESC'
				}]
	}

	// store define : use Ext.define
	/**
		Ext.define('EXP.store.Carriers', {                   ====> J.store('Carriers',{	model :'Carrier',autoLoad:true})
					extend : 'Ext.data.Store',
					model : 'EXP.model.Carrier',
					autoLoad : false,
					pageSize : 15,
					remoteSort : true,
					proxy : {
						type : 'ajax',
						sortParam : 'sort',
						directionParam : 'dir',
						simpleSortMode : true,
						reader : {
							type : 'json',
							root : 'items',
							totalProperty : 'total',
							successProperty : 'success'
						}
		
					},
					sorters : [{
								property : 'lastModifyTime',
								direction : 'DESC'
							}]
				})
	 *
	 */
	J.store = function(name, options) {
		if (typeof name != 'undefined' && typeof options != 'undefined'
				&& typeof options.model != 'undefined') {
			// modify model name to short name
			options.model = J.changeName(options.model, '.model.')
			Ext.define(J.changeName(name, '.store.'), Ext.merge(
							J.config.baseStore, options))
		} else {
			console.log('err in store define name:' + name + ' #J.model')
		}
	}

	// define controller ====> J.control('UserCtrl',{})
	// just get rid of "extend:'Ext.app.Controller'"
	J.control = function(name, options) {
		if (typeof name != 'undefined' && typeof options != 'undefined') {
			Ext.define(J.changeName(name, '.controller.'), Ext.apply({
								extend : 'Ext.app.Controller'
							}, options))
		} else {
			console
					.log('err in controller define name:' + name
							+ ' #J.control')
		}
	}

	// defined view ===> J.view('user.UserList',{})
	J.view = function(name, options) {
		if (typeof name != 'undefined' && typeof options != 'undefined') {
			Ext.define(J.changeName(name, '.view.'), options)
		} else {
			console.log('err in view define name:' + name + ' #J.view')
		}
	}

	// use to create views
	J.create = function(name) {
		return Ext.create(J.changeName(name, '.view.'))
	}

	typeof window.J == 'undefined' ? window.J = J : ''

}(window)