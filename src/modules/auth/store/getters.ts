import { GetterTree } from 'vuex';
import { AuthStateInterface } from './state';
import { StateInterface } from '@/store/index';

const getters: GetterTree<AuthStateInterface, StateInterface> = {
    currentState(state) {
        return state.status
    },

    getCurrentUser(state) {
        return state.user || ''
    }
}

export default getters;