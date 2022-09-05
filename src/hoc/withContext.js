import React from "react";

const withContext =
  (Context, mapStateToProps, mapActionsToProps) => (WrappedComponent) => {
    return function contextComponent(props) {
      return (
        <Context.Consumer>
          {([state, actions]) => (
            <WrappedComponent
              {...{
                ...props,
                ...(mapStateToProps ? mapStateToProps(state) : {}),
                ...(mapActionsToProps ? mapActionsToProps(actions) : {}),
              }}
            />
          )}
        </Context.Consumer>
      );
    };
  };

export default withContext;
