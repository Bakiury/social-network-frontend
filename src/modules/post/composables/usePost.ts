import { computed } from 'vue';
import { useStore } from 'vuex';

const usePost = () => {
    const store = useStore();

    const allPost = async () => {
        const resp = await store.dispatch('post/allPost');

        return resp;
    }

    return {
        allPost,

        getAllPost: computed(() => store.getters['post/getPosts']),
    }
};

export default usePost;