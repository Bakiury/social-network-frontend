import { createStore } from 'vuex';

// My custom modules
import authModule from '@/modules/auth/store';
import { AuthStateInterface } from '@/modules/auth/store/state';
import commentModule from '@/modules/comment/store';
import { CommentStateInterface } from '@/modules/comment/store/state';
import postModule from '@/modules/post/store';
import { PostStateInterface } from '@/modules/post/store/state';

export interface StateInterface {
  auth: AuthStateInterface,
  comment: CommentStateInterface,
  post: PostStateInterface
}

export default createStore<StateInterface>({
  modules: {
    auth: authModule,
    comment: commentModule,
    post: postModule
  }
})
