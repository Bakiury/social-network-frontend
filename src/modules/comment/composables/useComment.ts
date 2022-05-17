import { computed } from 'vue';
import { useStore } from 'vuex';

const useComment = () => {
    const store = useStore();

    const allComment = async () => {
        const resp = await store.dispatch('comment/allComment');

        return resp;
    }

    return {
        allComment,

        getAllComment: computed(() => store.getters['comment/getComments']),
    }
};

export default useComment;