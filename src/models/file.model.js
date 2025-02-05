const mongoose = require("mongoose")


const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true }, 
    uploadedAt: { type: Date, default: Date.now },
    fileType: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // If file is linked to a user
  });


const File = mongoose.model(
    "File", fileSchema
);

module.exports = File