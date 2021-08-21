const mongoose = require("mongoose");
const mongoPath  = "mongo_url"

module.exports = async () => {
    await mongoose.connect(mongoPath, {

    });
    return mongoose;
}
