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

  let formattedData = data.map((item) => {
    let event = { ...item };
    const aptDate = moment(event.date);
    event.start = clonedDate(aptDate, event.start_time);
    event.end = clonedDate(aptDate, event.end_time);
    return event;
  });
  return formattedData;
};

export const isPlainObject = (value) => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof value !== "function"
  );
};

export const areObjectsEqual = (objA, objB) => {
  const entriesA = Object.entries(objA);
  const entriesB = Object.entries(objB);

  if (entriesA.length !== entriesB.length) {
    return false;
  }

  for (const [keyA, valueA] of entriesA) {
    const entryB = entriesB.find(
      ([keyB, valueB]) => keyA === keyB && valueA === valueB
    );
    if (!entryB) {
      return false;
    }
  }

  return true;
};
