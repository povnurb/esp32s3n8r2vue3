import { IWhatsappConfig } from "@/interfaces/whatsapp";
import axiosServices from "@/utils/axios";


export const getWhatsapp = async (): Promise<IWhatsappConfig> => {
    const resp = await axiosServices.get('device/whatsapp');
    return resp.data;//todo esta alli adentro
  }


export const postWhatsapp = async (data: IWhatsappConfig | null): Promise<{save: boolean}> => { 
  const resp = await axiosServices.post('device/whatsapp',data);
  return resp.data;
};
// modificar para control
