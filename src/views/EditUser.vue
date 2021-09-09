<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="20"
            label="Name"
            required
            :readonly="isEdit"
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
            v-model="year"
            type="number"
            :max="new Date().getFullYear()"
            min="1900"
            label="Geburtsjahr"
            required
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="auto">
          <v-select
            v-model="month"
            :items="months"
            item-text="text"
            item-value="val"
            label="Geburtsmonat"
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="day"
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
            v-model="hour"
            type="number"
            max="24"
            min="0"
            label="Geburtsstunde"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="minutes"
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
            {{isEdit?"Ändern":"Eintragen"}}
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
interface vForm {
  validate(): void;
}

@Component({
  components: {},
})
export default class EditUser extends Vue {
  valid = false;

  public get name(): string {
    return this.user.name;
  }
  public set name(value: string) {
    this.user.name = value;
  }

  public get sex(): "m" | "f" {
    return this.user.sex;
  }
  public set sex(value: "m" | "f") {
    this.user.sex = value;
  }
  get year(): number {
    return new Date(this.user.birthDate).getFullYear();
  }
  set year(val: number) {
    let tmpDate = new Date();
    tmpDate.setFullYear(val, this.month, this.day);
    tmpDate.setHours(this.hour, this.minutes, 0, 0);
    this.user.birthDate = tmpDate.valueOf();
  }
  get month(): number {
    return new Date(this.user.birthDate).getMonth();
  }
  set month(val: number) {
    let tmpDate = new Date();
    tmpDate.setFullYear(this.year, val, this.day);
    tmpDate.setHours(this.hour, this.minutes, 0, 0);
    this.user.birthDate = tmpDate.valueOf();
  }
  get day(): number {
    return new Date(this.user.birthDate).getDate();
  }
  set day(val: number) {
    let tmpDate = new Date();
    tmpDate.setFullYear(this.year, this.month, val);
    tmpDate.setHours(this.hour, this.minutes, 0, 0);
    this.user.birthDate = tmpDate.valueOf();
  }
  get hour(): number {
    return new Date(this.user.birthDate).getHours();
  }
  set hour(val: number) {
    let tmpDate = new Date();
    tmpDate.setFullYear(this.year, this.month, this.day);
    tmpDate.setHours(val, this.minutes, 0, 0);
    this.user.birthDate = tmpDate.valueOf();
  }
  get minutes(): number {
    return new Date(this.user.birthDate).getMinutes();
  }
  set minutes(val: number) {
    let tmpDate = new Date();
    tmpDate.setFullYear(this.year, this.month, this.day);
    tmpDate.setHours(this.hour, val, 0, 0);
    this.user.birthDate = tmpDate.valueOf();
  }

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
  get nameRules():((v: string) => true | string)[] {
    const tmp = [
      (v: string): true | string => !!v || "Name is required",
      (v: string): true | string =>
        v.length <= 20 || "Name must be less than 20 characters",
    ];
    if (!this.isEdit)
      tmp.push(
        (v: string): true | string =>
          !store.users.map((x) => x.name).includes(v) || "Name schon vorhanden"
      );
    return tmp;
  }
  dayRules = [
    (v: number): true | string => {
      if ([0, 2, 4, 6, 7, 9, 11].includes(this.month)) {
        return v <= 31 ? true : "zu viele Tage";
      } else if (this.month == 1) {
        if (this.year % 400 == 0 || (this.year % 4 == 0 && this.year % 100 > 0))
          return v <= 29 ? true : "zu viele Tage";
        else return v <= 28 ? true : "zu viele Tage";
      } else {
        return v <= 30 ? true : "zu viele Tage";
      }
    },
  ];

  user: User = {
    name: "",
    sex: "m",
    birthDate: 0,
  };
  tmp: User | undefined;
  isEdit = false;
  mounted(): void {
    setTimeout(() => {
      this.tmp = store.getUser(
        this.$route.params.id ? this.$route.params.id : ""
      );
      if (this.tmp) {
        this.isEdit = true;
        this.user = this.tmp;
      }
    }, 50);
  }
  beforeUpdate():void {
    (this.$refs.form as unknown as vForm).validate();
  }
  validate(): void {
    if (this.valid) {
      store.addUser(this.user);
      this.$router.push({ path: '/user/'+this.user.name })
    }

  }
}
</script>