const StorageService = require('../services/storage.service')
const storageService = new StorageService()

class UploadController {
    uploadFile (req, res) {
        const file = req.file
        const file_uri = storageService.uploadFile(file)
        res.status(200).send({ success: true, data: { file_uri } })
    }
}

module.exports = UploadController