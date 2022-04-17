export const DATES_PERIODS = () => {
  let hours = []
  for (let index = 8; index <= 20; index++) {
    if (index < 10) {
      hours.push(`0${index}:00`)
      hours.push(`0${index}:30`)
    }
    else {
      hours.push(`${index}:00`)
      if (index !== 20) hours.push(`${index}:30`)
    }
  }
  return hours
}