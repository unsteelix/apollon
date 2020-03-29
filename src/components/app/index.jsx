import * as React from "react";
import DB, { cardsRef } from '../../firebase'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
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
            dispatch({
              type: INIT_STORE,
              payload: snapshot.val()
            });
        });
    }

    updateStore(data) {

    }

    componentDidMount() {

        // fetch data from Firebase
        this.fetchData()

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
            Секунды: {this.state.seconds}
            </div>
        );
    }
}