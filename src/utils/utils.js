// возвращает true, если данная значение(val) находится в данной строке/массиве (list)
export const hasInList = (list, val) => {
    if(list.indexOf(val) !== -1){
        return true
    } else {
        return false
    }
}


// возвращает спец слово с паролем, если в данном списке оно есть (например: /12345678 или /gf8dfdg9)
// иначе null
export const getPassExprByList = (specWords) => {
    let res = null
    specWords.forEach(word => {
        if(isPassExpr(word)){
            res = word
        }
    })
    return res
}


// возвращает true, если данное спец слов это пароль (например: /12345678 или /gf8dfdg9)
export const isPassExpr = (specWord) => {
    let res = false
    if(specWord.length >= 9){
        res = true
    }
    return res
}