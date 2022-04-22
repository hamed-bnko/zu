var mongoose = require("mongoose");

var planSchema = new mongoose.Schema({
    semester: String,
    planimage: String,
    dateadded: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admins"
        },
        name: String
    },
});

module.exports = mongoose.model("plans", planSchema);