export const hasError = (name, errors) => {
  const nameSplit = name.split(".");
  if (nameSplit.length > 0) {
    var hasErr = true;
    var errorObj = errors;
    for (var x = 0; x < nameSplit.length; x++) {
      hasErr = hasErr && Boolean(errorObj[nameSplit[x]]);
      if (!hasErr) break;
      errorObj = errorObj[nameSplit[x]];
    }
    return hasErr ? errorObj : null;
  } else {
    return Boolean(errors[name]);
  }
};
