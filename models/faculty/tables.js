var mongoose = require("mongoose");

var tableSchema = new mongoose.Schema({
    semester: String,
    tableimage: String,
    dateadded: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admins"
        },
        name: String
    },
});

module.exports = mongoose.model("tables", tableSchema);