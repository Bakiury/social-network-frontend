<template>
    <section class="contact-box">
        <div class="myRegister">
            <div class="myBox text-center">
                <img
                    v-if="localImage"
                    :src="localImage"
                    alt="Foto del usuario"
                />
                <img v-else src="@/assets/user.png" alt="logo" />
            </div>

            <div>
                <div class="container align-self-center p-6">
                    <h1 class="font-weight-bold mb-3 text-center">
                        Crea tu cuenta
                    </h1>
                    <p class="text-muted mb-2 text-center">
                        Ingresa la siguiente información para registrarte.
                    </p>

                    <form @submit.prevent="onSubmit" autocomplete="off">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Nombre
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Ingrese su nombre"
                                        v-model="userForm.use_name"
                                    />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Apellido
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Ingrese su apellido"
                                        v-model="userForm.use_lastname"
                                    />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Email
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        placeholder="Ingrese su email"
                                        v-model="userForm.use_email"
                                    />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Contraseña
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="Ingrese su contraseña"
                                        v-model="userForm.use_password"
                                    />
                                </div>
                            </div>

                            <div class="col">
                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Foto Perfil
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        @change="onSelectedImage"
                                        ref="imageSelector"
                                        v-show="false"
                                        accept="image/png, image/jpeg, image/jpg"
                                    />
                                    <br />
                                    <button
                                        class="btn btn-primary w-100"
                                        type="button"
                                        @click="onSelectImage"
                                    >
                                        Subir foto &nbsp;<i
                                            class="fa fa-upload"
                                        ></i>
                                    </button>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Fecha de nacimiento
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        class="form-control"
                                        placeholder="Ingrese su fecha de nacimiento"
                                        v-model="userForm.use_birthday"
                                    />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Descripción
                                    </label>
                                    <textarea
                                        cols="30"
                                        rows="4"
                                        class="form-control mt-2"
                                        placeholder="Ingrese su descripción"
                                        v-model="userForm.use_description"
                                    ></textarea>
                                </div>
                            </div>

                            <br />

                            <div class="form-group mb-5">
                                <div
                                    class="form-check d-flex justify-content-center"
                                >
                                    <input
                                        class="form-check-input mx-2"
                                        type="checkbox"
                                    />
                                    <label class="form-check-label text-muted">
                                        Al seleccionar esta casilla aceptas
                                        nuestro aviso de privacidad y los
                                        términos y condiciones
                                    </label>
                                </div>
                            </div>

                            <div class="d-flex">
                                <button class="btn btn-secondary">
                                    <router-link
                                        :to="{ name: 'login' }"
                                        class="nav-link text-white"
                                        >Volver</router-link
                                    >
                                </button>
                                <button class="btn btn-success" type="submit">
                                    Regístrate
                                </button>
                            </div>
                        </div>
                    </form>

                    <small class="d-inline-block text-muted mt-5"
                        >Todos los derechos reservados | © 2022 Bakiury</small
                    >
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import useAuth from '../composables/useAuth'
import uploadImage from '../helpers/uploadImage'

export default defineComponent({
    name: 'Register',
    setup() {
        const router = useRouter()
        const { createUser } = useAuth()
        const localImage = ref()
        const file = ref()
        const imageSelector = ref()

        const onSelectedImage = (event: any) => {
            file.value = event.target.files[0]
            if (!file.value) {
                localImage.value = null
                file.value = null
                return
            }

            const fr = new FileReader()
            fr.onload = () => (localImage.value = fr.result)
            fr.readAsDataURL(file.value)
        }

        const onSelectImage = () => {
            imageSelector.value.click()
        }

        const userForm = ref({
            use_name: '',
            use_lastname: '',
            use_email: '',
            use_password: '',
            use_image: '',
            use_birthday: '',
            use_description: '',
        })

        return {
            userForm,
            localImage,
            file,
            imageSelector,
            onSelectedImage,
            onSelectImage,

            onSubmit: async () => {
                userForm.value.use_image = await uploadImage(file.value) // To upload the image in cloudinary
                if (!userForm.value.use_image) userForm.value.use_image = '...'

                const { ok, message } = await createUser(userForm.value)
                if (message) console.log(message.response.data)

                if (!ok) Swal.fire('Oops', 'Faltan datos', 'error')
                else router.push({ name: 'feed' })
            },
        }
    },
})
</script>
<style scoped>
.contact-box {
    position: absolute;
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    width: 100%;
}
.myRegister {
    padding: 50px;
    background-color: rgba(255, 234, 167, 0.8) !important;
}
.text-muted {
    color: #555555 !important;
}
.myBox {
    width: 200px;
    height: 200px;
    margin: 0 auto;
}
.myBox img {
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 2px 3px #ffffff;
    border-radius: 50%;
}
button {
    margin: 0 auto;
    width: 400px;
}
small {
    position: relative;
    transform: translate(-50%);
    left: 50%;
}
.font-weight-bold {
    font-weight: bold;
}
</style>
