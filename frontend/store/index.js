import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import state from "./modules/state";
import mutations from "./modules/mutations";
import getters from "./modules/getters";
import actions from "./modules/actions";

const vuexLocal = new VuexPersist({
  storage: window.localStorage
});

const initStore = () =>
  new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins: [vuexLocal.plugin]
  });

export const store = initStore();

export default initStore;
