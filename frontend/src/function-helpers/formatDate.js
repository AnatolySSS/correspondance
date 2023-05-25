//Function for format Date as dd.mm.yyyy
const formatDate = (date) => {
  date ?
  date = new Date(date).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Moscow",
  }) :  date = null
  return date
}
export default formatDate