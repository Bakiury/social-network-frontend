import { ActionTree } from 'vuex';
import { PostStateInterface } from './state';
import { StateInterface } from '@/store/index';
import authApi from '@/api/authApi';

const actions: ActionTree<PostStateInterface, StateInterface> = {
    async allPost({ commit }) {
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')

        if (!access_token || !refresh_token) {
            commit('logOut')

            return { ok: false, message: 'No hay token' }
        }

        try {
            const { data } = await authApi.get('/post', {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem(
                        'access_token'
                    ) }`,
                },
            })

            commit('allPost', data)

            return { ok: true }
        } catch (error) {
            commit('logOut')

            return { ok: false, message: error }
        }
    }
        
}

export default actions;