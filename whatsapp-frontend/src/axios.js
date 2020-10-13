import axios from "axios";

const instance = axios.create({
    baseURL: "https://whatsapp-prince.herokuapp.com"
});

export default instance;