<template>
  <v-container fluid>
    <v-data-iterator
      :items.sync="filteredOffices"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-if="$vuetify.breakpoint.mdAndUp"
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-checkbox
              v-model="checkboxMalabia"
              class="subsidiary-filter mx-2"
              label="Malabia"
              value="Malabia"
            ></v-checkbox>
            <v-checkbox
              v-model="checkboxMarioBravo"
              class="subsidiary-filter mx-2"
              label="Mario Bravo"
              value="Mario Bravo"
            ></v-checkbox>
          </template>
          <v-menu bottom left v-if="!$vuetify.breakpoint.mdAndUp">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="checkboxMalabia"
                    value="Malabia"
                    color="purple"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>Malabia</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="checkboxMarioBravo"
                    color="purple"
                    value="Mario Bravo"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>Mario Bravo</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <template>
            <div class="d-flex align-center">
              <h3>{{ chosenDate }}</h3>
              <v-btn
                small
                class="mx-2"
                fab
                color="white"
                @click="showPicker = !showPicker"
              >
                <v-icon dark id="calendar"> mdi-calendar </v-icon>
              </v-btn>
              <div>
                <div v-click-outside-app="hidePicker">
                  <v-date-picker
                    v-if="showPicker"
                    v-model="picker"
                    locale="es"
                    class="picker"
                    @change="sendDate()"
                    light
                  ></v-date-picker>
                </div>
              </div>
            </div>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props" v-if="!isLoading">
        <v-row>
          <v-col
            v-for="(item, ind) in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="6"
            lg="4"
          >
            <v-card>
              <v-card-title
                class="subheading font-weight-bold d-flex justify-space-between"
                :style="headerStyle(item.subsidiary)"
              >
                <div>{{ item.subsidiary }} - {{ item.name }}</div>
                <v-icon
                  v-if="!rolledContent[item.id]"
                  @click="rollContent(item.id)"
                  >mdi-chevron-down</v-icon
                >
                <v-icon v-else @click="rollContent(item.id, true)"
                  >mdi-chevron-up</v-icon
                >
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense v-if="!rolledContent[item.id]">
                <v-list-item
                  v-for="(key, index) in keys"
                  :key="`${key}-${index}`"
                  :style="rowStyle(index)"
                >
                  <v-list-item-content class="tuki">
                    {{ key }} -
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-center justify-space-between"
                  >
                    <div class="title-name">{{ item[key.toLowerCase()] }}</div>
                    <div class="d-flex align-center">
                      <div class="icono" v-if="!item[key]">
                        <v-dialog
                          v-model="showCraeteForm[`${key}-${item.id}`]"
                          width="500"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              x-small
                              class="mx-2"
                              fab
                              dark
                              :color="!item[key] ? 'indigo' : 'green'"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon dark v-if="!item[key]"> mdi-plus </v-icon>
                              <v-icon dark v-else> mdi-pencil </v-icon>
                            </v-btn>
                          </template>
                          <create-edit-form
                            :time="key"
                            :scheduled="offices[ind]"
                            :is-edit="!!item[key]"
                            :title="item[key]"
                            :hours="filteredKeys()"
                            @create="createAppointment(key, item.id, $event)"
                          />
                        </v-dialog>
                      </div>
                      <div class="icono" v-if="item[key]">
                        <v-dialog
                          v-model="showDelete[`${key}-${item.id}`]"
                          width="500"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              x-small
                              class="mx-2"
                              fab
                              dark
                              color="red"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon dark> mdi-delete </v-icon>
                            </v-btn>
                          </template>
                          <remove-appointment
                            @remove="
                              remove(
                                $event,
                                $event === 1 ? item.eventId : item.uuid,
                              )
                            "
                          />
                        </v-dialog>
                      </div>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <spinner v-else class="spinner-body d-flex justify-center align-center" />
    </v-data-iterator>
  </v-container>
</template>
<script>
import createEditForm from './createEditForm.vue';
import removeAppointment from './removeAppointment.vue';
export default {
  props: {
    offices: Array,
    keys: Array,
    selectedDate: String,
    picker: {
      type: String,
      default: () => {
        return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10);
      },
    },
  },
  components: {
    createEditForm,
    removeAppointment,
  },
  data() {
    return {
      itemsPerPageArray: [12, 16, 24],
      search: '',
      filter: {},
      officesData: this.offices,
      sortDesc: false,
      page: 1,
      showCraeteForm: {},
      showDelete: {},
      itemsPerPage: 12,
      showPicker: false,
      sortBy: 'subsidiary',
      checkboxMalabia: 'Malabia',
      rolledContent: {},
      checkboxMarioBravo: false,
      selected: null,
      isLoading: false,
      componentKey: 0,
    };
  },
  directives: {
    'click-outside-app': {
      bind: function (el, binding) {
        const ourClickEventHandler = (event) => {
          if (
            !el.contains(event.target) &&
            el !== event.target &&
            event.target.id !== 'calendar'
          ) {
            binding.value(event);
          }
        };
        el.__vueClickEventHandler__ = ourClickEventHandler;
        document.addEventListener('click', ourClickEventHandler);
      },
      unbind: function (el) {
        document.removeEventListener('click', el.__vueClickEventHandler__);
      },
    },
  },
  updated: function () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    });
  },
  computed: {
    filteredOffices() {
      return this.officesData.filter((off) => {
        return (
          off.subsidiary === this.checkboxMalabia ||
          off.subsidiary === this.checkboxMarioBravo ||
          (!this.checkboxMalabia && !this.checkboxMarioBravo)
        );
      });
    },
    chosenDate() {
      let event = new Date(this.selectedDate || this.picker);
      event.setDate(event.getDate() + 1);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return event.toLocaleDateString('es-ES', options);
    },
  },
  watch: {
    offices(data) {
      this.officesData = data;
    },
  },
  methods: {
    filteredKeys() {
      const keys = [...this.keys];
      keys.push('20:30');
      return keys;
    },
    createAppointment(key, id, { title, description, option, extend }) {
      this.isLoading = true;
      this.showCraeteForm[`${key}-${id}`] = false;
      const date = new Date(`${this.selectedDate}T${key}`);
      this.$emit('create', {
        data: {
          title,
          description,
          extend,
          date: new Date(
            date.getTime() - date.getTimezoneOffset() * 60000,
          ).toJSON(),
          modules: option,
          office: id,
        },
      });
    },
    remove(option, id) {
      this.isLoading = true;
      this.$emit('remove', {
        option,
        id,
        date: this.selectedDate
      });
    },
    rollContent(id, showContent) {
      if (showContent) this.rolledContent[id] = false;
      else this.rolledContent = { ...this.rolledContent, ...{ [id]: true } };
    },
    hidePicker() {
      this.showPicker = false;
    },
    headerStyle(subsidiary) {
      return {
        background: subsidiary === 'Malabia' ? '#dbd2fb85' : '#aba4c485',
        color: '#505050',
        height: !this.$vuetify.breakpoint.mdAndUp ? '60px' : 'auto',
      };
    },
    rowStyle(i) {
      return {
        background: i % 2 !== 0 ? '#ffffff' : '#dbdbff',
      };
    },
    sendDate() {
      this.showPicker = false;
      this.isLoading = true;
      if (this.selectedDate !== this.picker) this.$emit('date', this.picker);
    },
  },
};
</script>
<style scoped lang="scss">
.subsidiary-filter {
  margin-top: 23px !important;
}
header.mb-1.v-sheet.theme--dark.v-toolbar.blue.darken-3 {
  position: sticky;
  top: 0;
  z-index: 1;
}
.v-list.v-sheet.theme--light.v-list--dense {
  max-height: 400px;
  overflow: auto;
}
.v-card__title.subheading.font-weight-bold {
  position: sticky;
  top: 0;
}
.v-card__title {
  font-size: 1.15rem !important;
}
.title-name {
  width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tuki {
  color: #5e5e5e;
  font-weight: 600;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 20%;
}
.icono {
  display: flex;
  justify-content: end;
}
.v-btn--icon.v-size--small .v-icon,
.v-btn--fab.v-size--small .v-icon {
  color: #1565c0;
}
.calendar-icono {
  position: relative;
  cursor: pointer;
}
.picker {
  position: absolute;
  right: 0;
  top: 60px;
}
.v-list-item__content > * {
  flex: none;
}
.spinner-body {
  height: 80vh;
}
</style>
