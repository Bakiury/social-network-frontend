<template>
    <Navbar :userImage="getCurrentUser.use_image" />
    <section id="myFeed">
        <h2>
            <span>
                <u>Bienvenid@</u>
                <p>
                    {{ getCurrentUser.use_name }}
                    {{ getCurrentUser.use_lastname }}
                </p>
            </span>
        </h2>

        <!-- <Searcher @forChild="postsFiltered" /> -->

        <div class="addPostBox">
            <i
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                class="fas fa-plus-circle"
                title="Nueva publicación"
            ></i>
        </div>

        <section class="myContent">
            <div v-for="post in getAllPost" :key="post.pos_id">
                <Post :postData="post" />
            </div>
        </section>

        <!-- Modal Create -->
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <b>Agregar una publicación</b>
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center">
                        <div class="w-75">
                            <div
                                class="d-flex justify-content-center align-items-center mb-3"
                            >
                                <b style="margin-left: 43px"
                                    >Título:&nbsp;&nbsp;</b
                                >
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Ingrese un título"
                                    v-model="postForm.pos_title"
                                />
                            </div>
                            <div
                                class="d-flex justify-content-center align-items-center"
                                :class="[localImage ? 'imgBox' : '']"
                            >
                                <b style="margin-left: 32px"
                                    >Imagen:&nbsp;&nbsp;</b
                                >
                                <input
                                    type="file"
                                    @change="onSelectedImage"
                                    ref="imageSelector"
                                    v-show="false"
                                    accept="image/png, image/jpeg, image/jpg"
                                />
                                <button
                                    class="btn btn-primary w-100"
                                    type="button"
                                    @click="onSelectImage"
                                >
                                    Subir foto &nbsp;<i
                                        class="fa fa-upload"
                                    ></i>
                                </button>
                                <img
                                    v-if="localImage"
                                    :src="localImage"
                                    alt="Foto del usuario"
                                />
                            </div>
                            <br />
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <b>Descripción:&nbsp;&nbsp;</b>
                                <textarea
                                    rows="4"
                                    class="form-control"
                                    placeholder="Ingrese una descripción"
                                    v-model="postForm.pos_description"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            ref="modalCloseBtn"
                        >
                            Cerrar
                        </button>
                        <button class="btn btn-success" @click="createPostBtn">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Create -->
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Swal from 'sweetalert2'
import useAuth from '@/modules/auth/composables/useAuth'
import usePost from '@/modules/post/composables/usePost'
import Navbar from '@/components/Navbar.vue'
import Post from '@/components/Post.vue'
import uploadImage from '@/helpers/uploadImage'

export default defineComponent({
    name: 'Feed',
    components: {
        Navbar,
        Post,
    },
    setup() {
        const localImage = ref()
        const file = ref()
        const imageSelector = ref()
        const modalCloseBtn = ref() // Close modal when created

        const { authUser, getCurrentUser } = useAuth()
        const { allPost, getAllPost, createPost } = usePost()

        authUser() // Fill state with the user info
        allPost() // (list posts) Fill state with the posts info

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

        const postForm = ref({
            pos_title: '',
            pos_image: '',
            pos_description: '',
            pos_use_id: '',
        })

        return {
            getCurrentUser,
            postForm,
            modalCloseBtn, // Close modal when created
            localImage,
            imageSelector,
            onSelectedImage,
            onSelectImage,

            getAllPost,

            createPostBtn: async () => {
                postForm.value.pos_image = await uploadImage(file.value) // To upload the image in cloudinary
                if (!postForm.value.pos_image) postForm.value.pos_image = '...'

                postForm.value.pos_use_id = getCurrentUser.value.use_id
                const { ok, message } = await createPost(postForm.value)
                if (message) console.log(message.response.data)

                if (ok) {
                    Swal.fire(
                        '¡Hecho!',
                        'Publicación creada exitosamente',
                        'success'
                    )
                    modalCloseBtn.value.click() // Close modal when created
                    allPost() // Fill state with the posts info
                } else {
                    Swal.fire('Oops', 'Faltan datos', 'error')
                }
            },
        }
    },
})
</script>

<style scoped>
#myFeed {
    overflow: auto;
    min-height: 100vh;
}
#myFeed p {
    margin-top: 10px;
}
#myFeed h2 {
    color: #ffffff;
    position: fixed;
    display: flex;
    text-align: center;
    align-items: center;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 30px;
    border-radius: 15px;
    padding-top: 15px;
    border: 2px dotted #ffffff;
    box-shadow: 0px 0px 5px 0px #ffffff;
}
.myContent {
    display: flex;
    margin: 0 auto;
    padding-top: 20px;
    justify-content: center;
    flex-direction: column;
    width: 600px;
    margin-top: 12px;
}
.addPostBox {
    display: flex;
    justify-content: center;
}
.fa-plus-circle {
    color: #333333;
    font-size: 50px;
    position: fixed;
    cursor: pointer;
    top: 10px;
    background-color: rgba(255, 234, 167, 1);
    border-radius: 50%;
    border: 2px solid #333333;
    z-index: 2;
}
.fa-plus-circle:hover {
    background-color: #333333;
    color: rgba(255, 234, 167, 1);
    border: 2px solid #333333;
    transition: all 0.5s ease;
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
img {
    width: 200px;
    height: 150px;
    box-shadow: 0px 0px 2px 3px #ffffff;
    position: absolute;
    top: 130px;
    left: 195px;
}
.imgBox {
    margin-bottom: 170px;
}
</style>
