import { createModule, mutation, action, extractVuexModule, createProxy } from "vuex-class-component";
import Vue from 'vue';
import Vuex from 'vuex'


const VuexModule = createModule({
  namespaced: "user",
  strict: false,
})
Vue.use(Vuex);
export class UserStore extends VuexModule {

  get users():{
    name:string;
    birthDate:Date;
    sex:"m" | "f";
  }[]{
    return [{
      name:"Pingoin",
      birthDate:new Date(Date.parse("1990-03-07 21:00")),
      sex: "m"
    }]
  }

}


export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore)
  }
})

// Creating proxies.
export const vxm = {
  user: createProxy(store, UserStore),
}