import * as React from "react";

class TitleCardEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {             
        const { title = '' } = this.props
        const str = title.trim()

        return (
            <div className="card-title">
                <input type="text" value={str} onChange={(e) => {this.props.onTitleChange(e.target.value)}}/>
            </div>
        );
    }
}

export default TitleCardEdit