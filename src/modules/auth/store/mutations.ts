import { MutationTree } from 'vuex';
import { AuthStateInterface } from './state';

const mutation: MutationTree<AuthStateInterface> = {
    loginUser(state: AuthStateInterface, { access_token, refresh_token }) {
        if (access_token) {
            localStorage.setItem('access_token', access_token)
            state.access_token = access_token
        }

        if (refresh_token) {
            localStorage.setItem('refresh_token', refresh_token)
            state.refresh_token = refresh_token
        }

        state.status = 'authenticated'
    },

    authUser(state: AuthStateInterface, { use_id, use_name, use_lastname, use_email, use_image, use_birthday, use_description }) {
        state.user = {
            use_id,
            use_name,
            use_lastname,
            use_email,
            use_image,
            use_birthday,
            use_description
        }
    },

    logOut(state: AuthStateInterface) {
        state.access_token = ''
        state.refresh_token = ''
        state.user = ''
        state.status = 'not-authenticated'

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    },

    updateUser(state: AuthStateInterface, user) {
        const index = Object.entries(state.user).map((u: any) => u.use_id).indexOf(user.use_id)
        Object.entries(state.user)[index] = user
    }
}

export default mutation;