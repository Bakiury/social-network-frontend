export interface AuthStateInterface {
    status: string;
    user: any;
    access_token: string;
    refresh_token: string;
}

function state(): AuthStateInterface {
    return {
        status: 'authenticating', // 'authenticated', 'not-authenticated', 'authenticating'
        user: null,
        access_token: '',
        refresh_token: ''
    }
}

export default state;