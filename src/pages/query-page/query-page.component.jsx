import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import DocSnapshot from '../../components/doc/doc-snapshot/doc-snapshot.component';
import PageNav from '../../components/page-nav/page-nav.component';
import AdvancedSearchBox from '../../components/search-box/advanced-search-box/advanced-search-box.component';
import {Container} from 'reactstrap';

const SEVER_URL = 'http://localhost:8090';
const QUERY_URL = 'query'

class QueryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curPage: 0,
            totalPage: -1,
            queryText: '',
            author: '',
            dateSince: '',
            dateTo: '',
            embedding: false,
            content: []
        }
    }

    // only called from the mainpage
    componentDidMount() {
        // the origin pass param from the 'location.search' field starts with '?', get
        // rid of it
        const text = this
            .props
            .location
            .search
            .substring(6);

        axios
            .get(`${SEVER_URL}/${QUERY_URL}/text`, {
            params: {
                text: text,
                page: this.state.curPage
            }
        })
            .then(response => response.data)
            .then(response => {
                this.setState({queryText: text, content: response.content, totalPage: response.totalPages});
            });
    }

    localStore = () => {
        localStorage.setItem('dateSince', this.state.dateSince);
        localStorage.setItem('queryText', this.state.queryText);
        localStorage.setItem('dateTo', this.state.dateTo);
        localStorage.setItem('embedding', this.state.embedding);
        localStorage.setItem('author', this.state.author);
        console.log(localStorage.getItem('queryText'));
    }

    handleDateSinceChange = (date) => {
        this.setState({
            dateSince: date._d
        }, () => {
            console.log(this.state.dateSince);
        });

    }
    handleDateToChange = (date) => {
        this.setState({
            dateTo: date._d
        }, () => {
            console.log(this.state.dateTo);

        });
    }

    handleEmbeddingChange = (event) => {

        this.setState({
            embedding: !this.state.embedding
        }, () => {
            console.log(this.state.embedding);

        })
    }

    handelTextChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(name + ':' + value);

        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.localStore();
        axios
            .get(`${SEVER_URL}/${QUERY_URL}/text`, {
            params: {
                text: this.state.queryText,
                author: this.state.author,
                dateSince: this.state.dateSince,
                dateTo: this.state.dateTo,
                embedding: this.state.embedding,
                page: this.state.curPage
            }
        })
            .then(response => response.data)
            .then(response => this.setState({
                content: response.content,
                totalPage: response.totalPages,
                queryText: localStorage.getItem('queryText'),
                author: localStorage.getItem('author'),
                dateSince: localStorage.getItem('dateSince'),
                dateTo: localStorage.getItem('dateTo'),
                curPage: 0,
                embedding: localStorage.getItem('embedding')
            }));
    }

    handleNav = (event, pagenum) => {
        if (pagenum === -1) {
            pagenum = this.state.curPage - 1;
        } else if (pagenum === -2) {
            pagenum = this.state.curPage + 1;
        }
        if (pagenum < 0 || pagenum > this.state.totalPage) 
            return;
        event.preventDefault();
        console.log(pagenum);
        this.localStore();
        this.setState({
            curPage: pagenum
        }, () => axios.get(`${SEVER_URL}/${QUERY_URL}/text`, {
            params: {
                text: this.state.queryText,
                author: this.state.author,
                dateSince: this.state.dateSince,
                dateTo: this.state.dateTo,
                embedding: this.state.embedding,
                page: this.state.curPage
            }
        }).then(response => response.data).then(response => this.setState({
            content: response.content,
            totalPage: response.totalPages,
            queryText: localStorage.getItem('queryText'),
            author: localStorage.getItem('author'),
            dateSince: localStorage.getItem('dateSince'),
            dateTo: localStorage.getItem('dateTo'),
            curPage: pagenum,
            embedding: localStorage.getItem('embedding')
        })));
    }

    handleRedirectDocInfo = (event, docID) => {
        var curDocInfo = '';
        this
            .state
            .content
            .map((docInfo => {
                if (docInfo.id === docID) 
                    curDocInfo = docInfo
            }));
        console.log(curDocInfo);
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
                        handelTextChange={this.handelTextChange}
                        handlesubmit={this.handleSubmit}
                        handleDateSinceChange={this.handleDateSinceChange}
                        handleDateToChange={this.handleDateToChange}
                        handleEmbeddingChange={this.handleEmbeddingChange}
                        states={this.state}/>
                </div>
                <Container style={{
                    marginTop: '-25px'
                }}>

                    {this
                        .state
                        .content
                        .map(docinfo => (<DocSnapshot
                            key={docinfo.id}
                            info={docinfo}
                            handleRedirectDocInfo={this.handleRedirectDocInfo}/>))
}
                    <br/><br/>
                    <PageNav
                        totalPage={this.state.totalPage}
                        curPage={this.state.curPage}
                        handleNav={this.handleNav}/>
                </Container>

            </div>
        );
    }
}

export default withRouter(QueryPage);