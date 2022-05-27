import { computed } from 'vue';
import { useStore } from 'vuex';

const useAuth = () => {
    const store = useStore();

    const createUser = async (user: any) => {
        const resp = await store.dispatch('auth/createUser', user);

        return resp;
    }

    const updateUser = async (user: any) => {
        const resp = await store.dispatch('auth/updateUser', user);

        return resp;
    }

    const getPostsByUserId = async (userId: number) => {
        const resp = await store.dispatch('auth/getPostsByUserId', userId);

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
        updateUser,
        getPostsByUserId,
        loginUser,
        logOut,

        authStatus: computed(() => store.getters['auth/currentState']),
        getCurrentUser: computed(() => store.getters['auth/getCurrentUser']),
    };
};

export default useAuth;