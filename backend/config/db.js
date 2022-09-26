const mongoose = require('mongoose');
const { DB_URI } = process.env;

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB connected: ${conn.connection.host}`.magenta.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
