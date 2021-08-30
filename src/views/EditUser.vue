<template>
  <v-row class="row items-center justify-evenly">
    <div>
      <div class="q-gutter-md row items-start">
        <v-date-picker v-model="birthDateTime" mask="YYYY-MM-DD" dark :options="dateInPast" />
        <v-time-picker v-model="birthTime" mask="HH:mm" dark />
      </div>
      <select v-model="sex">
        <option>m</option>
        <option>f</option>
      </select>
    </div>
    <div>
      <h2>{{ death.dateOfDeath.toLocaleString() }}</h2>
      <ul>
        <li>{{ death.diff.weeks.toString() }} Wochen</li>
        <li>{{ death.diff.days.toString() }} Tage</li>
        <li>{{ death.diff.hours.toString() }} Stunden</li>
        <li>{{ death.diff.minutes.toString() }} Minuten</li>
        <li>{{ death.diff.seconds.toString() }} Sekunden</li>
      </ul>
    </div>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import lifeTable, { DateOfDeath } from "../classes/lifeTable";

@Component({
  components: {},
})
export default class EditUser extends Vue {
  death: DateOfDeath = lifeTable.getDeathDate(new Date(), "m");
  sex: "m" | "f" = "m";
  birthDate = new Date();
  birthDateTime = "1990-03-07";
  birthTime = "21:00";
  mounted():void {
    setInterval(this.refresh.bind(this), 500);
    this.refresh();
  }

  dateInPast(date: string):boolean {
    return Date.parse(date) < new Date().valueOf();
  }

  private refresh() {
    this.birthDate = new Date(Date.parse(this.birthDateTime + " " + this.birthTime));
    this.death = lifeTable.getDeathDate(this.birthDate, this.sex);
  }
}
</script>