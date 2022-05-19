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
            <div
                v-if="postData.pos_title && postData.pos_description"
                class="descriptrion-box"
            >
                <h5 class="card-title">
                    <u>{{ postData.pos_title }}</u>
                </h5>
                <p class="post-description">{{ postData.pos_description }}</p>
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
                    @click="createCommentBtn"
                >
                    <i class="fa-solid fa-comments"></i> &nbsp;Comentar
                </a>
            </div>
            <hr />
            <div v-if="postData.Comment.length > 0" class="comments">
                <h5>
                    {{ postData.Comment.length }}
                    {{
                        postData.Comment.length === 1
                            ? 'Comentario'
                            : 'Comentarios'
                    }}
                </h5>
                <div
                    v-for="(com, index) in postData.Comment"
                    :key="index"
                    class="comment"
                >
                    <div class="head-comment">
                        <img
                            v-if="
                                postData.Comment[index].user.use_image !== '...'
                            "
                            :src="postData.Comment[index].user.use_image"
                            alt="Imagen del usuario"
                        />
                        <img
                            v-else
                            src="@/assets/user.png"
                            alt="Imagen del usuario"
                        />
                        <h6>
                            {{ postData.Comment[index].user.use_name }}
                            {{ postData.Comment[index].user.use_lastname }}
                        </h6>
                    </div>
                    <p class="mt-1">
                        {{ postData.Comment[index].com_description }}
                    </p>
                    <span class="commentDate">
                        {{
                            getDayMonthYear(postData.Comment[index].updatedAt)
                                .day
                        }}
                        de
                        {{
                            getDayMonthYear(postData.Comment[index].updatedAt)
                                .month
                        }}
                        a las
                        {{
                            getDayMonthYear(postData.Comment[index].updatedAt)
                                .time
                        }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Swal from 'sweetalert2'
import useAuth from '@/modules/auth/composables/useAuth'
import useComment from '@/modules/comment/composables/useComment'
import usePost from '@/modules/post/composables/usePost'
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

        const { getCurrentUser } = useAuth()
        const { createComment } = useComment()
        const { allPost } = usePost()

        const commentForm = ref({
            com_description: '',
            com_use_id: '',
            com_pos_id: '',
        })

        return {
            day,
            month,
            dayWeek,
            yearDay,
            time,
            commentForm,
            getDayMonthYear,

            createCommentBtn: async () => {
                commentForm.value.com_use_id = getCurrentUser.value.use_id
                commentForm.value.com_pos_id = props.postData.pos_id
                const { ok, message } = await createComment(commentForm.value)
                if (message) console.log(message.response.data)

                if (ok && commentForm.value.com_description.trim() !== '') {
                    commentForm.value.com_description = ''
                    allPost() // (list posts) Fill state with the posts info
                } else {
                    Swal.fire('Oops', 'Faltan datos', 'error')
                }
            },
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
</style>
