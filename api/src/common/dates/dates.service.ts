import { DATES_PERIODS } from './dates.constants';
import { v4 as uuidv4 } from 'uuid';
import { nextMonth, nextweek } from './helper';

export class DatesService {
  formatDates(appointments) {
    let calendars = [];
    const datePeriods = DATES_PERIODS();
    appointments.forEach((appointment) => {
      const index = calendars.findIndex(
        (calendar) =>
          calendar.id.toString() === appointment.office._id.toString(),
      );
      const hour =
        new Date(appointment.date).getUTCHours() < 10
          ? `0${new Date(appointment.date).getUTCHours()}`
          : new Date(appointment.date).getUTCHours();
      const minutes =
        new Date(appointment.date).getUTCMinutes() === 0
          ? `0${new Date(appointment.date).getUTCMinutes()}`
          : new Date(appointment.date).getUTCMinutes();

      const timeFormatted = `${hour}:${minutes}`;

      if (index === -1) {
        let calendar = {};
        let dates = {};
        datePeriods.forEach((date) => {
          dates = {
            ...dates,
            ...{
              [date]: timeFormatted === date ? appointment.title : '',
            },
          };
        });
        calendar = {
          ...calendar,
          ...{
            id: appointment.office._id.toString(),
            uuid: appointment.uuid.toString(),
            eventId: appointment._id.toString(),
            name: appointment.office.name,
            subsidiary: appointment.office.subsidiary,
          },
          ...dates,
        };
        calendars.push(calendar);
      } else {
        if (calendars[index][timeFormatted] !== undefined)
          calendars[index][timeFormatted] = appointment.title;
      }
    });
    return calendars;
  }
  extendDates(appointment) {
    const uuid = uuidv4();
    appointment = { ...appointment, ...{ uuid } };
    const times = appointment.extend;
    let newModule = new Date(appointment.date)
    let appointments = [appointment];
    for (let i = 1; i <= times; i++) {
      if (appointment.modules === 'Todas las semanas') {
        for (let index = 0; index < 150; index++) {
          let copyAppointment = { ...appointment };
          const date = nextweek(appointments[index].date, newModule);
          console.log("~ date", date);
          console.log("~ newModule", newModule);
          copyAppointment.date = date;
          copyAppointment = { ...copyAppointment, ...{ uuid } };
          appointments.push(copyAppointment);
        }
      }
      if (appointment.modules === 'Una vez por mes') {
        for (let index = 0; index < 36; index++) {
          let copyAppointment = { ...appointment };
          const d = new Date(appointments[index].date);
          const date = nextMonth(d, newModule);
          copyAppointment.date = date;
          copyAppointment = { ...copyAppointment, ...{ uuid } };
          appointments.push(copyAppointment);
        }
      }
      if (i < times) {
        let copyAppointment = {...appointment}
        newModule = new Date(newModule.getTime() + 30*60000)
        copyAppointment.date = newModule
        copyAppointment.uuid = uuid
        appointments.push(copyAppointment)
      }
    }
    return appointments;
  }
}
