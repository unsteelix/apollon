import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../../actions/index.js'
import { hasInList, getPassExprByList } from '../../utils/utils'
import Help from './help.jsx'
import User from './user.jsx'
import TextCard from './textCard.jsx'


class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.filterCardsByQuery = this.filterCardsByQuery.bind(this);
        this.getTempListCard = this.getTempListCard.bind(this);
        this.getListAdminCard = this.getListAdminCard.bind(this);
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }

    filterCardsByQuery(cards = {}, query) {
        let res = {}

        // парсим строку запроса
        query.trim().toLowerCase()


        // разбираем запрос на слова и избавляемся от пробелов
        let wordsWithSpace = query.split(' ')
        let words = []
        wordsWithSpace.forEach(word => {
            if(word.trim() !== ''){
                words.push(word)
            }        
        })

        // ищем спец слова начинающиеся со /
        let specWords = []
        let usualWords = []
        words.forEach(word => {
            if(word[0] === '/'){
                specWords.push(word)
            } else {
                usualWords.push(word)
            }
        })

        //console.log(specWords, usualWords)

        // есть спец слова
        if(specWords){
            // обрабатываем спец слова в зависимости от приоритета

            // проверяем пароль
            const passExpr = getPassExprByList(specWords)
            if(passExpr){

                const pass = passExpr.slice(1)

                this.fetchUserByPass(pass)
                .then(res => {
                    const status = res.status
                    const data = res.data
                    if(status === "success"){
                        const user = res.data
                        this.logIn(user)
                    } else {
                        console.log(data)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
                
            }  

        }




        for(var cardId in cards){
            let card = cards[cardId]
            if(card.title.toLowerCase().includes(query) || card.data.text.toLowerCase().includes(query)){
                res[cardId] = card
            }
        }

        return res
    }

    fetchUserByPass(pass) {
        const url = `https://us-central1-apollon-71292.cloudfunctions.net/api/pass/${pass}`
        return fetch(url)
        .then(function(response) { return response.json(); })
    }

    logIn(user) {
        this.props.setUser(user)
        this.props.resetQuery()
        
        // подписываемся на изменения в карточках конкретного юзера
        this.props.fetchPrivateCards(user.userId)
    }

    logOut(){
        this.props.resetUser()
    }

    
    getTempListCard() {

        const { query, cards } = this.props

        const cardsFiltered = this.filterCardsByQuery(cards, query)
        const cardIds = Object.keys(cardsFiltered)

        const cardsTemp = cardIds.map(cardId => {
            const card = {
                cardId: cardId,
                ...cardsFiltered[cardId]
            }
            return(            
                <div key={cardId} className="card" id={cardId}>
                    <TextCard data={card} />
                </div>
            )
        })

        const NOT_FOUND = <div>NOT FOUND</div>

        return cardsTemp.length === 0 ? NOT_FOUND : cardsTemp
    }


    getListAdminCard() {
        const { query } = this.props

        // парсим строку запроса
        query.trim().toLowerCase()


        // разбираем запрос на слова и избавляемся от пробелов
        let wordsWithSpace = query.split(' ')
        let words = []
        wordsWithSpace.forEach(word => {
            if(word.trim() !== ''){
                words.push(word)
            }        
        })

        // ищем спец слова начинающиеся со /
        let specWords = []
        let usualWords = []
        words.forEach(word => {
            if(word[0] === '/'){
                specWords.push(word)
            } else {
                usualWords.push(word)
            }
        })

        //console.log(specWords, usualWords)


        let res 

        // есть спец слова
        if(specWords){
            
            res = specWords.map(data => {
                if(hasInList(specWords, '/help')){
                    console.log('Help card')
                    return <Help key="help-card" />
                }    
        
                if(hasInList(specWords, '/user')){
                    console.log('User card')
                    return <User key="user-card" />
                }  
        
                if(hasInList(specWords, '/add')){
                    console.log('Add card')
                }              
            })

        }

        return res
    }


    render() {
        return (
            <div className="cards" >
                {this.getListAdminCard()}
                {this.getTempListCard()}
            </div>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    query: state.query,
    cards: state.cards
})


export default connect(mapStateToProps, { setUser, resetQuery, fetchPrivateCards })(Cards)