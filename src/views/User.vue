<template>
  <v-row class="row items-center justify-evenly">
    <div>
      <h1>
        {{ death.diff.weeks.toString() }} Wochen
        {{ death.diff.days.toString() }} Tage
        {{ death.diff.hours.toString() }}:{{ death.diff.minutes.toString() }}:{{
          death.diff.seconds.toString()
        }}
      </h1>
      <h2>{{ user.name }}</h2>
      <h2>{{ death.dateOfDeath.toLocaleString() }}</h2>
      <v-btn color="success" class="mr-4" :to="'/edit/'+user.name"> Ändern </v-btn>
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
export default class ViewUser extends Vue {
  user: User = {
    name: "",
    sex: "m",
    birthDate: 0,
  };

  death: DateOfDeath = lifeTable.getDeathDate(
    new Date(this.user.birthDate),
    this.user.sex
  );

  mounted(): void {
    setInterval(this.refresh.bind(this), 500);
    this.refresh();
  }
  get id(): string {
    return this.$route.params.id ? this.$route.params.id : "";
  }
  dateInPast(date: string): boolean {
    return Date.parse(date) < new Date().valueOf();
  }

  private refresh() {
    this.user = store.getUserDef(this.id);
    this.death = lifeTable.getDeathDate(
      new Date(this.user.birthDate),
      this.user.sex
    );
  }
}
</script>