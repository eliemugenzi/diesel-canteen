import Vuex from "vuex";

import state from "./modules/state";
import mutations from "./modules/mutations";
import getters from "./modules/getters";
import actions from "./modules/actions";

const initStore = () =>
  new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  });

export const store = initStore();

export default initStore;
