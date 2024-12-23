<script lang="ts" setup>

interface IProfileDetails {
    label: string;
    value: string;
}

const profileDetails: IProfileDetails[] = [
    { label: 'Nombre:', value: 'Administrador del sistema' },
    { label: 'Usuario:', value: 'admin' },
    { label: 'Rol:', value:'super-user' },
    { label: 'Acceso:', value:'Modo de servicio (Accesso total)' },
]

</script>

<template>
    <div class="col-xl-6" id="inputsDetalles">
        <div class="card">
            <div class="card-header">Detalles del perfil</div>
            <div class="card-body profile-overview d-flex flex-column">
                <div class="row mt-4 mb-2" v-for="(detail, index) in profileDetails" :key="index">
                    <div class="col-lg-3 col-md-4 label">{{ detail.label }}</div>
                    <div class="col-lg-9 col-md-8">{{ detail.value }}</div>
                </div>                
            </div>
        </div>
    </div>
</template>