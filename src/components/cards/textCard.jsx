import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../../actions/index.js'
import { hasInList, getPassExprByList, rawDataObjToStr, parseRawInputText } from '../../utils/utils'
import Help from './help.jsx'
import User from './user.jsx'
import { isThisTypeNode, getAllJSDocTagsOfKind } from "typescript";
import { cardsRef } from '../../firebase'
var sass = require('sass');

class TextCard extends React.Component {
    constructor(props) {
        super(props);

        const { cardId, title, data, tags, userId, style, pass='', showAll=false, editAll=false } = this.props.data
        
        this.state = {
            rawInputText: rawDataObjToStr(this.props.data),
            editMode: false,
            cardId: cardId,
            title: title,
            text: data.text,
            tags: tags,
            userId: userId,
            style: style,
            pass: pass,
            showAll: showAll,
            editAll: editAll,
            showLockScreen: pass ? true : false,
            lockScreenInput: '',
            userHasAccessToEdit: editAll || (this.props.user && userId === this.props.user.userId)
        };



        this.switchMode = this.switchMode.bind(this);
        this.onTextareaChange = this.onTextareaChange.bind(this);
        this.updateButton = this.updateButton.bind(this);
        this.saveCardToDB = this.saveCardToDB.bind(this);
        this.showAllButton = this.showAllButton.bind(this);
        this.editAllButton = this.editAllButton.bind(this);
        this.onPassInputChange = this.onPassInputChange.bind(this);
        this.onLockScreenInputChange = this.onLockScreenInputChange.bind(this);
        this.unlock = this.unlock.bind(this);
        this.onStyleTextareaChange = this.onStyleTextareaChange.bind(this);
        this.sassToCss = this.sassToCss.bind(this);
    }

    componentDidUpdate(){

    }

    componentDidMount() {
        /*
        $(`#${this.state.cardId}`).dblclick(() => {
            console.log('1111')
            //$('textarea', `#${this.state.cardId}`).trigger("focus");
        })
        */
    }

    componentWillUnmount() {

    }

    // если вызвать без аргументов то переключает текущий режим
    // если вызвать с конкретным режимом, то переключает на него
    switchMode(mode){
        if(mode){               // editMode | viewMode
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

    onPassInputChange(e){
        const pass = e.target.value.trim()
        this.setState({pass: pass})
    }

    onLockScreenInputChange(e){
        const lockScreenInput = e.target.value.trim()

        this.setState({
            lockScreenInput: lockScreenInput
        })

        if(lockScreenInput === this.state.pass){
            this.unlock()
        }
    }

    unlock(){
        this.setState({
            showLockScreen: false
        })
    }

    showAllButton(){
        this.setState({showAll: this.state.showAll ? false : true})
    }

    editAllButton(){
        this.setState({editAll: this.state.editAll ? false : true})
    }



    updateButton(){
        
        let card = {
            cardId: this.state.cardId,
            title: this.state.title,
            tags: this.state.tags || {},
            data: { 
                text: this.state.text
            },
            style: this.state.style,
            userId: this.state.userId,
            pass: this.state.pass,
            showAll: this.state.showAll,
            editAll: this.state.editAll
        }
        let res = this.saveCardToDB(card)

        res.then(result => {
            console.log('Card successfully updated')
            this.switchMode()
        })
        .catch(e => {
            console.log('Error. Card NOT updated: ', e)
        })
    }

    saveCardToDB(card){
        const cardId = card.cardId;
        delete card.cardId

        return cardsRef.child(cardId).set(card);
    }

    onStyleTextareaChange(){
        let style = e.target.value

        const { title, text, tags } = parseRawInputText(rawInputText)

        let css = sassToCss()
        console.log(css)
        this.setState((state, props) => {
            return {
                style: style
            }
        })
    }

    sassToCss(source){
        result = sass.renderSync({
            data: source,
            outputStyle: "compact"
        });
        const css = result.css.toString()
        return css
    }





    render() {             

        const notAvailableForEdit = <div className="not-available-for-edit">
            Нет прав для редактирования
        </div>

        const lockScreen = <div className="lock-screen">
            <input type="password" value={this.state.lockScreenInput} onChange={this.onLockScreenInputChange} placeholder={this.state.pass} />
        </div>


        let el
        
        if(this.state.editMode){
            el = <>
                <textarea value={this.state.rawInputText} onChange={this.onTextareaChange} cols="48" />
                <div className="edit-block">
                    <div className="update-button" onClick={this.updateButton} >Update in FB</div>
                    <div className="show-all-toggle" onClick={this.showAllButton}>showAll{this.state.showAll ? '*' : ''}</div>
                    <div className="edit-all-toggle" onClick={this.editAllButton}>editAll{this.state.editAll ? '*' : ''}</div>
                    <div className="pass-input">
                        <input type="password" value={this.state.pass} onChange={this.onPassInputChange} />
                    </div>
                    <div className="style-input">
                        <textarea value={this.state.styleInput} onChange={this.onStyleTextareaChange} cols="48" ></textarea>
                    </div>
                </div>
            </>
            el = this.state.showLockScreen ? lockScreen : el
            el = this.state.userHasAccessToEdit ? el : notAvailableForEdit
        } else {
            const { title, text, tags } = this.state
            let tagsStr = ''
            for(let key in tags){
                const tag = tags[key]
                tagsStr += `#${tag} `
            }

            el = <>
                {title ? <div className="card-title">{title}</div> : ''}
                {this.state.showLockScreen ? lockScreen : <div className="card-text">{text}</div>}
                {tagsStr ? <div className="card-tags">{tagsStr}</div> : ''}
            </>
        }

        return (
            <div className={`text-card${this.state.editMode ? " edit-mode" : " view-mode"}`} onDoubleClick={ () => this.switchMode() } >
                {el}
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


export default connect(mapStateToProps, { setUser, resetQuery, fetchPrivateCards })(TextCard)