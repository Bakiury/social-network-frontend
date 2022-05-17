import { GetterTree } from 'vuex';
import { CommentStateInterface } from './state';
import { StateInterface } from '@/store/index';

const getters: GetterTree<CommentStateInterface, StateInterface> = {
    getComments(state) {
        return state.comments
    }
}

export default getters;