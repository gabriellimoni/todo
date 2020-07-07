import api from './api'

async function uploadFile (file) {
    const form_data = new FormData()
    form_data.append('file', file)

    const { data } = await api.post('upload', form_data)

    return data.data
}

export default {
    uploadFile,
}
