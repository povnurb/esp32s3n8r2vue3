import axiosServices from "@/utils/axios";
import { IBitacora } from '@/interfaces/bitacora';

export const getBitacora = async (): Promise<IBitacora> => {
    const resp = await axiosServices.get('device/bitacora-historial');
    return resp.data;//todo esta alli adentro
  }

//traer el archivo de la bitácora

export const getDownloadBitacora = async ()=>{
  const resp = await axiosServices.get('device/bitacora-download',{responseType: 'blob'});
  return resp.data;
}

export const postBitacora = async (data: IBitacora | null): Promise<{save: boolean}> => { 
  const resp = await axiosServices.post('device/bitacora-historial',data);
  return resp.data;
};