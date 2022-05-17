import { MutationTree } from 'vuex';
import { PostStateInterface } from './state';

const mutation: MutationTree<PostStateInterface> = {
    allPost(state: PostStateInterface, posts) {
        state.posts = posts
    }

}

export default mutation;