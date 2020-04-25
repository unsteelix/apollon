import * as React from "react";
import { connect } from 'react-redux'
import { setQuery, resetQuery } from '../../actions/index.js'


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputChange = this.inputChange.bind(this);
    }


    componentDidMount() {

    }

    componentWillUnmount() {

    }


    inputChange(e) {
        const text = e.target.value;
        this.props.setQuery(text)
    }



    render() {
        const { user, query } = this.props
        return (
            <div className={`search-input${query.length > 0 ? ' align-top' : ' align-center'}`} >
                {user ? <span>{user.name}</span> : ''}
                <input type="text" value={this.props.query} onChange={ (e) => {this.inputChange(e)}} />
                <div className="clear-button" onClick={ () => this.props.resetQuery() }>clear</div>
            </div>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    query: state.query,
    user: state.user
})


export default connect(mapStateToProps, { setQuery, resetQuery })(Search)