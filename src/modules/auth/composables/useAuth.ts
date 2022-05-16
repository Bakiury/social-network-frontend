import { computed } from 'vue';
import { useStore } from 'vuex';

const useAuth = () => {
    const store = useStore();

    const createUser = async (user: any) => {
        const resp = await store.dispatch('auth/createUser', user);

        return resp;
    }

    const loginUser = async (user: any) => {
        const resp = await store.dispatch('auth/signInUser', user);

        return resp;
    }

    const refreshToken = async () => {
        const resp = await store.dispatch('auth/refreshToken');

        return resp;
    }

    const authUser = async () => {
        const resp = await store.dispatch('auth/authUser');

        return resp;
    }

    const logOut = () => {
        store.commit('auth/logOut');
    }

    return {
        authUser,
        refreshToken,
        createUser,
        loginUser,
        logOut,

        authStatus: computed(() => store.getters['auth/currentState']),
        userName: computed(() => store.getters['auth/userName']),
    };
};

export default useAuth;