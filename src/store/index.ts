import { createStore } from 'vuex';

// My custom modules
import authModule from '@/modules/auth/store';
import { AuthStateInterface } from '@/modules/auth/store/state';

export interface StateInterface {
  auth: AuthStateInterface
}

export default createStore<StateInterface>({
  modules: {
    auth: authModule
  }
})
