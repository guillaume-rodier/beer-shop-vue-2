<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.smAndDown"
    v-model="sidebarDrawer"
    absolute
    temporary
    stateless
  >
    <v-list-item>
      <v-spacer />
      <v-btn
        fab
        dark
        small
        color="primary"
        :class="['my-4']"
        @click="emitDrawer"
      >
        <v-icon dark> mdi-close </v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group
        v-model="group"
        active-class="primary--text text--accent-4"
      >
        <v-list-item
          v-for="(button, index) in buttonsNavbar"
          :key="index"
          @click="redirection(button.redirection)"
        >
          <v-list-item-icon>
            <v-icon>{{ button.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ button.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawerComponent",
  props: {
    drawer: {
      type: Boolean,
      required: true,
      default: false,
    },
    buttonsNavbar: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      group: null,
      sidebarDrawer: false,
    };
  },
  methods: {
    redirection(routeName) {
      this.emitDrawer();
      this.$emit("redirection", { name: routeName });
    },
    emitDrawer() {
      if (this.drawer) {
        this.$emit("change-drawer", false);
      }
    },
  },
  watch: {
    "$route.name": {
      immediate: true,
      handler(val) {
        this.group = this.buttonsNavbar.findIndex(
          (route) => route.redirection == val
        );
      },
    },
    drawer: {
      immediate: true,
      handler(val) {
        this.sidebarDrawer = val;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
