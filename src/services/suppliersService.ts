import { api } from "./api"

const getAll = () => {
    return api.get("/suppliers");
}

const getById = (id: string) => {
    return api.get(`/suppliers/${id}`)
}

export default {
    getAll,
    getById
}