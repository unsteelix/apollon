import * as React from "react";

class TitleCardEdit extends React.Component {
    constructor(props) {
        super(props);

        const { title } = this.props

        this.state = {};

    }

    componentDidUpdate(){

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {             
        const { title } = this.props

        return (
            <div className="card-title">
                <input type="text" value={title} onChange={(e) => {this.props.onTitleChange(e.target.value)}}/>
            </div>
        );
    }
}

export default TitleCardEdit