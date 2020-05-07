import * as React from "react";

class TagsCardEdit extends React.Component {
    constructor(props) {
        super(props);

        this.strToArray = this.strToArray.bind(this);
    }

    // конвертируем строку в массив тегов
    strToArray(str){
        return str.split(',').map(tag => {
            return tag.trim()
        })
    }


    render() {             
        let { tags = [] } = this.props

        let str = ''
        if(tags.length == 1){
            str = tags[0]
        } else if(tags.length >= 2) {
            str = tags[0]
            tags = tags.slice(1) // remove first el
            tags.forEach(tag => {
                str += `, ${tag}`.trim()
            });        
        }
        str = str.trim()

        return (
            <div className="card-tags">
                <input type="text" value={str} onChange={(e) => {this.props.onTagsChange(this.strToArray(e.target.value))}}/>
            </div>
        );
    }
}

export default TagsCardEdit