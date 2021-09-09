<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="20"
            label="Name"
            ref="form"
            required
          ></v-text-field>
        </v-col>

        <v-col class="d-flex" cols="auto">
          <v-select
            v-model="sex"
            :items="['m', 'f']"
            label="Geschlecht"
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="birthDate.year"
            type="number"
            :max="new Date().getFullYear()"
            min="1900"
            label="Geburtsjahr"
            required
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="auto">
          <v-select
            v-model="birthDate.month"
            :items="months"
            item-text="text"
            item-value="val"
            label="Geburtsmonat"
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="birthDate.day"
            type="number"
            max="31"
            min="1"
            label="Geburtstag"
            required
            :rules="dayRules"
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="birthDate.hour"
            type="number"
            max="24"
            min="0"
            label="Geburtsstunde"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="birthDate.minutes"
            type="number"
            max="59"
            min="0"
            label="Geburtsminute"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Eintragen
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { User } from "@/classes/User";
import { Vue, Component } from "vue-property-decorator";
import { store } from "../store";

@Component({
  components: {},
})
export default class EditUser extends Vue {
  valid = false;
  name = "";
  sex: "m" | "f" = "m";
  birthDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
  };
  months = [
    { val: 0, text: "Januar" },
    { val: 1, text: "Februar" },
    { val: 2, text: "März" },

    { val: 3, text: "April" },
    { val: 4, text: "Mai" },
    { val: 5, text: "Juni" },

    { val: 6, text: "Juli" },
    { val: 7, text: "August" },
    { val: 8, text: "September" },

    { val: 9, text: "Oktober" },
    { val: 10, text: "November" },
    { val: 11, text: "Dezember" },
  ];
  nameRules = [
    (v: string): true | string => !!v || "Name is required",
    (v: string): true | string =>
      v.length <= 20 || "Name must be less than 20 characters",
    (v: string): true | string => !store.users.map(x=>x.name).includes(v) || "Name schon vorhanden",
  ];
  dayRules = [
    (v: number): true | string => {
      if ([0, 2, 4, 6, 7, 9, 11].includes(this.birthDate.month)) {
        return v <= 31 ? true : "zu viele Tage";
      } else if (this.birthDate.month == 1) {
        if (
          this.birthDate.year % 400 == 0 ||
          (this.birthDate.year % 4 == 0 && this.birthDate.year % 100 > 0)
        )
          return v <= 29 ? true : "zu viele Tage";
        else return v <= 28 ? true : "zu viele Tage";
      } else {
        return v <= 30 ? true : "zu viele Tage";
      }
    },
  ];
  get user(): User {
    let tmpDate = new Date();
    tmpDate.setFullYear(
      this.birthDate.year,
      this.birthDate.month,
      this.birthDate.day
    );
    tmpDate.setHours(this.birthDate.hour, this.birthDate.minutes, 0, 0);
    return {
      name: this.name,
      sex: this.sex,
      birthDate: tmpDate.valueOf(),
    };
  }
  selectedUser:User|undefined;

  validate():void{
    if(this.valid)
    store.addUser(this.user);
  }
}
</script>