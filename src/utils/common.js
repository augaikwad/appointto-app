import moment from "moment";

export const allowOnlyNumbers = (event) => {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode);

  if (!/^\d+$/.test(keyValue)) {
    event.preventDefault();
  }
};

export const getWeekRange = (date) => {
  const startOfWeek = moment(date).startOf("week").toDate();
  const endOfWeek = moment(date).endOf("week").toDate();
  return {
    start_date: moment(startOfWeek).format("YYYY-MM-DD"),
    end_date: moment(endOfWeek).format("YYYY-MM-DD"),
  };
};

export const getMonthRange = (date) => {
  console.log("getMonthRange === ", date);
  const startOfMonth = moment(date).startOf("month").toDate();
  const endOfMonth = moment(date).endOf("month").toDate();
  return {
    start_date: moment(startOfMonth).format("YYYY-MM-DD"),
    end_date: moment(endOfMonth).format("YYYY-MM-DD"),
  };
};

export const calendarDataFormatter = (data) => {
  const clonedDate = (date, stringTime) => {
    let newDate = date.clone().set({
      hour: moment(stringTime, "h:mm A").hour(),
      minute: moment(stringTime, "h:mm A").minute(),
      second: 0,
      millisecond: 0,
    });
    return newDate.toDate();
  };

  let formattedData = data.map((event) => {
    const aptDate = moment(event.date);
    event.start = clonedDate(aptDate, event.start_time);
    event.end = clonedDate(aptDate, event.end_time);
    // console.log("calendarDataFormatter === ", event);
    return event;
  });
  return formattedData;
};
