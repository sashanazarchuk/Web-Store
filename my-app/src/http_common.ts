import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:5212",
    withCredentials: true, // Дозволяє передачу куків у запитах
    headers: {
        "Content-type": "application/json"
    }
});

export default http;