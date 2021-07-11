const mongoose = require("mongoose");
const mongoPath  = require(process.env.MONGO_BOT);

module.exports = async () => {
    await mongoose.connect(mongoPath, {

    });
    return mongoose;
}
