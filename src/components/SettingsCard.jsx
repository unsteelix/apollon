import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../actions/index.js'
import { getUniqCardId, normalizeCard } from '../utils/utils'
import { defaultCard } from '../utils/const'

class SettingsCard extends React.Component {
    constructor(props) {
        super(props);
        /*
        const { style, pass, showAll, editAll, cardId } = this.props.settings
        const { title, data, tags } = this.props.otherData

        const defaultSettings = {
            style: '',
            pass: '',
            showAll: false,
            editAll: false,
            cardId: ''  // for styling
        }

        this.state = {
            ...defaultSettings,
            ...this.props.settings
        };
        */
        this.state = {
            disableSaveButton: false,
            editAll: this.props.settings.editAll 
        };


        this.onStyleTextareaChange = this.onStyleTextareaChange.bind(this);
        this.onPassInputChange = this.onPassInputChange.bind(this);
        this.showAllButton = this.showAllButton.bind(this);
        this.editAllButton = this.editAllButton.bind(this);
        this.onSettingsChange = this.props.onSettingsChange;

        this.onSaveButton = this.onSaveButton.bind(this);
    }


    onPassInputChange(e){
        const pass = e.target.value.trim()
        this.setState({pass: pass})
        this.onSettingsChange({
            pass: pass
        })
    }

    showAllButton(){
        const showAll = this.props.settings.showAll ? false : true
        this.setState({showAll: showAll})
        this.onSettingsChange({
            showAll: showAll
        })
    }

    editAllButton(){
        const editAll = this.state.editAll ? false : true
        this.setState({editAll: editAll})
        /*
        this.onSettingsChange({
            editAll: editAll
        })
        */
    }

    onStyleTextareaChange(e){
        const style = e.target.value
        this.setState({style: style})
        this.onSettingsChange({
            style: style
        })
    }

    onSaveButton(){

        const { style, pass, showAll, editAll, cardId } = this.props.settings
        const { title, data, tags, userId } = this.props.otherData


        const card = normalizeCard({
            ...this.props.otherData,
            ...this.props.settings,
            editAll: this.state.editAll
        })

        const cards = {
            [cardId]: card
        }

        this.setState({disableSaveButton: true})
        
        if(!cardId){        // cardId не существует => добавление новой карты

            const newCardId = getUniqCardId()
            const newCard = {
                [newCardId]: card
            }
            console.log(newCard)
            this.props.updateCards(newCard)        
            .then(() => {
                this.setState({disableSaveButton: false})
            })

        } else {            // обновление существующей

            this.props.updateCards(cards)        
            .then(() => {
                this.setState({disableSaveButton: false})
            })

        }

    }




    render() {  
        const { style, pass, showAll, editAll, cardId } = this.props.settings    
        const { disableSaveButton } = this.state  
        const saveButton = cardId ? 'Update' : 'Save'

        return (
            <div className="settings-block">
                <div className="row-1">
                    <div className={`save-button${disableSaveButton ? " disabled" : ""}`} onClick={this.onSaveButton}>
                        {disableSaveButton ? "Loading..." : saveButton}
                    </div>
                    <div className="show-all-toggle" onClick={this.showAllButton}>showAll{showAll ? '*' : ''}</div>
                    <div className="edit-all-toggle" onClick={this.editAllButton}>editAll{this.state.editAll ? '*' : ''}</div>
                    <div className="pass-input">
                        <input type="password" value={pass} onChange={this.onPassInputChange} />
                    </div>
                </div>
                <div className="row-2">
                    <div className="style-input">
                        <textarea value={style && style.trim().length > 0 ? style : `#${cardId}{}`} onChange={this.onStyleTextareaChange} cols="48" />
                    </div> 
                </div>
            </div>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    //query: state.query,
    //cards: state.cards,
    //user: state.user
})


export default connect(mapStateToProps, { setUser, resetQuery, fetchPrivateCards, updateCards })(SettingsCard)