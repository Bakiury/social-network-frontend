export interface CommentStateInterface {
    comments: any;
}

function state(): CommentStateInterface {
    return {
        comments: []
    }
}

export default state;