const mongoose = require("mongoose");
const mongoPath  = "mongodb+srv://conghal:thuongvu1@avena.g9r2z.mongodb.net/test"

module.exports = async () => {
    await mongoose.connect(mongoPath, {

    });
    return mongoose;
}