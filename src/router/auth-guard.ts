import store from '@/store'

const isAuthenticatedGuard = async (to: any, from: any, next: any) => {

    const { ok } = await store.dispatch('auth/refreshToken')

    if (ok) next()
    else next({ name: 'login' })
}

export default isAuthenticatedGuard