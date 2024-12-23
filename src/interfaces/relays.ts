
export interface IRelaysConfig1 { //lo que se espera recibir de la api
    STATUS1?: boolean; //ok
    R_NAME1?: string; //ok
    R_DESCRIPTION1?: string; //ok
    R_TIMERON1?: boolean; // ok
    R_TIMER1?: number;  //ok
    TEMPORIZADOR1?: boolean; //ok
    DOMINGO1A?: boolean;  //ok
    LUNES1A?: boolean;  //ok
    MARTES1A?: boolean; //ok
    MIERCOLES1A?: boolean; //ok
    JUEVES1A?: boolean; //ok
    VIERNES1A?: boolean; //ok
    SABADO1A?: boolean; //ok
    TIMEONRELAY1A?: string; //ok
    TIMEOFFRELAY1A?: string; //ok
    DOMINGO1B?: boolean; //ok
    LUNES1B?: boolean; //ok
    MARTES1B?: boolean; //ok
    MIERCOLES1B?: boolean; //ok
    JUEVES1B?: boolean; //ok
    VIERNES1B?: boolean; //ok
    SABADO1B?: boolean; //ok
    TIMEONRELAY1B?: string; //ok
    TIMEOFFRELAY1B?: string; //ok
    FECHAON1?:string ; //ok
    FECHAOFF1?:string ; //ok
    PROGRAMADO1?: boolean; //ok
}


export interface IRelaysConfig2 {
  STATUS2?: boolean; //ok
  R_NAME2?: string; //ok
  R_DESCRIPTION2?: string; //ok
  R_TIMERON2?: boolean; //ok
  R_TIMER2?: number; //ok
  TEMPORIZADOR2?: boolean; //ok
  DOMINGO2A?:boolean;  //ok
  LUNES2A?:boolean; //ok
  MARTES2A?:boolean; //ok
  MIERCOLES2A?:boolean; //ok
  JUEVES2A?:boolean; //ok
  VIERNES2A?:boolean; //ok
  SABADO2A?:boolean; //ok
  TIMEONRELAY2A?: string; //ok
  TIMEOFFRELAY2A?: string; //no esta
  DOMINGO2B?:boolean;  //ok
  LUNES2B?:boolean; //ok
  MARTES2B?:boolean; //ok
  MIERCOLES2B?:boolean; //ok
  JUEVES2B?:boolean; //ok
  VIERNES2B?:boolean; //ok
  SABADO2B?:boolean; //ok
  TIMEONRELAY2B?:string; //no esta
  TIMEOFFRELAY2B?:string; //no esta
  FECHAON2?:string;  //no esta
  FECHAOFF2?:string;  //no esta
  PROGRAMADO2?: boolean; //no esta
}

export interface IRelaysResponse1{
  rssiStatus: number;
  wifiQuality: number;
  wifiStatus: boolean;
  mqttStatus: boolean;
  RELAY1: IRelaysConfig1; //hace referencia al de arriba
  code: number;
}

export interface IRelaysResponse2{
  rssiStatus: number;
  wifiQuality: number;
  wifiStatus: boolean;
  mqttStatus: boolean;
  RELAY2: IRelaysConfig2; //hace referencia al de arriba
  code: number;
}