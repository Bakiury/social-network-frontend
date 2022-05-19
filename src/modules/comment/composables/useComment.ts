import { computed } from 'vue';
import { useStore } from 'vuex';

const useComment = () => {
    const store = useStore();

    const allComment = async () => {
        const resp = await store.dispatch('comment/allComment');

        return resp;
    }

    const createComment = async (comment: any) => {
        const resp = await store.dispatch('comment/createComment', comment);

        return resp;
    }

    return {
        allComment,
        createComment,

        getAllComment: computed(() => store.getters['comment/getComments']),
    }
};

export default useComment;