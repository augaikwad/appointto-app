import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  pageTitle: {
    display: "flex",
    alignItems: "center",
    "& > .title": {
      flex: 1,
    },
  },
  ListContainer: {
    padding: 10,
    background: "#ededed",
  },
  tr: {
    borderBottom: "16px solid #ededed !important",
  },
  td: {
    background: "#fff",
    padding: "5px 10px !important",
    "&.actions > button:not(:first-child)": {
      marginLeft: 14,
    },
  },
});

const ListPage = (props) => {
  const classes = useStyles();
  const {
    pageTitle = "List",
    pageActions = null,
    pageTitleClass = "",
    children,
  } = props;

  return (
    <>
      <div className={`${classes.pageTitle} ${pageTitleClass}`}>
        {pageTitle && typeof pageTitle === "string" ? (
          <h6 className={`title`}>{pageTitle}</h6>
        ) : (
          pageTitle
        )}
        {pageActions && pageActions}
      </div>
      {children && (
        <div
          className="mt-2 p-3"
          style={{ background: "#EDEDED", minHeight: 140 }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ListPage;
