import { defineStore } from 'pinia';
//TODO: por que aparece asi el defineStore
export const useSaveStore = defineStore('save',{
    //
    state: () => ({
        isSaved: false,
    }),
    persist: true,
    actions: {
        saveSuccess(isSaved: boolean) {
            this.isSaved = isSaved;
        },
        saveError() {
            this.isSaved = false;
        },
        resetSave() {
            this.isSaved = false;
        },
        getSaveStore() {
            return this.isSaved;
        }
    }
});

export const useSaveStoreAlarma = defineStore('alarmaPresente',{
    //
    state: () => ({
        isSavedAlarm: false,//estado inicial
    }),
    persist: true, //para que cuando se recargue la pagina siga en el local storage
    actions: {
        alarmaSuccess(isSavedAlarm: boolean) {
            this.isSavedAlarm = isSavedAlarm;
        },
        alarmaError() {
            this.isSavedAlarm = false;
        },
        resetAlarma() {
            this.isSavedAlarm = false;
        },
        getAlarmaStore() {
            return this.isSavedAlarm;
        }
    }
});