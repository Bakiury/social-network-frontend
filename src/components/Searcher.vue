<template>
    <h4>Buscar a alguien</h4>
    <input
        type="text"
        placeholder="Buscar por el nombre de la persona"
        class="mySearch form-control"
        v-model="text"
        title="Puedes buscar por el nombre o apellido del usuario"
        @keyup="filtering"
    />
    <span v-if="getAllPost.length > 1" class="records">
        Mostrando <b>{{ getAllPost.length }}</b> publicaciones
    </span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import usePost from '@/modules/post/composables/usePost'

export default defineComponent({
    name: 'Searcher',
    setup() {
        const text = ref('')
        const { postsByName, allPost, getAllPost } = usePost()

        const filtering = async () => {
            await allPost()
            postsByName(text.value)
        }

        return {
            text,

            filtering,

            getAllPost,
        }
    },
})
</script>

<style scoped>
h4 {
    position: fixed;
    right: 25px;
    top: 100px;
    color: #ffffff;
    width: 280px;
    text-align: center;
}
.mySearch {
    width: 282px;
    top: 130px;
    right: 25px;
    padding-top: 10px;
    position: fixed;
    border-radius: 25px;
    text-align: center;
    border: 1px dotted #333333;
    box-shadow: 0px 0px 5px 0px #ffffff;
}
.records {
    position: fixed;
    color: #ffffff;
    right: 70px;
    top: 180px;
    font-family: 'Baloo Bhai 2', cursive;
}
</style>
