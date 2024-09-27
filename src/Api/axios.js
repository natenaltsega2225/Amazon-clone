import axios from "axios"
const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-75883/us-central1/api" local instance of firebase functions 
    

    //deployed version of amazon server on render
    baseURL: "https://amazon-api-deploy-hwkb.onrender.com"
})

export {axiosInstance}