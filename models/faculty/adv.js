var mongoose = require("mongoose");

var freklamaSchema = new mongoose.Schema({
    image: String,
    title: String,
    discription: String,
    entitle: String,
    endiscription: String,
    link: String,
    details : String,
    file: Array,
    imagegalary : Array,
    dateadded: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admins"
        },
        name: String
    },
});

module.exports = mongoose.model("facultyreklama", freklamaSchema);