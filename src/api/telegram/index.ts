import { ITelegramConfig } from "@/interfaces/telegram";
import axiosServices from "@/utils/axios";


export const getTelegram = async (): Promise<ITelegramConfig> => {
    const resp = await axiosServices.get('device/telegram');
    return resp.data;//todo esta alli adentro
  }


export const postTelegram = async (data: ITelegramConfig | null): Promise<{save: boolean}> => { 
  const resp = await axiosServices.post('device/telegram',data);
  return resp.data;
};
// modificar para control
