import axios from "axios"

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
})

// custom phương thức get của request.get để return ra res.data thay vì chỉ return ra res
export const get = async (path, options = {}) => {
    const response = await request.get(path, options)
    return response.data
}

export default request