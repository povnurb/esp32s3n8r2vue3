
export interface IAlarmasConfig { //lo que se espera recibir de la API
			
			alarmas?: {
			numero?: number;
			name?: string;
			logic?: boolean;
			status?: boolean;
			reconocida?: boolean;
			on?: string;
			off?: string;
			count?: number;
		}[]
}
export interface IAlarmPostConfig { //lo que mandará en el post
			
	alarmas?: {
	
	name?: string;
	/*
	name1?: string;
	name2?: string;
	name3?: string;
	name4?: string;
	name5?: string;
	name6?: string;
	name7?: string;
	name8?: string;*/
}[]
}

export interface IAlarmasResponse{	
	
	cantidad: number;
	prueba_de_alarmas: boolean;
	alarmas?: {
		numero?: number;
		name?: string;
		logic?: boolean;
		status?: boolean;
		reconocida?: boolean;
		on?: string;
		off?: string;
		count?: number;
	}[];

  }