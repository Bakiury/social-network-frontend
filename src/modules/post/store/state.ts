export interface PostStateInterface {
    posts: any;
}

function state(): PostStateInterface {
    return {
        posts: []
    }
}

export default state;