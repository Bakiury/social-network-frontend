<template>
    <div v-if="postData.user" class="card">
        <div class="cardHeader" title="Ver perfil de este usuario">
            <img
                v-if="postData.user.use_image !== '...'"
                :src="postData.user.use_image"
                alt="Imagen del usuario"
            />
            <img v-else src="@/assets/user.png" alt="Imagen del usuario" />
            <h3>
                {{ postData.user.use_name }} {{ postData.user.use_lastname }}
            </h3>
            <span class="postDate"
                >{{ day }} de {{ month }} a las {{ time }}</span
            >
            <!-- <span class="myMsgVisit"></span> -->
        </div>
        <img
            v-if="postData.pos_image !== '...'"
            :src="postData.pos_image"
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
import getDayMonthYear from '@/helpers/getDayMonthYear'

export default defineComponent({
    name: 'Post',
    props: {
        postData: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { day, month, dayWeek, yearDay, time } = getDayMonthYear(
            props.postData.updatedAt
        )

        return {
            day,
            month,
            dayWeek,
            yearDay,
            time,
        }
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
    border-radius: 50%;
}
.cardHeader h3 {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-top: -7px;
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
.postDate {
    color: gray;
    position: absolute;
    font-size: 15px;
    left: 71px;
    top: 38px;
}
</style>
