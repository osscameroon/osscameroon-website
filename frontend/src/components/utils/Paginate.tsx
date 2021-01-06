import React, {Fragment, useEffect, useState} from "react";
import {PaginationChangeEventData} from "../../utils/types";

type PaginateProps = {
  totalRecords: number;
  pageLimit: number;
  pageNeighbours: number;
  onPageChanged: (page: PaginationChangeEventData) => void;
}
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};


/**
 * Let's say we have 10 pages and we set pageNeighbours to 2
 * Given that the current page is 6
 * The pagination control will look like the following:
 *
 * (1) < {4 5} [6] {7 8} > (10)
 *
 * (x) => terminal pages: first and last page(always visible)
 * [x] => represents current page
 * {...x} => represents page neighbours
 */
const fetchPageNumbers = (totalPages: number, currentPage: number, pageNeighbours: number) => {
  /**
   * totalNumbers: the total page numbers to show on the control
   * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
   */
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    let pages: Array<string|number> = range(startPage, endPage);

    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      // handle: (1) < {5 6} [7] {8 9} (10)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }

      // handle: (1) {2 3} [4] {5 6} > (10)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }

      // handle: (1) < {4 5} [6] {7 8} > (10)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
};
/**
 * @see https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react
 */
const  Paginate = ({ totalRecords = 0, pageLimit = 30, pageNeighbours = 0, onPageChanged }: PaginateProps) =>  {
  const [currentPage, setCurrentPage] = useState(1);

  // pageNeighbours can be: 0, 1 or 2
  let pageNeighboursValue = Math.max(0, Math.min(pageNeighbours, 2));

  let totalPages = Math.ceil(totalRecords / pageLimit);

  useEffect(() => {
    gotoPage(1);
  }, []);

  const gotoPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData: PaginationChangeEventData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords,
    };

    setCurrentPage(currentPage);
    onPageChanged(paginationData)
  };

  const handleClick = (page: number|string) => (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    gotoPage(page as number);
  };

  const handleMoveLeft = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighboursValue * 2 - 1);
  };

  const handleMoveRight = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighboursValue * 2 + 1);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers(totalPages, currentPage, pageNeighboursValue);

  return (
    <Fragment>
      <nav aria-label="Items Paginate">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );

            return (
              <li key={index} className={`page-item${currentPage === page ? " active" : ""}`}>
                <a className="page-link" href="#" onClick={handleClick(page)}>
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </Fragment>
  );
}

export default Paginate;
