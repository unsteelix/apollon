import * as React from "react";
import { connect } from 'react-redux'
import Search from '../search/index.jsx'
import Cards from '../cards/index.jsx'
import { fetchPublicCards } from '../../actions/index.js'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.click = this.click.bind(this);
    }

    componentDidMount() {
        this.props.fetchPublicCards()
    }

    componentWillUnmount() {

    }



    click() {
        let head = document.getElementsByTagName('head')[0]
        $(head).append('<style type="text/css">H1 { font-size: 120%; /* Размер шрифта */font-family: Verdana, Arial, Helvetica, sans-serif; /* Семейство шрифта */color: #336; /* Цвет текста */}</style>')
        console.log(head)
    }


    render() {
        return (
            <div>
                <Search />
                <Cards />
                <h1>css title</h1>
                <div onClick={this.click}>
                    Update CSS
                </div>
            </div>
        );
    }
}

 // маппинг состояния приложения в свойства компонента-контейнера
 const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        query: state.query,
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchPublicCards })(App)