import { MutationTree } from 'vuex';
import { CommentStateInterface } from './state';

const mutation: MutationTree<CommentStateInterface> = {
    allComment(state: CommentStateInterface, comments) {
        state.comments = comments
    }

}

export default mutation;