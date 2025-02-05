const { File } = require("../models");

class S3Service {
    async uploadProfilePicture({ originalname, mimetype, location }){
        const file = new File({
            fileName: originalname,
            fileUrl: location,
            fileType: mimetype,
          });
          await file.save();
        return file
    }
}


module.exports = S3Service