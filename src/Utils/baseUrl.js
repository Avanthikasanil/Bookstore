import axios from "axios"

const api = axios.create({
   
    baseURL : "http://localhost:4000",
        // "bookstore-backend-lovat-two.vercel.app"
    
    

});

api.interceptors.request.use(

    function (config) {

        return config;
    }

)
export default api;