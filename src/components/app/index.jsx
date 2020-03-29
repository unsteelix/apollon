import * as React from "react";
import DB, { cardsRef } from '../../firebase'
import { store } from '../../index.jsx'
import { connect } from 'react-redux'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cards: {} };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    fetchData() {

        return 'fdgfdg'
    }

    initStore(data) {
        cardsRef.on("value", snapshot => {
            console.log('1111111111111')
            console.log(snapshot.val())
            this.setState(state => ({
                cards: snapshot.val()
            }));
            store.dispatch({
              type: 'INIT_STORE',
              data: snapshot.val()
            });
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

    render() {

        const cards = this.state.cards
        const listCard = Object.keys(cards).map(key => 
            <div key={key}>
                {cards[key].title}
            </div>
        )

        return (
            <div>
                {listCard}
            </div>
        );
    }
}

 // маппинг состояния приложения в свойства компонента-контейнера
 function mapStateToProps (state) {
    return {
        cards: state.cards
    }
}

export default connect(mapStateToProps, null)(App)
