export async function getAppointmentsByDate ({ startDate, endDate }) {
  const response = await fetch(`/appointments/date?startDate="${startDate}"&endDate="${endDate}"`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  return await response.json()
}

export async function createAppointment(data) {
  const response = await fetch(`/appointments`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
  return await response.json();
}