<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Deathday</v-toolbar-title>

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title v-for="nav in navItems" :key="nav.caption" :to="nav.to"
              >{{
                nav.caption
              }}</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { vxm } from "./store";
@Component({})
export default class App extends Vue {
  get vxm() {
    return vxm;
  }
  get navItems(): { caption: string; to: string }[] {
    return [
      {
        caption: "Home",
        to: "/",
      },
    ];
  }
  drawer = false;
  group: any = null;
  @Watch("myWatchedProperty")
  onGroup(): void {
    this.drawer = false;
  }
}
</script>