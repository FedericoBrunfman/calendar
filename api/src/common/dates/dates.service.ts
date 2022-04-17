import { DATES_PERIODS } from './dates.constants';

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
}
