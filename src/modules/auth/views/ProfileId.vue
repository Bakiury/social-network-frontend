<template>
    <div class="mySection">
        <div v-if="infoUserByPost" class="myNav">
            <div>
                <router-link
                    :to="{ name: 'feed' }"
                    title="Volver a la página de inicio"
                >
                    <i class="fa-solid fa-circle-left"></i>
                </router-link>
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal0"
                    type="button"
                    class="btn btn-dark"
                    title="Ver información personal del usuario"
                >
                    <i class="fa-solid fa-pen"></i> Ver perfil de
                    {{ infoUserByPost.use_name }}
                </button>
            </div>
            <h2>
                <u>Publicaciones de {{ infoUserByPost.use_name }}</u>
            </h2>
        </div>

        <br /><br /><br /><br /><br />

        <div
            v-for="post in infoPostByUser"
            :key="post.pos_id"
            class="card mx-auto"
        >
            <div class="cardHeader">
                <img
                    v-if="infoUserByPost.use_image !== '...'"
                    :src="infoUserByPost.use_image"
                    alt="Imagen del usuario"
                />
                <img v-else src="@/assets/user.png" alt="Imagen del usuario" />
                <h3>
                    {{ infoUserByPost.use_name }}
                    {{ infoUserByPost.use_lastname }}
                </h3>
                <span v-if="post.updatedAt" class="postDate">
                    {{ getDayMonthYear(post.updatedAt).day }}
                    de
                    {{ getDayMonthYear(post.updatedAt).month }}
                    a las
                    {{ getDayMonthYear(post.updatedAt).time }}
                </span>
                <!-- <span class="myMsgVisit"></span> -->
            </div>
            <img
                v-if="post.pos_image !== '...'"
                :src="post.pos_image"
                class="card-img-top"
                alt="Imagen del post"
            />
            <img
                v-else
                src="@/assets/background.jpg"
                class="card-img-top"
                alt="Imagen del post"
            />
            <div class="card-body">
                <div
                    v-if="post.pos_title && post.pos_description"
                    class="descriptrion-box"
                >
                    <h5 class="card-title">
                        <u>{{ post.pos_title }}</u>
                    </h5>
                    <p class="post-description">
                        {{ post.pos_description }}
                    </p>
                </div>
                <hr />
                <div class="d-flex justify-content-start">
                    <textarea
                        rows="1"
                        class="form-control w-75"
                        placeholder="Ingrese un comentario"
                        v-model="commentForm.com_description"
                    ></textarea>
                    &nbsp;
                    <a
                        class="btn btn-dark w-25 align-self-start"
                        @click="createCommentBtn(post.pos_id)"
                    >
                        <i class="fa-solid fa-comments"></i>
                        &nbsp;Comentar
                    </a>
                </div>
                <hr />
                <div v-if="post.Comment.length > 0" class="comments">
                    <h5>
                        {{ post.Comment.length }}
                        {{
                            post.Comment.length === 1
                                ? 'Comentario'
                                : 'Comentarios'
                        }}
                    </h5>
                    <div
                        v-for="(com, index) in post.Comment"
                        :key="index"
                        class="comment"
                    >
                        <div class="head-comment">
                            <img
                                v-if="
                                    post.Comment[index].user.use_image !== '...'
                                "
                                :src="post.Comment[index].user.use_image"
                                alt="Imagen del usuario"
                            />
                            <img
                                v-else
                                src="@/assets/user.png"
                                alt="Imagen del usuario"
                            />
                            <h6>
                                {{ post.Comment[index].user.use_name }}
                                {{ post.Comment[index].user.use_lastname }}
                            </h6>
                        </div>
                        <p class="mt-1">
                            {{ post.Comment[index].com_description }}
                        </p>
                        <span class="commentDate">
                            {{
                                getDayMonthYear(post.Comment[index].updatedAt)
                                    .day
                            }}
                            de
                            {{
                                getDayMonthYear(post.Comment[index].updatedAt)
                                    .month
                            }}
                            a las
                            {{
                                getDayMonthYear(post.Comment[index].updatedAt)
                                    .time
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal View Profile -->
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
                        <div v-if="infoUserByPost" class="myRegister">
                            <div class="myBox text-center">
                                <img
                                    v-if="infoUserByPost.use_image !== '...'"
                                    :src="infoUserByPost.use_image"
                                    alt="Imagen del usuario"
                                />
                                <img
                                    v-else
                                    src="@/assets/user.png"
                                    alt="Imagen del usuario"
                                />
                            </div>

                            <div class="container">
                                <div class="align-self-center p-6">
                                    <h1
                                        class="font-weight-bold mb-3 text-center"
                                    >
                                        Viendo perfil
                                    </h1>
                                    <p class="text-muted mb-2 text-center">
                                        Información personal del usuario
                                    </p>

                                    <form>
                                        <div class="myRow row">
                                            <div class="col-6">
                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Nombre
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Ingrese su nombre"
                                                        readonly
                                                        v-model="
                                                            infoUserByPost.use_name
                                                        "
                                                    />
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Apellido
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Ingrese su apellido"
                                                        readonly
                                                        v-model="
                                                            infoUserByPost.use_lastname
                                                        "
                                                    />
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        class="form-control"
                                                        placeholder="Ingrese su email"
                                                        readonly
                                                        v-model="
                                                            infoUserByPost.use_email
                                                        "
                                                    />
                                                </div>
                                            </div>

                                            <div class="col">
                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Fecha de nacimiento
                                                    </label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Ingrese su fecha de nacimiento"
                                                        readonly
                                                        v-model="
                                                            infoUserByPost.use_birthday
                                                        "
                                                    />
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label
                                                        class="font-weight-bold"
                                                    >
                                                        Descripción
                                                    </label>
                                                    <textarea
                                                        cols="30"
                                                        rows="4"
                                                        class="form-control mt-2"
                                                        placeholder="Ingrese su descripción"
                                                        readonly
                                                        v-model="
                                                            infoUserByPost.use_description
                                                        "
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div class="text-center mt-4">
                                                <button
                                                    type="button"
                                                    class="btn btn-primary"
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
                                            </div>
                                            <small
                                                class="text-center copy-right mt-5"
                                            >
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
        <!-- Fin Modal View Profile -->
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import useAuth from '../composables/useAuth'
import useComment from '@/modules/comment/composables/useComment'
import getDayMonthYear from '@/helpers/getDayMonthYear'

export default defineComponent({
    name: 'Profile',
    setup() {
        const route = useRoute()
        const { authUser, getCurrentUser, getPostsByUserId } = useAuth()
        const { createComment } = useComment()
        const infoUserByPost = ref()
        const infoPostByUser = ref()

        const commentForm = ref({
            com_description: '',
            com_use_id: '',
            com_pos_id: '',
        })

        authUser() // Fill state with the user info

        const loadData = async () => {
            try {
                const { data } = await getPostsByUserId(Number(route.params.id))

                infoUserByPost.value = data
                infoPostByUser.value = data.post

                // console.log(infoPostByUser.value)
            } catch (error) {
                // console.error('Error requesting data (Data not found)')
                // console.log(error)
            }
        }

        watch(
            () => route.params.id,
            () => {
                loadData()
            }
        )

        onMounted(() => {
            loadData()
        })

        return {
            getDayMonthYear,
            infoUserByPost,
            infoPostByUser,
            commentForm,

            createCommentBtn: async (posId: string) => {
                commentForm.value.com_use_id = getCurrentUser.value.use_id
                commentForm.value.com_pos_id = posId
                const { ok, message } = await createComment(commentForm.value)
                if (message) console.log(message.response.data)
                if (ok && commentForm.value.com_description.trim() !== '') {
                    commentForm.value.com_description = ''
                    loadData()
                } else {
                    Swal.fire('Oops', 'Faltan datos', 'error')
                }
            },
        }
    },
})
</script>

<style scoped>
.mySection {
    width: 100%;
    min-height: 100vh;
    position: absolute;
    background: #3d3c3c;
    background: -webkit-linear-gradient(to right, #3d3c3c, #141414);
    background: linear-gradient(to right, #3d3c3c, #141414);
}
.cardHeader {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    cursor: pointer;
    border-radius: 15px 15px 0px 0px;
}
.cardHeader img {
    width: 50px;
    border-radius: 50%;
}
.cardHeader h3 {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-top: -7px;
}
.card {
    width: 600px;
    margin-bottom: 50px;
    box-shadow: 0px 0px 10px 0px #ffffff;
    border-radius: 15px;
    background-color: #ffeaa7;
    color: #333333;
}
.myMsgVisit {
    color: #198754;
    position: absolute;
    right: 10px;
    top: 5px;
}
.postDate {
    color: gray;
    position: absolute;
    font-size: 15px;
    left: 71px;
    top: 38px;
}
.commentDate {
    position: relative;
    bottom: -7px;
    color: gray;
    font-family: 'Baloo Bhai 2', cursive;
}
.descriptrion-box,
.comment {
    background-color: #dfc87e;
    padding: 8px 12px;
    border-radius: 5px;
    margin-bottom: 10px;
}
.post-description,
.comment p {
    font-family: 'Baloo Bhai 2', cursive;
    text-align: justify;
}
.comment img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.comment h6 {
    margin-top: 12px;
    margin-left: 5px;
}
.head-comment {
    display: flex;
}
.btn-dark {
    background: #333333;
}
.btn-dark:hover {
    background: #222222;
    transition: all ease 0.3s;
}
textarea {
    resize: none;
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
.myNav button i {
    font-size: 15px;
    margin-top: 0px;
    margin-right: 5px;
    color: #ffffff;
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
.myRow {
    background: #444444 !important;
    border-radius: 10px;
    padding: 10px;
    color: #ffffff;
}
.myRow input,
.myRow textarea {
    cursor: default;
}
</style>
