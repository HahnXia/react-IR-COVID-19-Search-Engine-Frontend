import React from 'react';
import {Container} from "reactstrap";

import SimpleSearchBox from '../../components/search-box/simple-search-box/simple-search-box.component';

/**
 * The main/index page
 */
function MainPage() {

    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth < 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform = "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });

    return (
        <div>
            <div
                style={{
                backgroundImage: "url(" + require("../../assets/img/covid19.jpg") + ")"
            }}
                ref={pageHeader}
                className="page-header"
                data-parallax={true}>
                <div className="filter"/>
                <Container>
                    <div className="motto text-center">
                        <h1>COVID-19 Seach Engine</h1>
                        <h3>Start your general search from here.</h3>
                        <SimpleSearchBox/>
                    </div>
                </Container>
            </div>
        </div>
    )

}

export default MainPage;