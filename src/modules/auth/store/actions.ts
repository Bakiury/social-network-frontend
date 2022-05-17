import { ActionTree } from 'vuex';
import { AuthStateInterface } from './state';
import { StateInterface } from '@/store/index';
import authApi from '@/api/authApi';

const actions: ActionTree<AuthStateInterface, StateInterface> = {
    async createUser({ commit }, user) {
        const { use_name, use_lastname, use_email, use_password, use_image, use_birthday, use_description } = user

        try {
            const { data } = await authApi.post('/user/signup', {
                use_name,
                use_lastname,
                use_email,
                use_password,
                use_image,
                use_birthday: use_birthday + ':00+00:00',
                use_description
            })
            const { access_token, refresh_token } = data

            commit('loginUser', { access_token, refresh_token })

            return { ok: true }
        } catch (error) {
            return { ok: false, message: error }
        }
    },

    async signInUser({ commit }, user) {
        const { use_email, use_password } = user

        try {
            const { data } = await authApi.post('/user/signin', { use_email, use_password })
            const { access_token, refresh_token } = data

            commit('loginUser', { access_token, refresh_token })

            return { ok: true }
        } catch (error) {
            commit('logOut')

            return { ok: false, message: error }
        }
    },

    async refreshToken({ commit }) {
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')

        if (!access_token || !refresh_token) {
            commit('logOut')

            return { ok: false, message: 'No hay token' }
        }

        try {
            const { data } = await authApi.post('/user/refresh', '', {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem(
                        'refresh_token'
                    ) }`,
                },
            })
            const { access_token, refresh_token } = data

            commit('loginUser', { access_token, refresh_token })

            return { ok: true }
        } catch (error) {
            commit('logOut')

            return { ok: false, message: error }
        }
    },

    async authUser({ commit }) {
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')

        if (!access_token || !refresh_token) {
            commit('logOut')

            return { ok: false, message: 'No hay token' }
        }

        try {
            const { data } = await authApi.post('/user/auth-user', '', {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem(
                        'access_token'
                    ) }`,
                },
            })
            const { use_id, use_name, use_lastname, use_image } = data

            commit('authUser', { use_id, use_name, use_lastname, use_image })

            return { ok: true }
        } catch (error) {
            commit('logOut')

            return { ok: false, message: error }
        }
    }
}

export default actions;