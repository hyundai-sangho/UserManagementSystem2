const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		// 몽고 디비 연결
		const con = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});

		console.log(`몽고 디비 연결 : ${con.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDB;
