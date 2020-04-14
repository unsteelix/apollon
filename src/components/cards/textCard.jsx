import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../../actions/index.js'
import { hasInList, getPassExprByList, rawDataObjToStr, parseRawInputText } from '../../utils/utils'
import Help from './help.jsx'
import User from './user.jsx'
import { isThisTypeNode } from "typescript";

class TextCard extends React.Component {
    constructor(props) {
        super(props);

        const { title, data, tags, userId, style, pass } = this.props.data
        
        this.state = {
            rawInputText: rawDataObjToStr(this.props.data),
            editMode: false,
            title: title,
            text: data.text,
            tags: tags
        };



        this.switchMode = this.switchMode.bind(this);
        this.onTextareaChange = this.onTextareaChange.bind(this);
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    // если вызвать без аргументов то переключает текущий режим
    // если вызвать с конкретным режимом, то переключает на него
    switchMode(mode){
        if(mode){               // editMode / viewMode
            if(mode === 'editMode' || mode === 'viewMode'){
                this.setState((state, props) => {
                    return {
                        editMode: mode === 'editMode' ? true : false
                    }
                })
            }
        } else {
            this.setState((state, props) => {
                return {
                    editMode: state.editMode ? false : true
                }
            })
        }
    }

    onTextareaChange(e){
        let rawInputText = e.target.value

        const { title, text, tags } = parseRawInputText(rawInputText)

        this.setState((state, props) => {
            return {
                rawInputText: rawInputText,
                title: title,
                text: text,
                tags: tags
            }
        })
    }






    render() {             

        let el
        
        if(this.state.editMode){
            el = <>
                <textarea value={this.state.rawInputText} onChange={this.onTextareaChange} cols="48" />
            </>
        } else {
            const { title, text, tags } = this.state
            let tagsStr = ''
            for(let key in tags){
                const tag = tags[key]
                tagsStr += `#${tag} `
            }

            el = <>
                {title ? <div className="card-title">{title}</div> : ''}
                <div className="card-text">{text}</div>
                {tagsStr ? <div className="card-tags">{tagsStr}</div> : ''}
            </>
        }

        return (
            <div className="text-card" onDoubleClick={ () => this.switchMode() } >
                {el}
            </div>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    query: state.query,
    cards: state.cards
})


export default connect(mapStateToProps, { setUser, resetQuery, fetchPrivateCards })(TextCard)