import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../../actions/index.js'
import { hasInList, getPassExprByList } from '../../utils/utils'
import Help from './help.jsx'
import User from './user.jsx'
import { isThisTypeNode } from "typescript";

class TextCard extends React.Component {
    constructor(props) {
        super(props);

        const { title, data, tags, userId, style, pass } = this.props.data
        let tagsStr = '# '
        for(let key in tags){
            let tag = tags[key]
            tagsStr = tagsStr + `${tag}, `
        }

        this.state = {
            rawInputText: `! ${title}\n\n${data.text}\n\n${tagsStr}`,
            editMode: false,
            title: title,
            text: data.text,
            tags: tags
        };



        this.switchMode = this.switchMode.bind(this);
        this.onTextareaChange = this.onTextareaChange.bind(this);
        this.parseText = this.parseText.bind(this);
        this.getTagsFromStr = this.getTagsFromStr.bind(this);
        this.getTitleFromStr = this.getTitleFromStr.bind(this);
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

        const { title, text, tags } = this.parseText(rawInputText)

        this.setState((state, props) => {
            return {
                rawInputText: rawInputText,
                title: title,
                text: text,
                tags: tags
            }
        })
    }

    // парсим текст: вычленяем title, основной текст и теги
    parseText(rawText){
        
        let title = ''
        let text = ''
        let tags = {}

        /*        Title        */
        let sTitle = rawText.match(/^! .*/i)
        if(sTitle){
            title = this.getTitleFromStr(sTitle[0])   // ищем title
            rawText = rawText.replace(/^! .*/i, '')         // убираем title из исходного текста 
        }

        /*        Tags        */
        let sTags = rawText.match(/# .*$/i)
        if(sTags){
            let liatTags = this.getTagsFromStr(sTags[0])   // ищем tags
            rawText = rawText.replace(/# .*$/i, '')      // убираем tags из исходного текста 
            liatTags.forEach((tag, i) => {
                tags[i] = tag
            })
        }

        text = rawText
        console.log({title, tags, text})

        return {
            title: title,
            text: text,
            tags: tags
        }
    }

    // убирает первый символ # и возвращает список тегов
    getTagsFromStr(str){
        str = str.slice(2) // remove #
        return str.split(',').map(tag => {
            return tag.trim()
        })
    }

    // убирает первый символ ! и пробелы
    getTitleFromStr(str){
        str = str.slice(2) // remove !
        return str.trim()
    }


    render() {             

        let el
        
        if(this.state.editMode){
            el = <div>
                <textarea value={this.state.rawInputText} onChange={this.onTextareaChange}/>
            </div>
        } else {
            const { title, text, tags } = this.state
            let tagsStr = ''
            for(let key in tags){
                let tag = tags[key]
                tagsStr = tagsStr + `#${tag} `
            }

            el = <div>
                <div>{title}</div><br/>
                <div>{text}</div><br/>
                <div>{tagsStr}</div>
            </div>
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