export const valueToArrayOfObject = (val) => {
  let array = [];
  if (!!val && Array.isArray(val) && val.length > 0) {
    let splittedArray = val.split(",");
    splittedArray.forEach((item) =>
      array.push({ label: item.trim(), value: item.trim() })
    );
  }

  return array;
};

export const getValueFromArrayOfObject = (data) => {
  let val = "";
  if (!!data) {
    let temp = [];
    data.forEach((item) => temp.push(item.value));
    val = temp.join(", ");
  }
  return val;
};

export const getValueFromArray = (data) => {
  let val = "";
  if (Array.isArray(data)) {
    val = data.join(", ");
  }
  return val;
};

export const arrayToArrayOfObject = (array) => {
  let arrayOfObject = [];
  if (Array.isArray(array)) {
    arrayOfObject = array.map((element) => {
      return { [element]: element };
    });
  }
  return arrayOfObject;
};

export const stringToArrayOfObject = (string) => {
  let arrayOfObjects = [];
  if (string && string.length > 0) {
    arrayOfObjects = string.split(",").map((item) => {
      const trimedItem = item.trim();
      return { label: trimedItem, value: trimedItem };
    });
  }
  return arrayOfObjects;
};

export const stringToArray = (string) => {
  let array = [];
  if (string && string.length > 0) {
    array = string.split(",").map((item) => item.trim());
  }

  return array;
};

export const getArrayFromValue = (val) => {
  let array = "";
  if (!!val) {
    array = val.split(",").map((item) => {
      return item.trim();
    });
  }
  return array;
};

export const getFormattedValueForRequest = (data) => {
  let obj = { ...data };

  obj.medicalPrecondition = getValueFromArray(data.medicalPrecondition);
  obj.allergies = getValueFromArrayOfObject(data.allergies);
  obj.current_medicine = getValueFromArrayOfObject(data.current_medicine);

  obj.habbits = getValueFromArray(data.habbits);
  obj.otherInfo = getValueFromArrayOfObject(data.otherInfo);

  return obj;
};

export const formattedObjForSetForm = (data) => {
  let obj = { ...data };
  obj.dob = data.dob === null ? data.dob : new Date(data.dob);
  obj.medicalPrecondition = stringToArray(data.medicalPrecondition);
  obj.allergies = valueToArrayOfObject(data.allergies);
  obj.current_medicine = stringToArrayOfObject(data.current_medicine);

  obj.habbits = valueToArrayOfObject(data.habbits);
  obj.otherInfo = valueToArrayOfObject(data.otherInfo);
  return obj;
};
