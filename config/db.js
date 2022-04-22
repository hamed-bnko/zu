const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected ...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
// "sniper.mais-aream.com"
module.exports = connectDB;
//كلية طب الاسنان
// "mongoURI": "mongodb+srv://mouner:1234m1234A@cluster0.rji1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
// الجامعة الاكاديمية
// "mongoURI": "mongodb+srv://hamed:123456789-h@cluster0.df7pd.mongodb.net/zau?retryWrites=true&w=majority",
