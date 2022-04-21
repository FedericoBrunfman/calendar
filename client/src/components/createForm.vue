<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"> Nuevo evento </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="mutateTitle"
        counter
        maxlength="25"
        :error-messages="titleErrors"
        label="Título"
      ></v-text-field>
      <v-textarea
        v-model="mutateDescription"
        name="input-7-1"
        dense
        rows="2"
        label="Comentarios"
      ></v-textarea>
      <v-select
        :items="options"
        label="Repetir cada:"
        v-model="selected"
      ></v-select>
      <div class="d-flex align-center">
        <div class="mr-10">
          Desde: <strong>{{ time }}</strong> hrs hasta
        </div>
        <v-select :items="formatHours(time)" v-model="finishTime" />
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="createAppointment()">
        Crear turno
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CreateForm",
  props: {
    title: String,
    option: {
      type: String,
      default: "Una sola vez",
    },
    description: String,
    hours: Array,
    time: String,
    scheduled: Object,
  },
  data() {
    return {
      selected: this.option,
      finishTime: "",
      options: ["Una sola vez", "Todas las semanas", "Una vez por mes"],
      mutateTitle: this.title,
      mutateDescription: this.description,
      copyScheduled: { ...this.scheduled },
      titleErrors: []
    };
  },
  methods: {
    formatHours(time) {
      let arr = [...this.hours];
      const index = arr.indexOf(this.time);
      const newArr = arr.slice(index + 1);
      let i = null;
      for (const key in this.copyScheduled) {
        if (this.copyScheduled[key] && !isNaN(parseInt(key))) {
          if (key > time) {
            i = key;
            break;
          }
        }
      }

      if (i) newArr.splice(newArr.indexOf(i) + 1);
      return newArr;
    },
    createAppointment() {
      if (!this.mutateTitle) {
        this.titleErrors.push('El titulo es requerido')
      } else  {
        const range = this.hours.slice(
          this.hours.indexOf(this.time),
          this.hours.indexOf(this.finishTime)
        ).length;
        this.$emit("create", {
          title: this.mutateTitle,
          description: this.mutateDescription,
          option: this.selected,
          extend: range,
        });
      }
    },
  },
  watch: {
    mutateTitle () {
      if (this.mutateTitle) this.titleErrors = []
      else this.titleErrors.push('El titulo es requerido')
    }
  }
};
</script>

<style></style>
