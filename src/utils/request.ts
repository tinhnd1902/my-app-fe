import axios from "axios";

const request = axios.create({
        baseURL: 'http://localhost:3000/'
})

export const get = async (path: any, options = {}) => {
    const res = await request.get(path, options)
    return res.data
}

export default request