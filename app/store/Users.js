J.store('Users', {
			model : 'User',
			proxy : {
				api : {
					query : 'data/users.json',
					edit : 'data/users.json',
					invalid : 'data/users.json',
					excel : 'data/users.json'
				}
			}
		})