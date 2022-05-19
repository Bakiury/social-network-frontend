import { MutationTree } from 'vuex';
import { CommentStateInterface } from './state';

const mutation: MutationTree<CommentStateInterface> = {
    allComment(state: CommentStateInterface, comments) {
        state.comments = comments
    },

    createComment(state: CommentStateInterface, comments) {
        state.comments = [...state.comments, comments]
    }

}

export default mutation;