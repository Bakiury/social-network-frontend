import { computed } from 'vue';
import { useStore } from 'vuex';

const usePost = () => {
    const store = useStore();

    const allPost = async () => {
        const resp = await store.dispatch('post/allPost');

        return resp;
    }

    const createPost = async (post: any) => {
        const resp = await store.dispatch('post/createPost', post);

        return resp;
    }

    const postsByName = (userName: string) => {
        store.commit('post/postsByName', userName);
    }

    return {
        allPost,
        createPost,
        postsByName,

        getAllPost: computed(() => store.getters['post/getPosts']),
    }
};

export default usePost;