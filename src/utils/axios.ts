
import axios,{AxiosHeaders} from "axios";
import { getBaseUrl } from "./utils";

const baseURL : string = getBaseUrl();
const axiosServices = axios.create({
    baseURL,
    timeout: 20000, //20 segundos
});
axiosServices.interceptors.request.use(async(config)=>{
    const headers = new AxiosHeaders({
        'Cache-Control': 'no-cache',
        'Accept': 'application/json, text/plain, */*,', 
    });
    config.headers = headers;
    return config;
});
export default axiosServices;