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

    logOut(state: AuthStateInterface) {
        state.access_token = ''
        state.refresh_token = ''
        state.status = 'not-authenticated'

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
}

export default mutation;