import VuexPersist from "vuex-persist";

export default ({ store }) => {
  new VuexPersist({}).plugin(store);
};
