import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import DocSnapshot from '../../components/doc/doc-snapshot/doc-snapshot.component';
import PageNav from '../../components/page-nav/page-nav.component';
import AdvancedSearchBox from '../../components/search-box/advanced-search-box/advanced-search-box.component';
import {Container} from 'reactstrap';
import Qs from 'qs';
import DateParser from '../../utils/date-parser.utils'
import TrendModal from '../../components/modal/trend-modal.component';

const SEVER_URL = 'http://localhost:8090';
const QUERY_URL = 'query';
const NORMAL_QUERY = 'query';
const EMBEDDING_QUERY = 'vector';

class QueryPage extends Component {

    constructor(props) {
        super(props);
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

    // only called from the mainpage
    componentDidMount() {
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
            if (this.state.embedding === 'ON') {
                axios
                    .get(`${SEVER_URL}/${QUERY_URL}/${EMBEDDING_QUERY}`, {
                    params: {
                        query: this.state.queryText
                    }
                })
                    .then(response => response.data)
                    .then(response => {
                        this.setState({content: response, totalPage: -1});
                    });
            } else {
                console.log('curPage after refresh:' + this.state.curPage);
                axios.get(`${SEVER_URL}/${QUERY_URL}/${NORMAL_QUERY}`, {
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

    localStore = () => {
        localStorage.setItem('dateSince', this.state.dateSince);
        localStorage.setItem('queryText', this.state.queryText);
        localStorage.setItem('dateTo', this.state.dateTo);
        localStorage.setItem('embedding', this.state.embedding);
        localStorage.setItem('authors', this.state.authors);
        localStorage.setItem('curPage', this.state.curPage);
    }

    handleDateSinceChange = (date) => {
        date = DateParser.parseDate(date._d.toISOString());
        this.setState({
            dateSince: date
        }, () => {
            console.log(this.state.dateSince);
        });
    }

    handleDateToChange = (date) => {
        date = DateParser.parseDate(date._d.toISOString());
        this.setState({
            dateTo: date
        }, () => {
            console.log(this.state.dateTo);
        });
    }

    handleEmbeddingChange = (event) => {
        this.setState({
            embedding: event.target.value
        }, () => {
            // this.embedding = this.state.embedding;
            console.log('embedding: ' + this.state.embedding)
        });
    }

    handleTextChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(name + ':' + value);

        });
    }

    handleAuthorsChange = (event) => {
        const authors = event
            .target
            .value
            .split(',');
        const authorsList = [];
        authors.map(author => authorsList.push(author));
        this.setState({authors: authorsList});

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.localStore();
        localStorage.setItem('content', []);
        if (this.state.embedding === 'ON') {
            this.embedding = 'ON';
            axios
                .get(`${SEVER_URL}/${QUERY_URL}/${EMBEDDING_QUERY}`, {
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
            axios.get(`${SEVER_URL}/${QUERY_URL}/${NORMAL_QUERY}`, {
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

    handleNav = (event, pagenum) => {
        if (pagenum === -1) {
            pagenum = this.state.curPage - 1;
        } else if (pagenum === -2) {
            pagenum = this.state.curPage + 1;
        }
        if (pagenum < 0 || pagenum > this.state.totalPage) 
            return;
        console.log(pagenum);
        if (this.state.embedding === 'ON') {
            this.embedding = 'ON';
            axios
                .get(`${SEVER_URL}/${QUERY_URL}/${EMBEDDING_QUERY}`, {
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
            axios.get(`${SEVER_URL}/${QUERY_URL}/${NORMAL_QUERY}`, {
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
                        {this.embedding === 'ON' && <TrendModal title={this.state.queryText}/> }
                        
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