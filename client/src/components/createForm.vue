<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"> Nuevo turno </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="mutateTitle"
        counter
        maxlength="25"
        label="Título del turno"
      ></v-text-field>
      <v-textarea
        v-model="mutateDescription"
        name="input-7-1"
        label="Comentarios"
      ></v-textarea>
      <v-select
        :items="options"
        label="Repetir cada:"
        v-model="selected"
      ></v-select>
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
      default: "Una sola vez"
    },
    description: String,
  },
  data() {
    return {
      selected: this.option,
      options: ["Una sola vez", "Todas las semanas", "Una vez por mes"],
      mutateTitle: this.title,
      mutateDescription: this.description,
    };
  },
  methods: {
    createAppointment() {
      this.$emit("create", {
        title: this.mutateTitle,
        description: this.mutateDescription,
        option: this.selected,
      });
    },
  },
  // watch: {
  //   mutateTitle(newValue) {
  //     this.$emit("update:mutateTitle", newValue);
  //   },
  //   mutateDescription(newValue) {
  //     this.$emit("update:mutateDescription", newValue);
  //   },
  //   selected(newValue) {
  //     this.$emit("update:selected", newValue);
  //   },
  // },
};
</script>

<style></style>
