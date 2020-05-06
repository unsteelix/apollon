import { UPDATE_CARDS, FETCH_PUBLIC_CARDS, FETCH_PRIVATE_CARDS } from '../utils/actionTypes'
import { cardsRef } from '../firebase'


export const fetchPublicCards = () => async dispatch => {
    cardsRef.orderByChild("showAll").equalTo(true).on("value", snapshot => {
        dispatch({
            type: FETCH_PUBLIC_CARDS,
            data: snapshot.val()
        });
    });
};

export const fetchPrivateCards = (userId) => async dispatch => {
    cardsRef.orderByChild("userId").equalTo(userId).on("value", snapshot => {
        dispatch({
            type: FETCH_PRIVATE_CARDS,
            data: snapshot.val()
        });
    });
};

export const updateCards = (cards) => dispatch => {
    return cardsRef.update(cards)
    .then((res) => {
        dispatch({
            type: UPDATE_CARDS,
            data: cards
        })
    })
}



export const addCard = newToDo => async dispatch => {
    //todosRef.push().set(newToDo);
};

export const deleteCard = completeToDo => async dispatch => {
    //todosRef.child(completeToDo).remove();
};