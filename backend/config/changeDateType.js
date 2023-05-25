//Change date type from 01.02.2019 to 2019-02-01
const changeDateType = (date) => {
  date = date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2);
  return date;
}

export default changeDateType