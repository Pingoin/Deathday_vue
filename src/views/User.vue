<template>
  <v-row class="row items-center justify-evenly">
    <div>
      <h1>{{ death.diff.weeks.toString() }} Wochen {{ death.diff.days.toString() }} Tage {{ death.diff.hours.toString() }}:{{ death.diff.minutes.toString() }}:{{ death.diff.seconds.toString() }} </h1>
      <h2>{{ death.dateOfDeath.toLocaleString() }}</h2>
    </div>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import lifeTable, { DateOfDeath } from "../classes/lifeTable";
import { vxm } from "../store";

@Component({
  components: {},
})
export default class PageIndex extends Vue {
  death: DateOfDeath = lifeTable.getDeathDate(vxm.user.users[0].birthDate, vxm.user.users[0].sex);
  mounted():void {
    setInterval(this.refresh.bind(this), 500);
    this.refresh();
  }

  dateInPast(date: string):boolean {
    return Date.parse(date) < new Date().valueOf();
  }

  private refresh() {
    this.death = lifeTable.getDeathDate(vxm.user.users[0].birthDate, vxm.user.users[0].sex);
  }
}
</script>