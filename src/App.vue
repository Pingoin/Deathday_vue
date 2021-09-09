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
          <v-list-item v-for="nav in navItems" :key="nav.caption" :to="nav.to">
            <v-list-item-title>{{ nav.caption }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-for="user in store.users" :key="user.name" :to="'/user/'+user.name">
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item to="/edit">
            <v-list-item-title>Nutzer Anlegen</v-list-item-title>
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
import { store, UserStore } from "./store";
@Component({})
export default class App extends Vue {
  get navItems(): { caption: string; to: string }[] {
    let tmp = [
      {
        caption: "Home",
        to: "/",
      },
    ];
    store.users.forEach((user) => {
      tmp.push({
        caption: user.name,
        to: "/user/" + user.name,
      });
    });
    return tmp;
  }

  get store(): UserStore {
    return store;
  }
  drawer = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group: any = null;
  @Watch("myWatchedProperty")
  onGroup(): void {
    this.drawer = false;
  }
}
</script>