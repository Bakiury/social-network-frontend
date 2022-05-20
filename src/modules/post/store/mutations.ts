import { MutationTree } from 'vuex';
import { PostStateInterface } from './state';

const mutation: MutationTree<PostStateInterface> = {
    allPost(state: PostStateInterface, posts) {
        state.posts = posts
    },

    createPost(state: PostStateInterface, posts) {
        state.posts = [...state.posts, posts]
    },

    postsByName(state: PostStateInterface, userName) {
        state.posts = state.posts.filter((post: any) =>
            (post.user.use_name + post.user.use_lastname)
                .replace(/ /g, "")
                .toLowerCase()
                .includes(userName.replace(/ /g, "").toLowerCase())
        )
    }

}

export default mutation;