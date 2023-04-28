const axios = require('axios');

exports.homeRoutes = async (req, res) => {
	// Make a get request to /api/users
	try {
		await axios.get('http://localhost:5555/api/users').then((response) => {
			res.render('index', { users: response.data });
		});
	} catch (err) {
		res.send(err);
	}
};

exports.add_user = (req, res) => {
	res.render('add_user');
};

exports.update_user = async (req, res) => {
	try {
		await axios.get('http://localhost:5555/api/users', { params: { id: req.query.id } }).then((userData) => {
			res.render('update_user', { user: userData.data });
		});
	} catch (err) {
		res.send(err);
	}
};
