const StorageService = require('../services/storage.service')
const storageService = new StorageService()

class UploadController {
    uploadFile (req, res) {
        const file = req.file
        const file_url = storageService.uploadFile(file)
        res.status(200).send({ success: true, data: { file_url } })
    }
}

module.exports = UploadController