import * as React from "react";
import { connect } from 'react-redux'


class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {
        return (
            <div>
                <div>*-------------------------*</div>
                <div>/12345678</div>
                <div>/mar12345</div>
                <div>/help</div>
                <div>/add</div>
                <div>/balbalbalabl</div>
                <div>*-------------------------*</div>
                <div>Кол-во карточек: { Object.keys(this.props.cards).length }</div>
            </div>
        );
    }
}

 // маппинг состояния приложения в свойства компонента-контейнера
 const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)