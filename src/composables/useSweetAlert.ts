
import Swal,{SweetAlertIcon, SweetAlertResult} from 'sweetalert2';

interface ISwalConfirm{
    title: string;
    text: string;
    icon: SweetAlertIcon;
}

const useSweetAlert = ()=>{
    const swalConfirmation = async(data: ISwalConfirm): Promise<boolean> => {
        return new Promise((resolve) => {
            Swal.fire({
                title: data.title,
                text: data.text,
                icon: data.icon,
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#0074B1',
                cancelButtonColor: '#FA896B',
                //reverseButtons: true,
            })

            .then((result: SweetAlertResult<boolean>) =>{
                resolve(result.isConfirmed);
            });
        });
    }
    return {
        swalConfirmation
    }
}

export default useSweetAlert;