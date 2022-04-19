<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">Remover evento</v-card-title>
    <v-card-text>
      <v-radio-group v-model="selected">
        <v-radio
          v-for="n in options"
          :key="n.value"
          :label="n.label"
          :value="n.value"
        ></v-radio>
      </v-radio-group>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red" text @click="remove()"> Remover evento(s) </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RemoveAppointment",
  data() {
    return {
      options: [
        {
          label: "Remover este evento",
          value: 1,
        },
        {
          label: "Remover todos los eventos recurrentes",
          value: 2,
        },
      ],
      selected: 1,
    };
  },
  methods: {
    remove() {
      this.$emit("remove", this.selected);
    },
  },
};
</script>

<style></style>
