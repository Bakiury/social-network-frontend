<template>
    <section class="contact-box">
        <div class="myRegister">
            <div class="myBox text-center">
                <img
                    v-if="localImage"
                    :src="localImage"
                    alt="Foto del usuario"
                />
                <img v-else src="@/assets/user.png" alt="Foto del usuario" />
            </div>

            <div>
                <div class="container align-self-center p-6">
                    <h1 class="font-weight-bold mb-3 text-center">
                        Editar perfil
                    </h1>
                    <p class="text-muted mb-2 text-center">
                        Modifica los datos que sean necesarios.
                    </p>

                    <form @submit.prevent="onSubmit">
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
                                        v-model="getCurrentUser.use_name"
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
                                        v-model="getCurrentUser.use_lastname"
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
                                        v-model="getCurrentUser.use_email"
                                    />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Cambio de contraseña
                                    </label>
                                    <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        class="btn btn-primary w-100"
                                        title="Cambiar tu contraseña"
                                        type="button"
                                    >
                                        Cambiar contraseña&nbsp;
                                        <i class="fa-solid fa-key"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="col">
                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Foto Perfil
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
                                        type="date"
                                        class="form-control"
                                        placeholder="Ingrese su fecha de nacimiento"
                                        v-model="getCurrentUser.use_birthday"
                                    />
                                </div>

                                <div class="form-group mb-3">
                                    <label class="font-weight-bold">
                                        Descripción
                                        <span class="text-danger">*</span>
                                    </label>
                                    <textarea
                                        cols="30"
                                        rows="4"
                                        class="form-control mt-2"
                                        placeholder="Ingrese su descripción"
                                        v-model="getCurrentUser.use_description"
                                    ></textarea>
                                </div>
                            </div>

                            <div class="d-flex mt-4">
                                <button type="button" class="btn btn-dark">
                                    <router-link
                                        to="/feed"
                                        class="nav-link text-white"
                                    >
                                        Volver&nbsp;
                                        <i class="fa-solid fa-circle-left"></i>
                                    </router-link>
                                </button>
                                <button class="btn btn-success" type="submit">
                                    Guardar&nbsp;
                                    <i class="fa-solid fa-floppy-disk"></i>
                                </button>
                            </div>
                            <small class="copy-right text-muted">
                                Todos los derechos reservados | © 2022 Bakiury
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Modal Change Password -->
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header w-100">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <b>Cambio de contraseña</b>
                        </h5>
                        <a
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></a>
                    </div>
                    <div class="modal-body">
                        <div class="w-100">
                            <div class="d-flex">
                                <b class="text-center"
                                    >Nueva Contraseña&nbsp;</b
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Ingrese la nueva contraseña"
                                    v-model="myPass"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-end">
                        <a
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            ref="modalCloseBtn"
                        >
                            Cerrar
                        </a>
                        &nbsp;
                        <a class="btn btn-success" @click="changePassword"
                            >Cambiar</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Change Password -->
    </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import useAuth from '../composables/useAuth'
import uploadImage from '@/helpers/uploadImage'

export default defineComponent({
    name: 'Profile',
    setup() {
        const { authUser, getCurrentUser, updateUser } = useAuth()
        const localImage = ref()
        const file = ref()
        const imageSelector = ref()
        const myPass = ref()
        const modalCloseBtn = ref() // Close modal when updated

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

        onMounted(async () => {
            await authUser() // Fill state with the user info

            localImage.value = getCurrentUser.value.use_image
        })

        return {
            getCurrentUser,
            localImage,
            file,
            imageSelector,
            onSelectedImage,
            onSelectImage,
            myPass,
            modalCloseBtn, // Close modal when updated

            onSubmit: async () => {
                if (file.value) {
                    getCurrentUser.value.use_image = await uploadImage(
                        file.value
                    ) // To upload the image in cloudinary
                }

                const { ok, message } = await updateUser(getCurrentUser.value)
                if (message) console.log(message.response.data)

                if (!ok) {
                    Swal.fire('Oops', 'Faltan datos', 'error')
                } else {
                    Swal.fire(
                        '¡Hecho!',
                        'Usuario actualizado exitósamente',
                        'success'
                    )
                }
            },

            changePassword: async () => {
                if (!myPass.value) return

                const { ok, message } = await updateUser({
                    use_id: getCurrentUser.value.use_id,
                    use_password: myPass.value,
                })
                if (message) console.log(message.response.data)

                if (ok) {
                    Swal.fire(
                        '¡Hecho!',
                        'La contraseña se ha cambiado',
                        'success'
                    )
                    modalCloseBtn.value.click() // Close modal when updated
                    myPass.value = ''
                }
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
    min-height: 100vh;
    color: #333333;
}
.myRegister {
    padding: 50px;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.5) !important;
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
.changePass:hover {
    color: #ffffff;
    background: #444444;
}
.modal-content {
    width: 99%;
}
.modal-header,
.modal-footer {
    background: rgba(255, 234, 167, 1) !important;
}
.modal-body {
    background: #444444 !important;
    color: #ffffff;
}
.btn-dark {
    background-color: #333333;
}
.btn-dark:hover {
    background-color: #000000;
    transition: all ease 0.3s;
}
textarea {
    resize: none;
}
.copy-right {
    position: relative;
    transform: translate(-50%);
    margin-top: 50px;
    text-align: center;
    left: 50%;
    font-size: 15px;
}
</style>
