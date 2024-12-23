
import {useToast, TYPE} from 'vue-toastification';

const toast = useToast();

const useToastAlert = ()=> {
    // Success message
    const toastSuccessMsg = (msg: string) =>{
        toast(msg,{
            type: TYPE.SUCCESS,
        });
    }
    // Error message
    const toastErrorMsg = (msg: string) =>{
        toast(msg,{
            type: TYPE.ERROR,
        });
    }
    // warning message
    const toastWarningMsg = (msg: string) =>{
        toast(msg,{
            type: TYPE.WARNING,
        });
    }
    // info message
    const toastInfoMsg = (msg: string) =>{
        toast(msg,{
            type: TYPE.INFO,
        });
    }
    // defautl message
    const toastDefaultMsg = (msg: string) =>{
        toast(msg,{
            type: TYPE.DEFAULT,
        });
    }
    return {
        toastSuccessMsg,
        toastErrorMsg,
        toastWarningMsg,
        toastInfoMsg,
        toastDefaultMsg
    }
};

//const showSuccessToast = (message) => {}

export default useToastAlert;