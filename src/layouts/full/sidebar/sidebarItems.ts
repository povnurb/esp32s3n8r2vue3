//aqui esta el objeto menu del sidebar
export interface IMenu {
    header?: string; //el ? es por que es opcional
    title?: string;
    //icon?: any;
    icon?: string;
    to?: string; //para redireccionar
    children?: IMenu[];
    disabled?: boolean;
}
//aqui se dice que se va a dibujar y como en el sidebar
const sidebarItems: IMenu[] = [
    { header: 'Resumen' },
    {
        title: 'Dashboard',
        icon: 'grid',
        to: '/dashboard'
    },
    
    { header: 'DISPOSITIVO' },
    {
        title: 'Mas Información',
        icon: 'info',
        to: '/esp-info'
    },
    {
        title: 'Estado',
        icon: 'card-checklist',
        to: '#',
        children: [
            {
                title: 'Alarmas', 
                icon: 'circle', 
                to: '/esp-alarm'
            },
            {
                title: 'Relevadores', 
                icon: 'circle', 
                to: '/esp-relays'
            }
        ]
    },
    { header: 'Configuración' },
    {
        title: 'Conexiones',
        icon: 'bar-chart',
        to: '#',
        children: [
            {
                title: 'WiFi', 
                icon: 'circle', 
                to: '/esp-wifi'
            },
            {
                title: 'MQTT', 
                icon: 'circle', 
                to: '/esp-mqtt'
            }
        ]
    },
    {
        title: 'Dispositivo',
        icon: 'sliders',
        to: '#',
        children: [
            {
                title: 'Historial de Alarmas', 
                icon: 'circle', 
                to: '/esp-historial'
            },
            {
                title: 'Etiquetado de Alarmas', 
                icon: 'circle', 
                to: '/esp-etiquetado'
            },
            {
                title: 'Restaurar a fábrica', 
                icon: 'circle', 
                to: '/esp-restore'
            },
            {
                title: 'Reiniciar', 
                icon: 'circle', 
                to: '/esp-restart'
            },
            {
                title: 'Configuraciones', 
                icon: 'circle', 
                to: '/esp-device'
            },
            {
                title: 'Telegram', 
                icon: 'circle', 
                to: '/esp-telegram'
            },
            {
                title: 'WhatsApp',  
                icon: 'circle', 
                to: '/esp-whatsapp'
            },
            {
                title: 'Bitácora', 
                icon: 'circle', 
                to: '/esp-bitacora'
            },
            {
                title: 'Ajuste de fecha y hora', 
                icon: 'circle', 
                to: '/esp-time'
            }
        ]
    },
    { header: 'Acciones' },
    {
        title: 'Perfil',
        icon: 'person',
        to: '/esp-admin'
    }
]
//para que no se queje y por que se va a exportar la funcion
export default sidebarItems;