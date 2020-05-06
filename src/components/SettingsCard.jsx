import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../actions/index.js'


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
            disableUpdateButton: false
        };


        this.onStyleTextareaChange = this.onStyleTextareaChange.bind(this);
        this.onPassInputChange = this.onPassInputChange.bind(this);
        this.showAllButton = this.showAllButton.bind(this);
        this.editAllButton = this.editAllButton.bind(this);
        this.onSettingsChange = this.props.onSettingsChange;

        this.onUpdateButton = this.onUpdateButton.bind(this);
    }


    onPassInputChange(e){
        const pass = e.target.value.trim()
        this.setState({pass: pass})
        this.onSettingsChange({
            pass: pass
        })
    }

    showAllButton(){
        const showAll = this.state.showAll ? false : true
        this.setState({showAll: showAll})
        this.onSettingsChange({
            showAll: showAll
        })
    }

    editAllButton(){
        const editAll = this.state.editAll ? false : true
        this.setState({editAll: editAll})
        this.onSettingsChange({
            editAll: editAll
        })
    }

    onStyleTextareaChange(e){
        const style = e.target.value
        this.setState({style: style})
        this.onSettingsChange({
            style: style
        })
    }

    onUpdateButton(){

        const { style, pass, showAll, editAll, cardId } = this.props.settings
        const { title, data, tags, userId } = this.props.otherData

        const cards = {
            [cardId]: {
                title: title,
                data: data,
                tags: tags,
                userId: userId, 

                editAll: editAll,
                showAll: showAll,
                pass: pass,
                style: style
            }
        }

        this.setState({disableUpdateButton: true})
        this.props.updateCards(cards)        
        .then(() => {
            this.setState({disableUpdateButton: false})
        })
    }




    render() {  
        const { style, pass, showAll, editAll, cardId } = this.props.settings    
        const { disableUpdateButton } = this.state  
        return (
            <div className="settings-block">
                <div className="row-1">
                    <div className={`update-button${disableUpdateButton ? " disabled" : ""}`} onClick={this.onUpdateButton}>
                        {disableUpdateButton ? "Loading..." : "Update"}
                    </div>
                    <div className="show-all-toggle" onClick={this.showAllButton}>showAll{showAll ? '*' : ''}</div>
                    <div className="edit-all-toggle" onClick={this.editAllButton}>editAll{editAll ? '*' : ''}</div>
                    <div className="pass-input">
                        <input type="password" value={pass} onChange={this.onPassInputChange} />
                    </div>
                </div>
                <div className="row-2">
                    <div className="style-input">
                        <textarea value={style.trim().length > 0 ? style : `#${cardId}{}`} onChange={this.onStyleTextareaChange} cols="48" />
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