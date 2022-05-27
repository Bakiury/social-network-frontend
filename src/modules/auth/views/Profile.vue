<template>
    <section class="contact-box">
        <section class="posts">
            <div class="myNav">
                <div>
                    <router-link
                        to="/feed"
                        title="Volver a la página de inicio"
                    >
                        <i class="fa-solid fa-circle-left"></i>
                    </router-link>
                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal0"
                        type="button"
                        class="btn btn-dark"
                        title="Editar mi información personal"
                    >
                        <i class="fa-solid fa-pen"></i> Editar Perfil
                    </button>
                </div>
                <h2>
                    <u>Mis publicaciones</u>
                </h2>
            </div>
            <div class="myPosts">
                <template v-for="post in postsByUser" :key="post.pos_id">
                    <UserPosts
                        :userDataPosts="post"
                        :userInfo="getCurrentUser"
                        @runPosts="loadPosts"
                    />
                </template>
            </div>
        </section>

        <!-- Modal Edit Profile -->
        <div
            class="modal fade"
            id="exampleModal0"
            tabindex="-1"
            aria-labelledby="exampleModal0Label"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-xl">
                <div class="modal-content my-modal-content">
                    <div class="modal-body p-0 my-modal-body">
                        <div class="myRegister">
                            <div class="myBox text-center">
                                <img
                                    v-if="localImage"
                                    :src="localImage"
                                    alt="Foto del usuario"
                                />
                                <img
                                    v-else
                                    src="@/assets/user.png"
                                    alt="Foto del usuario"
                                />
                            </div>

                            <div class="container">
                                <div class="align-self-center p-6">
                                    <h1
                                        class="font-weight-bold mb-3 text-center"
                                    >
                                        Editar perfil
                                    </h1>
                                    <p class="text-muted mb-2 text-center">
                                        Modifica los datos que sean necesarios.
                                    </p>

                                    <form @submit.prevent="onSubmit">
                                        <div class="myRow row">
                                            <div class="col-6">
                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Nombre
                                                        <span
                                                            class="text-danger"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Ingrese su nombre"
                                                        v-model="
                                                            getCurrentUser.use_name
                                                        "
                                                    />
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Apellido
                                                        <span
                                                            class="text-danger"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Ingrese su apellido"
                                                        v-model="
                                                            getCurrentUser.use_lastname
                                                        "
                                                    />
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Email
                                                        <span
                                                            class="text-danger"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <input
                                                        type="email"
                                                        class="form-control"
                                                        placeholder="Ingrese su email"
                                                        v-model="
                                                            getCurrentUser.use_email
                                                        "
                                                    />
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Cambio de contraseña
                                                    </label>
                                                    <button
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        class="btn btn-primary w-100"
                                                        title="Cambiar tu contraseña"
                                                        type="button"
                                                    >
                                                        <i
                                                            class="fa-solid fa-key"
                                                        ></i>
                                                        &nbsp;Cambiar contraseña
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="col">
                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Foto Perfil
                                                    </label>
                                                    <input
                                                        type="file"
                                                        @change="
                                                            onSelectedImage
                                                        "
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
                                                        <i
                                                            class="fa fa-upload"
                                                        ></i>
                                                        &nbsp;Subir foto
                                                    </button>
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Fecha de nacimiento
                                                        <span
                                                            class="text-danger"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <input
                                                        type="date"
                                                        class="form-control"
                                                        placeholder="Ingrese su fecha de nacimiento"
                                                        v-model="
                                                            getCurrentUser.use_birthday
                                                        "
                                                    />
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Descripción
                                                        <span
                                                            class="text-danger"
                                                            >*</span
                                                        >
                                                    </label>
                                                    <textarea
                                                        cols="30"
                                                        rows="4"
                                                        class="form-control mt-2"
                                                        placeholder="Ingrese su descripción"
                                                        v-model="
                                                            getCurrentUser.use_description
                                                        "
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div class="d-flex mt-4">
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary"
                                                >
                                                    <a
                                                        type="button"
                                                        data-bs-dismiss="modal"
                                                        ref="modalCloseBtn"
                                                        class="nav-link text-white"
                                                    >
                                                        <i
                                                            class="fa-solid fa-circle-xmark"
                                                        ></i>
                                                        &nbsp;Cerrar
                                                    </a>
                                                </button>
                                                <div class="mx-3"></div>
                                                <button
                                                    class="btn btn-success"
                                                    type="submit"
                                                >
                                                    <i
                                                        class="fa-solid fa-floppy-disk"
                                                    ></i>
                                                    &nbsp;Guardar
                                                </button>
                                            </div>
                                            <small class="copy-right">
                                                Todos los derechos reservados |
                                                © 2022 Bakiury
                                            </small>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Edit Profile -->

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
                            data-bs-target="#exampleModal0"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                            ref="modalCloseBtn"
                        >
                            <i class="fa-solid fa-rotate-left"></i>
                            &nbsp;Volver
                        </a>
                        <a class="btn btn-success" @click="changePassword">
                            <i class="fa-solid fa-circle-check"></i>
                            &nbsp;Cambiar
                        </a>
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
import UserPosts from '@/components/UserPosts.vue'

export default defineComponent({
    name: 'Profile',
    components: {
        UserPosts,
    },
    setup() {
        const { authUser, getCurrentUser, updateUser, getPostsByUserId } =
            useAuth()
        const localImage = ref()
        const file = ref()
        const imageSelector = ref()
        const myPass = ref()
        const postsByUser = ref()
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

        const loadPosts = async () => {
            const { data } = await getPostsByUserId(getCurrentUser.value.use_id)
            postsByUser.value = data.post
        }

        onMounted(async () => {
            await authUser() // Fill state with the user info

            localImage.value = getCurrentUser.value.use_image

            const { data } = await getPostsByUserId(getCurrentUser.value.use_id)
            postsByUser.value = data.post

            // console.log(postsByUser.value)
        })

        return {
            getCurrentUser,
            localImage,
            file,
            imageSelector,
            onSelectedImage,
            onSelectImage,
            myPass,
            postsByUser,
            modalCloseBtn, // Close modal when updated
            loadPosts,

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
    display: flex;
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100%;
    color: #333333;
}
.my-modal-content,
.my-modal-body {
    border-radius: 15px;
}
.myRegister {
    border-radius: 15px;
    border: 10px solid #333333;
    padding: 50px;
    min-height: 100vh;
    width: 100%;
    color: #333333;
    background: rgba(255, 234, 167, 1);
}
.myRegister .myRow {
    color: #ffffff;
    padding: 10px;
    border-radius: 10px;
    background-color: #333333;
}
.btn-dark {
    background-color: #333333;
}
.btn-dark:hover {
    background-color: #000000;
    transition: all ease 0.3s;
}
.myNav {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 234, 167, 1);
    position: fixed;
    box-shadow: 0px 1px 5px 0px #ffffff;
    z-index: 1;
}
.myNav h2 {
    margin-top: 7px;
}
.myNav div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    top: 7px;
    left: 25px;
}
.myNav i {
    font-size: 40px;
    margin-top: 4px;
    margin-right: 30px;
    color: #333333;
}
.myNav button {
    width: 140px;
}
.myNav button i {
    font-size: 15px;
    margin-top: 0px;
    margin-right: 5px;
    color: #ffffff;
}
.posts {
    background-color: rgba(0, 0, 0, 0.6) !important;
    width: 100%;
}
.myPosts {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 140px;
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
