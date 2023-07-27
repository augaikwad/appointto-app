import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  pageDetails: {
    display: "flex",
    alignItems: "center",
    padding: "5px 18px",
    border: "1px solid #ccc",
    borderLeft: "none",
    borderRight: "none",
    "& > b": {
      padding: "0 4px",
    },
  },
});

const getTotalPages = (totalCount, itemsPerPage) => {
  return Math.ceil(totalCount / itemsPerPage);
};

const getPageRange = (currentPage, itemsPerPage, totalCount) => {
  return {
    start_record: (currentPage - 1) * itemsPerPage + 1,
    end_record: Math.min(currentPage * itemsPerPage, totalCount),
  };
};

const ListPagination = ({
  totalCount = 0,
  start,
  end,
  onPaginationChange = () => {},
  itemsPerPage = 10,
}) => {
  const totalPages = getTotalPages(totalCount, itemsPerPage);
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPaginationChange(getPageRange(page, itemsPerPage, totalCount));
  };

  return (
    <Pagination>
      <Pagination.First
        id="First"
        disabled={currentPage === 1}
        onClick={() => {
          handlePageClick(1);
        }}
      />
      <Pagination.Prev
        id="Prev"
        disabled={currentPage === 1}
        onClick={() => {
          handlePageClick(currentPage - 1);
        }}
      />
      <div className={classes.pageDetails}>
        Page <b>{currentPage}</b> of <b>{totalPages}</b>
      </div>
      <Pagination.Next
        id="Next"
        disabled={currentPage === totalPages}
        onClick={() => {
          handlePageClick(currentPage + 1);
        }}
      />
      <Pagination.Last
        id="Last"
        disabled={currentPage === totalPages}
        onClick={() => {
          handlePageClick(totalPages);
        }}
      />
    </Pagination>
  );
};

export default ListPagination;
