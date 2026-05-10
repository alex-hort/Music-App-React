import axios from "axios";

const client = axios.create({
    baseURL: "http://192.168.2.185:8989",
})

export default client;