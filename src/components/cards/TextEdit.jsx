import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../../actions/index.js'
import { hasInList, getPassExprByList, rawDataObjToStr, parseRawInputText } from '../../utils/utils'


class TextEdit extends React.Component {
    constructor(props) {
        super(props);

        const { type, text } = this.props.data

        this.state = {
            type: type,
            text: text
        };



        this.onTextareaChange = this.onTextareaChange.bind(this);
    }



    onTextareaChange(e){
        const text = e.target.value

        this.props.onDataChange({
            type: 'text',
            text: text
        })
    }


    render() {          
        const { text } = this.props.data
        return (
            <div className="text-card" >
                <textarea value={text} onChange={this.onTextareaChange} cols="48" />
            </div>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    query: state.query,
    cards: state.cards,
    user: state.user
})


export default connect(mapStateToProps, { setUser, resetQuery, fetchPrivateCards })(TextEdit)