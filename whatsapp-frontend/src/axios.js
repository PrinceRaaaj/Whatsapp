import axios from "axios";

const instance = axios.create({
    baseURL: "http://whatsapp-prince.herokuapp.com"
});

export default instance;