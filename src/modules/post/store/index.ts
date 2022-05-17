import { Module } from 'vuex';
import { StateInterface } from '@/store/index';

import state, { PostStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const postModule: Module<PostStateInterface, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default postModule;