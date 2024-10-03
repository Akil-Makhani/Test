import React from "react";
import ReactPaginate from "react-paginate";
// import "./Pagination.css"; 

const CustomPagination = ({ currentPage, total, onPageChange }) => {
  // const pageCount = Math.ceil(total / 10); // Assuming 10 items per page

  const handlePageClick = (event) => {
    onPageChange(event.selected + 1); // react-paginate uses 0-based index
  };

  return (
    <ReactPaginate
      pageCount={total}
      forcePage={currentPage - 1} // Keep the active page in sync with currentPage

      pageRangeDisplayed={3} // Number of pages to show around the current page
      marginPagesDisplayed={2} // Number of pages to show at the start and end
      onPageChange={handlePageClick}
      containerClassName={"pagination flex items-center"}
      pageClassName={"page-item text-black w-10 h-10 rounded-full m-0"}
      pageLinkClassName={"page-link bg-transparent p-1 text-center"}
      activeClassName={"active text-white bg-black"}
      previousClassName={"previous text-sm"}
      nextClassName={"next text-sm"}
      breakClassName={"break-me"}
    />
  );
};

export default CustomPagination;
