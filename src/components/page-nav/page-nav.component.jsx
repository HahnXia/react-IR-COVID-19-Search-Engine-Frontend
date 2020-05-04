import React from 'react';
import {Container, Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const PageNav = ({curPage, totalPage, handleNav}) => {
    curPage = curPage + 1;
    const pageNumbers = [];
    if (totalPage <= 9) {
        for (let i = 1; i <= totalPage; i++) {
            pageNumbers.push(i);
        }
    } else {
        // page1 disappear
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
    console.log(totalPage);

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
                <PaginationItem key={pagenum}>
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