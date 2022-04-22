
export async function getAllOffices() {
  const response = await fetch('/offices');
  return await response.json();
}