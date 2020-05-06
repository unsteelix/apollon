import * as React from "react";

class TagsCard extends React.Component {
    constructor(props) {
        super(props);

        const { tags } = this.props

        this.state = {
            tags: tags
        };
    }

    componentDidUpdate(){

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {             
        const { tags } = this.state

        let tagsStr = ''
        for(let key in tags){
            const tag = tags[key]
            tagsStr += `#${tag} `
        }

        return (
            <>
            {tagsStr && <div className="card-tags">{tagsStr}</div>}
            </>
        );
    }
}


export default TagsCard