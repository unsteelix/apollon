import * as React from "react";

class TitleCard extends React.Component {
    constructor(props) {
        super(props);

        const { title } = this.props

        this.state = {
            title: title
        };

    }

    componentDidUpdate(){

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {             
        const { title } = this.state

        return (
            <>
            {title && <div className="card-title">{title}</div>}
            </>
        );
    }
}

export default TitleCard