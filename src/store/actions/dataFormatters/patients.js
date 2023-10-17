import { initialState } from "../../reducers/patientSlice";

const arrayToString = (array) => {
  let string = "";
  if (Array.isArray(array)) {
    const filteredArray = array.filter((item) => item.checked);
    string = filteredArray.map((obj) => obj.value).join(", ");
  }
  return string;
};

const arrayOfObjectToString = (array) => {
  let string = "";
  if (Array.isArray(array)) {
    string = array.map((obj) => obj.value).join(", ");
  }
  return string;
};

export const formattedObjForPatientSave = (data) => {
  let obj = { ...data };
  obj.medicalPrecondition = arrayToString(data.medicalPrecondition);
  obj.allergies = arrayOfObjectToString(data.allergies);
  obj.current_medicine = arrayOfObjectToString(data.current_medicine);
  obj.habbits = arrayToString(data.habbits);
  obj.otherInfo = arrayOfObjectToString(data.otherInfo);
  return obj;
};

const stringToArray = (string, defaultValue) => {
  let array = [...defaultValue];
  if (string && string.length > 0) {
    let splittedString = string.split(", ");

    let newArray = array.map((item) => {
      if (splittedString.includes(item.value)) {
        return { ...item, checked: true };
      } else {
        return item;
      }
    });

    const result = splittedString.filter(
      (str) => !array.some((obj) => obj.value === str)
    );

    if (result && result.length > 0) {
      result.forEach((val) => {
        newArray.push({
          label: val,
          value: val.replace(/\s/g, "").toLowerCase(),
          checked: true,
        });
      });
    }

    array = newArray;
  }
  return array;
};

const stringToArrayOfObject = (string) => {
  let array = [];
  if (string && string.length > 0) {
    let splittedString = string.split(", ");
    splittedString.forEach((val) => {
      array.push({
        label: val,
        value: val,
      });
    });
  }
  return array;
};

export const formattedObjForPatientForm = (data) => {
  let obj = { ...data };
  const { medicalPrecondition, habbits } = initialState.patientModal.formValue;
  obj.medicalPrecondition = stringToArray(
    data.medicalPrecondition,
    medicalPrecondition
  );
  // obj.allergies = stringToArrayOfObject(data.allergies);
  obj.current_medicine = stringToArrayOfObject(data.current_medicine);
  obj.habbits = stringToArray(data.habbits, habbits);
  obj.otherInfo = stringToArrayOfObject(data.otherInfo);
  return obj;
};
