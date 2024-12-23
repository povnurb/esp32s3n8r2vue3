import axiosServices from "@/utils/axios";
import {ITimeConfig} from "@/interfaces";
// traernos la información del tiempo
export const gettime = async (): Promise<ITimeConfig> =>{
    const resp = await axiosServices.get(`device/status`);
    return resp.data;
    
}

export const posttime = async (data: ITimeConfig | null): Promise<{save: boolean}> => { 
    const resp = await axiosServices.post('device/status',data);
    return resp.data;
};