import { Module } from 'vuex';
import { StateInterface } from '@/store/index';

import state, { CommentStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const commentModule: Module<CommentStateInterface, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default commentModule;