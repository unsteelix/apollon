import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../actions/index.js'


/*     admin card     */
import Help from './cards/Help.jsx'
import User from './cards/User.jsx'
import Auth from './cards/Auth.jsx'

/*     users card     */
import Text from './cards/Text.jsx'
import TextEdit from './cards/TextEdit.jsx'



/*     utils          */
import LockScreen from './LockScreen.jsx'
import LockForEdit from './LockForEdit.jsx'

import TagsCardEdit from './TagsCardEdit.jsx'
import TagsCard from './TagsCard.jsx'
import TitleCardEdit from './TitleCardEdit.jsx'
import TitleCard from './TitleCard.jsx'

import SettingsCard from './SettingsCard.jsx'


class Card extends React.Component {
    constructor(props) {
        super(props);

        const { cardId, data, pass, title, tags, style, userId, editAll, showAll } = this.props.data
        const type = data.type;
        const { mode = 'view' } = this.props

        this.state = {
            mode: mode,    // view, edit
            class: '',     // '', show

            /*        card data      */
            cardId: cardId,
            type: type,
            data: data,   // card data for specific type
            pass: pass,

            title: title,
            tags: tags,
            style: style,
            userId: userId,
            editAll: editAll,
            showAll: showAll

        };



        this.switchMode = this.switchMode.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.onSettingsChange = this.onSettingsChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
    }


    componentDidMount() {
        setTimeout(()=>{
            this.setState({class: 'show'})
        }, 1)
    }

    componentWillUnmount() {

    }

    // если вызвать без аргументов то переключает текущий режим
    // если вызвать с конкретным режимом, то переключает на него
    switchMode(mode){
        if(mode === 'view' || mode === 'edit'){
            this.setState({
                mode: mode
            })
        } else {
            this.setState(state => {
                return  {
                    mode: state.mode === 'view' ? 'edit' : 'view'
                }
            })
        }
    }

    // возвращает карту определенного типа (text, gallery ...) и режиму (view, edit)
    // mode - опционально
    getCardByType(type, mode){
        const editMode = mode === 'edit' ? true : false

        switch(type){
            
            case 'text':
                if(editMode){
                    return TextEdit
                }
                return Text
            break;
            
            case 'gallery':
                return <div>Карточка с типом Gallery</div>
            break;
            
            case 'dsf':
                return 'sdfdsf'
            break;
            
            default:
                return <div>Карточка с таким типом не найдено</div>
            break;

        }
    }

    onTitleChange(newTitle){
        this.setState({
            title: newTitle
        })    
    }

    onDataChange(newData){
        this.setState({
            data: newData
        })
    }

    onSettingsChange(newSettings){
        console.log(newSettings)
        this.setState({
            ...newSettings
        })
    }

    onTagsChange(newTags){
        console.log(newTags)
        this.setState({
            tags: newTags
        })        
    }


    render() {
        const { pass, mode, cardId, type, title, data, tags, userId, showAll, editAll, style } = this.state

        //const canShow = showAll || (this.props.user && userId === this.props.user.userId) ? true : false // TODO: возможно упразднить

        const TitleElement = mode === 'edit' ? TitleCardEdit : TitleCard
        const CardElement = this.getCardByType(type, mode)
        const TagsElement = mode === 'edit' ? TagsCardEdit : TagsCard

        const settings = {
            style: style,
            pass: pass,
            showAll: showAll,
            editAll: editAll,
            cardId: cardId
        }

        const otherData = {
            title: title,
            data: data,
            tags: tags,
            userId: userId   
        }

        return (
            <LockScreen pass={pass} >
                <div className={`card ${this.state.mode}-mode ${this.state.class}`} id={cardId} onDoubleClick={this.switchMode} >
                    <LockForEdit userId={userId} editAll={editAll} mode={mode}>
                        <style type="text/css">{style}</style>
                        <TitleElement title={title} onTitleChange={this.onTitleChange} />
                        <div className="card-body">
                            <CardElement data={data} onDataChange={this.onDataChange} />
                        </div>
                        <TagsElement tags={tags} onTagsChange={this.onTagsChange} />
                        {mode === 'edit' && <SettingsCard settings={settings} otherData={otherData} onSettingsChange={this.onSettingsChange} />}
                    </LockForEdit>
                </div>
            </LockScreen>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    query: state.query,
    cards: state.cards,
    user: state.user
})


export default connect(mapStateToProps, { setUser, resetQuery, fetchPrivateCards })(Card)