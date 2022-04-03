import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";

// register jw pagination component globally
import JwPagination from "jw-vue-pagination";

Vue.component("jw-pagination", JwPagination);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
