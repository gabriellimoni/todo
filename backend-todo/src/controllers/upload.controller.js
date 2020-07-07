const StorageService = require('../services/storage.service')
const storageService = new StorageService()

class UploadController {
    uploadFile (req, res) {
        const file = req.file
        const file_data = storageService.uploadFile(file)
        const { key, url } = file_data
        res.status(200).send({ success: true, data: { key, url } })
    }
}

module.exports = UploadController