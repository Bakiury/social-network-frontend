<template>
    <Navbar />
    <section id="myFeed">
        <h2>
            <span>
                <u>Bienvenid@</u>
                <p>{{ userName }}</p>
            </span>
        </h2>

        <!-- <Searcher @forChild="postsFiltered" /> -->

        <i
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            class="fas fa-plus-circle"
            title="Nueva publicación"
        ></i>

        <section class="myContent">
            <div>
                <Comment />
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
                                <b>Título:&nbsp;</b>
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Ingrese un título"
                                />
                            </div>
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <b>Imagen:&nbsp;</b>
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Ingrese la imagen"
                                />
                            </div>
                            <br />
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <b>Descripción:&nbsp;</b>
                                <textarea
                                    rows="4"
                                    class="form-control"
                                    placeholder="Ingrese una descripción"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button class="btn btn-success">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin Modal Create -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useAuth from '@/modules/auth/composables/useAuth'
import Navbar from '@/components/Navbar.vue'
import Comment from '@/components/Comment.vue'

export default defineComponent({
    name: 'Feed',
    components: {
        Navbar,
        Comment,
    },
    setup() {
        const { authUser, userName } = useAuth()

        authUser()

        return {
            authUser,
            userName,
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
.fa-plus-circle {
    color: #333333;
    font-size: 50px;
    position: fixed;
    cursor: pointer;
    transform: translate(-50%);
    left: 50%;
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
</style>
