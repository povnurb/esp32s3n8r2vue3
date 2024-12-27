import { IAlarmPostConfig } from "@/interfaces";
import { IAlarmasResponse } from "@/interfaces/alarmas";
import { IHistory } from '@/interfaces/infoDashboard';
import axiosServices from "@/utils/axios";
/*//TODO:
export const getAlarmasConfig1 = async (): Promise<IAlarmasResponse1> =>{
    const resp = await axiosServices.get(`device/relay1`);
    return resp.data;
    
}*/
//buscar Alarmas presentes IAlarmasResponse se importa

export const scanAlarmas = async (): Promise<IAlarmasResponse> => {
    const resp = await axiosServices.get('device/alarms');
    return resp.data;//todo esta alli adentro
  }

//buscar Alarmas presentes IAlarmasResponse se importa

export const postAlarmConfig = async (data: IAlarmPostConfig | null): Promise<{save: boolean}> => { 
  const resp = await axiosServices.post('device/alarms',data);
  return resp.data;
};

export const getHistorial = async (): Promise<IHistory> => {
  const resp = await axiosServices.get('device/alarmas-historial');
  return resp.data;//todo esta alli adentro
}