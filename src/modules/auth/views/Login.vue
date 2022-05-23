<template>
    <div class="all">
        <div class="main-section">
            <div class="modal-content">
                <div class="user-img">
                    <img src="@/assets/user.png" />
                </div>
                <form @submit.prevent="onSubmit" autocomplete="off">
                    <div class="form-group" id="user-group">
                        <div>
                            <i class="fas fa-user"></i>
                        </div>
                        <input
                            id="myUser"
                            type="text"
                            class="form-control"
                            placeholder="Email"
                            name="username"
                            v-model="userForm.use_email"
                        />
                    </div>
                    <div class="form-group">
                        <div>
                            <i class="fas fa-lock"></i>
                        </div>
                        <input
                            id="myPass"
                            type="password"
                            class="form-control"
                            placeholder="Contraseña"
                            name="password"
                            v-model="userForm.use_password"
                        />
                    </div>
                    <button type="submit" class="btn">
                        <i class="fas fa-sign-in-alt"></i> Ingresar
                    </button>
                </form>
                <div class="col-12 forgot">
                    <router-link
                        :to="{ name: 'register' }"
                        class="nav-link active"
                        >No tienes una cuenta registrate aqui</router-link
                    >
                </div>
            </div>
            <small class="copy-right">
                Todos los derechos reservados | © 2022 Bakiury
            </small>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import useAuth from '../composables/useAuth'

export default defineComponent({
    name: 'Login',
    setup() {
        const router = useRouter()
        const { loginUser } = useAuth()

        const userForm = ref({
            use_email: '',
            use_password: '',
        })

        return {
            userForm,

            onSubmit: async () => {
                const { ok, message } = await loginUser(userForm.value)
                if (message) console.log(message.response.data)

                if (!ok) Swal.fire('Oops', 'Credenciales incorrectas', 'error')
                else router.push({ name: 'feed' })
            },
        }
    },
})
</script>

<style scoped>
.all {
    position: absolute;
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
.main-section {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    text-align: center;
}
.modal-content {
    background-color: rgba(255, 234, 167, 0.8);
    padding: 0 56px;
    width: 385px;
    box-shadow: 0px 0px 2px 3px #ffffff;
    border-radius: 20px;
    margin-bottom: 20px;
}
.user-img {
    margin-top: -50px;
    margin-bottom: 35px;
}
.user-img img {
    width: 100px;
    height: 100px;
    box-shadow: 0px 0px 2px 3px #ffffff;
    border-radius: 50%;
}
.form-group input {
    height: 42px;
    font-size: 18px;
    border: 0;
    padding: 25px;
    padding-left: 60px;
    border-radius: 5px;
    color: #34495e;
    font-weight: bold;
    margin-bottom: 25px;
    background-color: #ffffff;
}
.form-group div {
    background: #333333;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    color: #ffffff;
}
button {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #333333;
    color: #ffffff;
}
button:hover {
    color: #ffffff;
    background: #444444;
}
.forgot {
    padding: 5px 0;
}
.forgot a {
    font-size: 14px;
    font-style: italic;
    font-weight: bold;
    color: #333333;
}
.forgot a:hover {
    color: #444444;
}
.copy-right {
    color: #cccccc;
}
</style>
