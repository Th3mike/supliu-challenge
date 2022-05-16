import React from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

const ContainerPagination = styled.div`
  .pagination {
    margin: 15px auto;
    display: flex;
    list-style: none;
    outline: none;
  }
  .pagination > .active > a {
    background-color: #000000;
    border-color: #000000;
    color: #fff;
  }
  .pagination > li > a {
    border: 1px solid white;
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    background-color: black;
    border-color: #00ff00;
    outline: none;
  }
  .pagination > li > a,
  .pagination > li > span {
    color: white;
  }
  .pagination > li:first-child > a,
  .pagination > li:first-child > span,
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-radius: unset;
  }
`;

export default function Pagination({ handlePageClick, pageCount }) {
  return (
    <ContainerPagination>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        breakLabel={"..."}
        breakClassName={"break-me"}
      />
    </ContainerPagination>
  );
}
