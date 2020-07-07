const fs = require('fs')
const path = require('path')

const STORAGE_PATH = path.resolve(__dirname)

class StorageService {
    uploadFile (file) {
        const file_id = Date.now()
        const file_name = `${file_id}-${file.originalname}`
        const file_path = path.resolve(STORAGE_PATH, '..', 'public', 'storage', file_name)

        fs.writeFileSync(file_path, file.buffer)

        const file_uri = `/storage/${file_name}`
        
        return file_uri
    }
}

module.exports = StorageService