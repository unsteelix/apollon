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


// конвертирует raw объект полученный из базы в строку для редактирования в editMode
export const rawDataObjToStr = (rawDataObj) => {
    let str = ''
    
    const { title, data, tags } = rawDataObj
    const text = data.text
    const tagsStr = rawTagsObjToStr(tags)
    const titleStr = rawTitleToStr(title)

    str = `${titleStr}\n\n${text}\n\n${tagsStr}`

    return str
}

// конвертирует raw объект с тегами в строку для редактирования в editMode
export const rawTagsObjToStr = (rawTagsObj = {}) => {
    let str = ''

    const keys = Object.keys(rawTagsObj)
    if(keys){
        keys.forEach((key, i) => {
            let tag = rawTagsObj[key]
            str += ` ${tag}`
            if(i < keys.length - 1){
                str += ','
            }
        })
    }

    return str ? `#${str}` : ''
}

// конвертирует raw title в строку для редактирования в editMode
export const rawTitleToStr = (rawTitle) => {
    
    const title = rawTitle.trim()
    return title ? `! ${title}` : ''
}


// конвертирует raw текст в объект со свойствами: title, text, tags
// иными словами парсит вводимый текст: ищет заголовок, текст и теги 
export const parseRawInputText = (rawText) => {
    
    let title = ''
    let text = ''
    let tags = {}

    /*        Title        */
    let sTitle = rawText.match(/^! .*/i)
    if(sTitle){
        title = getTitleFromStr(sTitle[0])   // ищем title
        rawText = rawText.replace(/^! .*/i, '')         // убираем title из исходного текста 
    }

    /*        Tags        */
    let sTags = rawText.match(/# .*$/i)
    if(sTags){
        let liatTags = getTagsFromStr(sTags[0])   // ищем tags
        rawText = rawText.replace(/# .*$/i, '')      // убираем tags из исходного текста 
        liatTags.forEach((tag, i) => {
            tags[i] = tag
        })
    }

    text = rawText.trim()

    return {
        title: title,
        text: text,
        tags: tags
    }
}

// убирает первый символ # и возвращает список тегов
export const getTagsFromStr = (str) => {
    str = str.slice(2) // remove #
    return str.split(',').map(tag => {
        return tag.trim()
    })
}

// убирает первый символ ! и пробелы
export const getTitleFromStr = (str) => {
    str = str.slice(2) // remove !
    return str.trim()
}