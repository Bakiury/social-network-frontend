<template>
    <div id="nav">
        <div class="sectionLogo">
            <div v-if="userImage !== '...'" class="myLogo">
                <img :src="userImage" alt="Foto del usuario" />
            </div>
            <div v-else class="myLogo">
                <img src="@/assets/user.png" alt="Foto del usuario" />
            </div>
            <h1>Red Social</h1>
        </div>
        <div class="navBox">
            <router-link to="/feed" title="Ir a inicio"
                ><i class="fas fa-home"></i>&nbsp;&nbsp;Inicio</router-link
            >
            <router-link to="/profile" title="Ir a mi perfil"
                ><i class="fas fa-user"></i>&nbsp;&nbsp;Perfil</router-link
            >
            <a
                id="signOut"
                class="mx-2"
                title="Cerrar Sesión"
                @click="logOutUser"
                ><i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Cerrar Sesión</a
            >
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '@/modules/auth/composables/useAuth'
import Swal from 'sweetalert2'

export default defineComponent({
    name: 'Navbar',
    props: {
        userImage: {
            type: String,
            required: true,
        },
    },
    setup() {
        const { logOut } = useAuth()
        const router = useRouter()

        return {
            logOutUser: () => {
                Swal.fire({
                    title: '¿Realmente quieres cerrar sesión?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí',
                    cancelButtonText: 'No',
                }).then((result) => {
                    if (result.isConfirmed) {
                        logOut()
                        router.push({ name: 'login' })
                    }
                })
            },
        }
    },
})
</script>

<style scoped>
#nav {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: rgba(255, 234, 167, 1);
    position: sticky;
    top: 0;
    box-shadow: 0px 1px 5px 0px #ffffff;
    z-index: 1;
}
.sectionLogo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: default;
}
.sectionLogo:hover,
#nav a:active {
    transform: scale(0.98);
    transition: all 0.3s ease;
}
.sectionLogo h1 {
    font-size: 28px;
    margin-left: 5px;
    position: relative;
    top: 5px;
    text-shadow: 1px 1px 3px #333333;
}
.myLogo {
    width: 54px;
}
.myLogo img {
    width: 100%;
    border-radius: 50%;
    box-shadow: 0px 0px 3px #333333;
}
.navBox {
    display: flex;
    justify-content: space-around;
    width: 400px;
    font-size: 18px;
    margin-right: 50px;
}
#nav a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #333333;
    border-radius: 10px;
    padding: 5px 15px;
    text-shadow: 1px 1px 1px #333333;
}
#nav i {
    text-shadow: 1px 1px 1px #333333;
}
#nav a:hover {
    background: #333333;
    color: rgba(255, 234, 167, 1);
    transition: all 0.3s ease;
}
#signOut {
    background: #c06060 !important;
    color: rgba(255, 234, 167, 1) !important;
    cursor: pointer;
}
#signOut:hover {
    background: #be4040 !important;
    transition: all 0.3s ease;
}
</style>
