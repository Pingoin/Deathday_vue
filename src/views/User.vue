<template>
  <v-row class="row items-center justify-evenly">
    <div>
      <h1>{{ death.diff.weeks.toString() }} Wochen {{ death.diff.days.toString() }} Tage {{ death.diff.hours.toString() }}:{{ death.diff.minutes.toString() }}:{{ death.diff.seconds.toString() }} </h1>
      <h2>{{ death.dateOfDeath.toLocaleString() }}</h2>
    </div>
  </v-row>
</template>

<script lang="ts">
import { User } from "@/classes/User";
import { Vue, Component } from "vue-property-decorator";
import lifeTable, { DateOfDeath } from "../classes/lifeTable";
import { store } from "../store";

@Component({
  components: {},
})
export default class PageIndex extends Vue {
  death: DateOfDeath = lifeTable.getDeathDate(this.user.birthDate, this.user.sex);
  mounted():void {
    setInterval(this.refresh.bind(this), 500);
    console.log(this.$route.params.id);
    this.refresh();
  }

  dateInPast(date: string):boolean {
    return Date.parse(date) < new Date().valueOf();
  }
  get user():User{
    return store.user("");
  }
  private refresh() {
    this.death = lifeTable.getDeathDate(this.user.birthDate,this.user.sex);
  }
}
</script>