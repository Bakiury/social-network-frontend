import { GetterTree } from 'vuex';
import { PostStateInterface } from './state';
import { StateInterface } from '@/store/index';

const getters: GetterTree<PostStateInterface, StateInterface> = {
    getPosts(state) {
        return state.posts
    }
}

export default getters;