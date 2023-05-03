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
  obj.dob = data.dob === "" ? data.dob : new Date(data.dob);
  obj.medicalPrecondition = getArrayFromValue(data.medicalPrecondition);
  obj.allergies = valueToArrayOfObject(data.allergies);
  obj.current_medicine = valueToArrayOfObject(data.current_medicine);

  obj.habbits = getArrayFromValue(data.habbits);
  obj.otherInfo = valueToArrayOfObject(data.otherInfo);
  return obj;
};
