var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var uuid64 = require('uuid64');

//handles image upload
exports.upload_image = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var file = files.file;
        var tempPath = file.path;
        var rename = uuid64();
        var targetPath = path.resolve('./public/assets/images/upload/'  + rename + file.name );
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                throw err
            }
            return res.json({path: 'assets/images/upload/'  + rename + file.name })
        })
    });
};