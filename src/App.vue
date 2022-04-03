<template>
  <v-app light :class="['app-style']">
    <NavigationDrawerComponent
      :buttons-navbar="buttonsNavbar"
      :drawer="drawer"
      @redirection="redirection"
      @change-drawer="changeDrawer"
    />
    <TopNavbarComponent
      :buttons-navbar="buttonsNavbar"
      @redirection="redirection"
      @open-sidebar="changeDrawer"
    />
    <v-main :class="['main-style']">
      <v-progress-circular
        v-if="!showList"
        indeterminate
        color="primary"
        :size="70"
        :width="7"
        :class="['loader-style', 'mx-auto']"
      ></v-progress-circular>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import NavigationDrawerComponent from "@/components/layout-components/NavigationDrawerComponent";
import TopNavbarComponent from "@/components/layout-components/TopNavbarComponent";

export default {
  name: "App",
  components: {
    NavigationDrawerComponent,
    TopNavbarComponent,
  },
  data() {
    return {
      showList: true,
      drawer: false,
      buttonsNavbar: [
        {
          title: "Beer List",
          redirection: "BeerList",
          icon: "mdi-format-list-numbered ",
        },
        {
          title: "Beer Details",
          redirection: "BeerDetail",
          icon: "mdi-note-text",
        },
        {
          title: "Beer Cart",
          redirection: "BeerCart",
          icon: "mdi-cart",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      initBeerList: "beer/initBeerList",
    }),
    redirection(route) {
      this.$router.push(route).catch(() => {});
    },
    changeDrawer(open) {
      this.drawer = open;
    },
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "Beer Shop";
    },
    drawer(val) {
      if (val && this.$vuetify.breakpoint.mdAndUp) {
        this.drawer = false;
      }
    },
  },
  async created() {
    this.showList = false;
    await this.initBeerList();
    this.showList = true;
  },
};
</script>

<style lang="scss" scoped>
.app-style {
  .main-style {
    position: relative;

    .loader-style {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
