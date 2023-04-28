let UserDb = require('../model/model');

// 새 사용자 생성 및 저장
exports.create = (req, res) => {
	// 요청 확인
	if (!req.body) {
		res.status(400).send({
			message: 'body에 데이터가 비었어. 다시 잘 확인해 봐요.',
		});
		return;
	}

	// 신규 사용자 추가
	const user = new UserDb({
		name: req.body.name,
		email: req.body.email,
		gender: req.body.gender,
		status: req.body.status,
	});

	// 데이터베이스에 사용자 저장
	user
		.save(user)
		.then(() => {
			res.redirect('/add-user');
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || '사용자를 생성하는 동안 일부 오류가 발생했습니다.',
			});
		});
};

// 모든 사용자 검색 및 반환 / 단일 사용자 검색 및 반환
exports.find = (req, res) => {
	if (req.query.id) {
		const id = req.query.id;

		UserDb.findById(id)
			.then((data) => {
				if (!data) {
					res.status(404).send({
						message: 'id에 해당하는 사용자가 존재하지 않습니다.',
					});
				} else {
					res.send(data);
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: 'id에 해당하는 사용자를 찾을 수 없습니다.',
				});
			});
	} else {
		UserDb.find()
			.then((user) => {
				res.send(user);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.message || '사용자 정보를 검색하는 동안 오류가 발생했습니다..',
				});
			});
	}
};

// 사용자 ID로 식별된 새 사용자를 업데이트합니다.
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'body에 데이터가 비었어. 다시 잘 확인해 봐요.',
		});
	}

	const id = req.params.id;

	UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `${id}의 데이터를 업데이트 하지 못했어. 해당 id의 데이터가 디비에 없는 것 같아. `,
				});
			} else {
				res.send(data);
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || '사용자 정보를 업데이트하는 동안 오류가 발생했습니다.',
			});
		});
};

// 요청에 지정된 사용자 ID를 가진 사용자 삭제
exports.delete = (req, res) => {
	const id = req.params.id;

	UserDb.findByIdAndDelete(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `${id}의 데이터를 삭제하지 못했어. 해당 id의 데이터가 디비에 없는 것 같아. `,
				});
			} else {
				res.send({
					message: '사용자가 성공적으로 삭제되었습니다!',
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `${id}의 데이터를 삭제하지 못했어.`,
			});
		});
};
