import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import beer from "@/store/modules/beer/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { beer },
  plugins: [createPersistedState()],
});
