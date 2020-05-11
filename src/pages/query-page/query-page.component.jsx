import React, {Component} from 'react';
import {Container} from 'reactstrap';
import axios from 'axios';
import Qs from 'qs';
import {withRouter} from 'react-router-dom';
import DocSnapshot from '../../components/doc/doc-snapshot/doc-snapshot.component';
import PageNav from '../../components/page-nav/page-nav.component';
import AdvancedSearchBox from '../../components/search-box/advanced-search-box/advanced-search-box.component';
import DateParser from '../../utils/date-parser.utils'
import TrendModal from '../../components/modal/trend-modal.component';
import * as Constants from '../../constant/application-properties';

/**
 * Query page component. Contains avdvanced searchbox and query results.
 */
class QueryPage extends Component {

    constructor(props) {
        super(props);
        // The embedding variable is set deliberately here, not a duplicated val as the
        // state.embedding. Since the React is stateful, the component will be refreshed
        // every time a relative state is updated. And the embedding results has
        // different parsing method with the non-embedding results. We use the stateless
        // embedding to determine the parse method
        this.embedding = 'OFF';
        this.state = {
            curPage: 0,
            totalPage: -1,
            queryText: '',
            authors: '',
            dateSince: '',
            dateTo: '',
            embedding: 'OFF',
            content: []
        }
    }

    // Call when refreshing or first redirected to this page.
    componentDidMount() {
        // Restore the state using cache
        this.setState({
            curPage: localStorage.hasOwnProperty('curPage')
                ? localStorage.getItem('curPage')
                : 0,
            totalPage: localStorage.hasOwnProperty('totalPage')
                ? localStorage.getItem('totalPage')
                : -1,
            queryText: localStorage.hasOwnProperty('queryText')
                ? localStorage.getItem('queryText')
                : '',
            authors: localStorage.hasOwnProperty('authors')
                ? localStorage.getItem('authors')
                : [],
            dateSince: localStorage.hasOwnProperty('dateSince')
                ? localStorage.getItem('dateSince')
                : '',
            dateTo: localStorage.hasOwnProperty('dateTo')
                ? localStorage.getItem('dateTo')
                : '',
            embedding: localStorage.hasOwnProperty('embedding')
                ? localStorage.getItem('embedding')
                : 'OFF'
        }, () => {
            this.embedding = this.state.embedding;
            // send request to the backend in embedding mode
            if (this.state.embedding === 'ON') {
                axios
                    .get(`${Constants.SEVER_URL}/${Constants.QUERY_URL}/${Constants.EMBEDDING_QUERY}`, {
                    params: {
                        query: this.state.queryText
                    }
                })
                    .then(response => response.data)
                    .then(response => {
                        this.setState({content: response, totalPage: -1});
                    });
            // send request to the backend in normal mode
            } else {
                console.log('curPage after refresh:' + this.state.curPage);
                axios.get(`${Constants.SEVER_URL}/${Constants.QUERY_URL}/${Constants.NORMAL_QUERY}`, {
                    params: {
                        text: this.state.queryText,
                        authors: this.state.authors,
                        dateSince: this.state.dateSince,
                        dateTo: this.state.dateTo,
                        page: this.state.curPage
                    },
                    paramsSerializer: function (params) {
                        return Qs.stringify(params, {arrayFormat: 'repeat'})
                    }
                })
                    .then(response => response.data)
                    .then(response => {
                        this.setState({content: response.content, totalPage: response.totalPages});
                    })
            }

        });

    }

    // function to cache current state
    localStore = () => {
        localStorage.setItem('dateSince', this.state.dateSince);
        localStorage.setItem('queryText', this.state.queryText);
        localStorage.setItem('dateTo', this.state.dateTo);
        localStorage.setItem('embedding', this.state.embedding);
        localStorage.setItem('authors', this.state.authors);
        localStorage.setItem('curPage', this.state.curPage);
    }

    // handle user datesince input
    handleDateSinceChange = (date) => {
        date = DateParser.parseDate(date._d.toISOString());
        this.setState({
            dateSince: date
        }, () => {
            console.log(this.state.dateSince);
        });
    }

    // handle user dateto input
    handleDateToChange = (date) => {
        date = DateParser.parseDate(date._d.toISOString());
        this.setState({
            dateTo: date
        }, () => {
            console.log(this.state.dateTo);
        });
    }

    // handle user search mode input
    handleEmbeddingChange = (event) => {
        this.setState({
            embedding: event.target.value
        }, () => {
            console.log('embedding: ' + this.state.embedding)
        });
    }

    // handle the text query input 
    handleTextChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(name + ':' + value);
        });
    }

    // handle the authors input, split them by ','
    handleAuthorsChange = (event) => {
        const authors = event
            .target
            .value
            .split(',');
        const authorsList = [];
        authors.map(author => authorsList.push(author));
        this.setState({authors: authorsList});
    }

    // submit the query 
    handleSubmit = (event) => {
        // prevent refresh page, only forcus on content state change
        event.preventDefault();
        // store the current user query into cache
        this.localStore();
        if (this.state.embedding === 'ON') {
            this.embedding = 'ON';
            axios
                .get(`${Constants.SEVER_URL}/${Constants.QUERY_URL}/${Constants.EMBEDDING_QUERY}`, {
                params: {
                    query: this.state.queryText
                }
            })
                .then(response => response.data)
                .then(response => {
                    this.setState({content: response, totalPage: -1});
                })
                .then(() => console.log(this.state.content));
        } else {
            this.embedding = 'OFF';
            axios.get(`${Constants.SEVER_URL}/${Constants.QUERY_URL}/${Constants.NORMAL_QUERY}`, {
                params: {
                    text: this.state.queryText,
                    authors: this.state.authors,
                    dateSince: this.state.dateSince,
                    dateTo: this.state.dateTo,
                    page: 0
                },
                paramsSerializer: function (params) {
                    return Qs.stringify(params, {arrayFormat: 'repeat'})
                }
            })
                .then(response => response.data)
                .then(response => {
                    this.setState({content: response.content, totalPage: response.totalPages});
                })
                .then(() => console.log(this.state.content));
        }

    }

    // every time user page navigate, it will call the backend to fetch the res in a certain page
    handleNav = (event, pagenum) => {
        if (pagenum === -1) {
            pagenum = this.state.curPage - 1;
        } else if (pagenum === -2) {
            pagenum = this.state.curPage + 1;
        }
        if (pagenum < 0 || pagenum > this.state.totalPage) 
            return;

        if (this.state.embedding === 'ON') {
            this.embedding = 'ON';
            axios
                .get(`${Constants.SEVER_URL}/${Constants.QUERY_URL}/${Constants.EMBEDDING_QUERY}`, {
                params: {
                    query: this.state.queryText
                }
            })
                .then(response => response.data)
                .then(response => {
                    this.setState({content: response, totalPage: -1, curPage: pagenum});
                })
                .then(() => console.log(this.state.content));
        } else {
            this.embedding = 'OFF';
            axios.get(`${Constants.SEVER_URL}/${Constants.QUERY_URL}/${Constants.NORMAL_QUERY}`, {
                params: {
                    text: this.state.queryText,
                    authors: this.state.authors,
                    dateSince: this.state.dateSince,
                    dateTo: this.state.dateTo,
                    page: pagenum
                },
                paramsSerializer: function (params) {
                    return Qs.stringify(params, {arrayFormat: 'repeat'})
                }
            })
                .then(response => response.data)
                .then(response => {
                    this.setState({content: response.content, totalPage: response.totalPages, curPage: pagenum});
                })
                .then(() => this.localStore());
        }
    }

    // when user click the result snapshoot title, it will loop through the current results to find the target
    // doc content, then store the content into localStorage which will be fetched on the doc detailed info page.
    handleRedirectDocInfo = (event, docID) => {
        var curDocInfo = '';
        this
            .state
            .content
            .map((docInfo, index) => {
                if (this.embedding === 'ON') {
                    if (index === docID) {
                        curDocInfo = docInfo.covidMeta
                    }
                } else {
                    if (index === docID) 
                        curDocInfo = docInfo
                }
            });

        localStorage.setItem('curDocInfo', JSON.stringify(curDocInfo));
        this
            .props
            .history
            .push({pathname: '/doc'});
    }

    render() {
        return (
            <div>
                <div
                    style={{
                    backgroundImage: "url(" + require("../../assets/img/covid19.jpg") + ")"
                }}
                    className="page-header page-header-xs"
                    data-parallax={true}>
                    <div className="filter"/>
                    <div className="motto text-center">
                        <h1 >
                            COVID-19 Advanced Search
                        </h1>
                    </div>
                </div>
                <div>
                    <AdvancedSearchBox
                        handleTextChange={this.handleTextChange}
                        handlesubmit={this.handleSubmit}
                        handleDateSinceChange={this.handleDateSinceChange}
                        handleDateToChange={this.handleDateToChange}
                        handleEmbeddingChange={this.handleEmbeddingChange}
                        handleAuthorsChange={this.handleAuthorsChange}
                        states={this.state}/>
                </div>
                <div>
                    <Container >
                        {this.embedding === 'ON' && <TrendModal title={this.state.queryText}/>}

                        {this
                            .state
                            .content
                            .map((docinfo, index) => (<DocSnapshot
                                key={index}
                                ID={index}
                                info={docinfo}
                                embedding={this.embedding}
                                handleRedirectDocInfo={this.handleRedirectDocInfo}/>))
}
                        <br/><br/>
                        <PageNav
                            totalPage={this.state.totalPage}
                            curPage={this.state.curPage}
                            handleNav={this.handleNav}/>
                    </Container>
                </div>

            </div>
        );
    }
}

export default withRouter(QueryPage);