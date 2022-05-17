<template>
    <div class="card">
        <div class="cardHeader" title="Ver perfil de este usuario">
            <img src="@/assets/user.png" alt="Imagen del usuario" />
            <h3>
                {{ postData.user.use_name }} {{ postData.user.use_lastname }}
            </h3>
            <span class="myMsgVisit"></span>
        </div>
        <img
            src="@/assets/background.jpg"
            class="card-img-top"
            alt="Imagen del post"
        />
        <div class="card-body">
            <h4 class="card-title">
                <u>{{ postData.pos_title }}</u>
            </h4>
            <p class="card-text">{{ postData.pos_description }}</p>
            <hr />
            <div class="d-flex justify-content-center">
                <a class="btn btn-dark">Aceptar</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Post',
    props: {
        postData: {
            type: Object,
            required: true,
        },
    },
    setup() {
        return {}
    },
})
</script>

<style scoped>
.cardHeader {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    cursor: pointer;
    border-radius: 15px 15px 0px 0px;
}
.cardHeader img {
    width: 50px;
}
.cardHeader h3 {
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-top: 10px;
}
.card {
    width: 100% !important;
    margin-bottom: 50px;
    box-shadow: 0px 0px 10px 0px #ffffff;
    border-radius: 15px;
}
.myMsgVisit {
    color: #198754;
    position: absolute;
    right: 10px;
    top: 5px;
}
</style>
