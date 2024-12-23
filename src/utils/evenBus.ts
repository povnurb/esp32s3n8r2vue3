//buss de eventos
import { IEventCallback } from "@/interfaces/common";
import { ref } from "vue";
type EventCallback = (data: IEventCallback) => void;

const evenBus = {
    // alamcenar los eventos
    events : ref<{[key: string]:EventCallback[]}>({}),
    emit(event: string, data: IEventCallback): void{
        if(this.events.value[event]){
            this.events.value[event].forEach((callback) => callback(data));
        }
    },
    //metodo para escuchar los eventos
    on(event: string, callback: EventCallback): void{
        if(!this.events.value[event]){
            this.events.value[event] = [];
        }
        this.events.value[event].push(callback);
    },
    //metodo para desvincular los eventos
    off(event: string, callback: EventCallback): void{
        if(!this.events.value[event]){
            return;
        }
        this.events.value[event] = this.events.value[event].filter((cb) => cb!==callback);
    }

}
export default evenBus;