import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../../actions/index.js'

class Text extends React.Component {
    constructor(props) {
        super(props);

        const { type, text } = this.props.data

        this.state = {
            type: type,
            text: text
        };
    }


    render() {             

        const { text } = this.state

        return (
            <>
            <div className="text-card" >
                {text}
            </div>
            </>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    query: state.query,
    cards: state.cards,
    user: state.user
})


export default connect(mapStateToProps, { setUser, resetQuery, fetchPrivateCards })(Text)