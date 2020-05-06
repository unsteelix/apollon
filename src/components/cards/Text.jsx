import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../../actions/index.js'
import { hasInList, getPassExprByList, rawDataObjToStr, parseRawInputText } from '../../utils/utils'
import Help from './Help.jsx'
import User from './User.jsx'
import { isThisTypeNode, getAllJSDocTagsOfKind } from "typescript";
import { cardsRef } from '../../firebase'
import AuthCard from './Auth.jsx'

class Text extends React.Component {
    constructor(props) {
        super(props);

        const { type, text } = this.props.data

        this.state = {
            type: type,
            text: text
        };
    }

    componentDidUpdate(){

    }

    componentDidMount() {

    }

    componentWillUnmount() {

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