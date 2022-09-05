export const applyGlobalContextMiddleware = (dispatch, history) => (action) => {
  const processAction = (action) => {
    switch (action.type) {
      default:
        dispatch(action);
    }
  };

  return processAction(action);
};
