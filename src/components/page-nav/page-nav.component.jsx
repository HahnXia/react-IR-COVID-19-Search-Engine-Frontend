import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

/**
 * The page navigation component appearing at the bottom of the page in NON-Embedding mode.
 * @param {*} param0 
 */
const PageNav = ({curPage, totalPage, handleNav}) => {
    // since the index starts from 0, for navigation, the first page is '1', so we plus 1 here.
    curPage = curPage + 1;
    const pageNumbers = [];

    // The following code is responsible for dynamic page number in the nav bar.
    // if the total page number is '-1' which is the initial number, return empty
    if(totalPage <= 0) return <div></div>;
    if (totalPage <= 9) {
        for (let i = 1; i <= totalPage; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (curPage <= 5) {
            for (let i = 1; i <= 9; i++) {
                pageNumbers.push(i);
            }
        } else if (curPage + 4 <= totalPage) {
            for (let i = curPage - 4; i <= curPage + 4; i++) {
                pageNumbers.push(i);
            }
        } else {
            for (let i = totalPage - 8; i <= totalPage; i++) {
                pageNumbers.push(i);
            }
        }
    }

    // generate nav component for each page
    const items = [];
    pageNumbers.map(pagenum => {
        if (pagenum !== curPage) {
            items.push(
                <PaginationItem key={pagenum}>
                    <PaginationLink href="#pablo" onClick={e => handleNav(e, pagenum - 1)}>
                        {pagenum}
                    </PaginationLink>
                </PaginationItem>
            );
        } else {
            items.push(
                <PaginationItem key={pagenum} className="active">
                    <PaginationLink href="#pablo" onClick={e => handleNav(e, pagenum - 1)}>
                        {pagenum}
                        <span className="sr-only">(current)</span>
                    </PaginationLink>
                </PaginationItem>
            );
        }
    });


    return (
        
        <nav aria-label="...">
            <Pagination>
                <PaginationItem>
                    <PaginationLink href="#pablo" onClick={e => handleNav(e, -1)} tabIndex="-1">
                        Previous
                    </PaginationLink>
                </PaginationItem>
                {items}
                <PaginationItem>
                    <PaginationLink href="#pablo" onClick={e => handleNav(e, -2)}>
                        Next
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </nav>
    );
};

export default PageNav;