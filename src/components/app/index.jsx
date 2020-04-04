import * as React from "react";
import DB, { cardsRef, usersRef } from '../../firebase'
import { store } from '../../index.jsx'
import { connect } from 'react-redux'
import Search from '../search/index.jsx'
import { bindActionCreators } from 'redux'
import { initStore } from './actionCreators.jsx'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.fetchPrivateCards = this.fetchPrivateCards.bind(this);
    }

   
    fetchData() {

        return 'fdgfdg'
    }

    initStore(data) {
        cardsRef.orderByChild("public").equalTo(true).once("value", snapshot => {
            console.log('1111111111111')
            console.log(snapshot.val())
            this.setState(state => ({
                cards: snapshot.val()
            }));
            this.props.initStore(snapshot.val())
        });
    }

    updateStore(data) {

    }

    componentDidMount() {

        // fetch data from Firebase
        this.initStore()

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    click() {
        let head = document.getElementsByTagName('head')[0]
        $(head).append('<style type="text/css">H1 { font-size: 120%; /* Размер шрифта */font-family: Verdana, Arial, Helvetica, sans-serif; /* Семейство шрифта */color: #336; /* Цвет текста */}</style>')
        console.log(head)
    }

    input(e) {
        let text = e.target.value;
        this.setState(state => ({
            input: text
        }));
        usersRef.orderByChild("pass").equalTo(text).once("value", snapshot => {
            const user = snapshot.val()
            console.log('user', user)
            if(user){
                const userId = Object.keys(user)[0]
                this.setState(state => ({
                    user: {
                        userId: userId,
                        ...user[userId]
                    }
                }));
                this.fetchPrivateCards(userId)
            }
        });
    }

    fetchPrivateCards(userId) {
        console.log(userId)
        cardsRef.orderByChild("userId").equalTo(parseFloat(userId)).on("value", snapshot => {
            const privateCards = snapshot.val()
            console.log('private', privateCards)
            const cards = {
                ...this.state.cards,
                ...privateCards
            }
            console.log(cards)
            this.setState(state => ({
                cards: cards
            }));
            this.props.initStore(cards)
        });
    }

    render() {

        const cards = this.props.cards

        const listCard = Object.keys(cards).map(key => 
            <div key={key}>
                {cards[key].title}
            </div>
        )

        return (
            <div>
                {this.props.user ? this.props.user.name : ''}
                <Search />
                <div>
                    {listCard}
                </div>
                <h1>css title</h1>
                <div onClick={this.click}>
                    css
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

const mapDispatchToProps = dispatch => {
    return {
        initStore: bindActionCreators(initStore, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)