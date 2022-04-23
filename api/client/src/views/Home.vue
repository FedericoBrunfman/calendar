<template>
  <div class="home">
    <one-day-table
      v-if="!isLoading"
      :offices.sync="offices"
      :keys="hours"
      :selected-date="selectedDate"
      @date="getAppointmentsByDate($event)"
      :key="tableKey"
      :picker="picker"
      @create="createAppointment($event)"
      @remove="remove($event)"
    />
    <loading v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import OneDayTable from "../components/OneDayTable.vue";
import { getAllOffices } from "../services/OfficeService";
import {
  getAppointmentsByDate,
  createAppointment,
  removeAppointment,
  removeManyAppointment,
  removeDayAppointment
} from "../services/AppointmentService";
export default {
  name: "Home",
  components: {
    OneDayTable,
  },
  data() {
    return {
      offices: [],
      hours: this.createHours(),
      selectedDate: this.createDate(),
      tableKey: 0,
      isLoading: false,
      renderComponent: 0,
      picker: null,
    };
  },
  async mounted() {
    const date = this.createDate(new Date());
    // await this.getAllOffices();
    await this.getAppointmentsByDate(date, true);
  },
  methods: {
    createHours() {
      let hours = [];
      for (let index = 8; index <= 20; index++) {
        if (index < 10) {
          hours.push(`0${index}:00`);
          hours.push(`0${index}:30`);
        } else {
          hours.push(`${index}:00`);
          if (index !== 20) hours.push(`${index}:30`);
        }
      }
      return hours;
    },
    async remove({ option, id, date }) {
      if (option === 1) {
        await removeAppointment(id);
      } else if (option === 2) {
        await removeManyAppointment(id)
      } else if (option === 3) {
        await removeDayAppointment(id, date)
      }
      this.getAppointmentsByDate(this.selectedDate);
    },
    async getAllOffices() {
      await getAllOffices().then((response) => {
        this.offices = response.map((office) => {
          let hoursObj = {};
          this.hours.forEach((element) => {
            hoursObj = { ...hoursObj, [element]: "" };
          });
          return { ...office, ...hoursObj };
        });
      });
    },
    createDate(date) {
      let d = !date ? new Date() : new Date(date);
      return d.toISOString().substr(0, 10);
    },
    createAppointment({ data }) {
      createAppointment(data).then(() => {
        this.getAppointmentsByDate(this.selectedDate);
      });
    },
    async getAppointmentsByDate(date, isLoading) {
      if (isLoading) this.isLoading = true;
      let d = new Date(date);
      d.setUTCDate(d.getUTCDate() + 1);
      const nextDay = d.toISOString().substr(0, 10);
      await this.getAllOffices();
      await getAppointmentsByDate({
        startDate: date,
        endDate: nextDay,
      })
        .then((response) => {
          response.forEach((el) => {
            const index = this.offices.findIndex(
              (office) => office.id === el.id
            );
            if (index !== -1) this.offices[index] = el;
          });
          this.selectedDate = date;
          this.tableKey++;
        })
        .finally(() => {
          if (isLoading) this.isLoading = false;
          this.picker = this.selectedDate;
        });
    },
  },
};
</script>
