import * as React from "react";
import { connect } from 'react-redux'
import { resetUser } from '../../actions/index.js'


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {
        const { user } = this.props
        return (
            <div>
                <div>*-------------------------*</div>
                <div>Текущий пользователь: {user ? user.name : ''}</div>
                <div>Пароль: {user ? user.pass : ''}</div>
                <div onClick={this.props.resetUser}>{user ? 'LogOut' : ''}</div>
                <div>*-------------------------*</div>
            </div>
        );
    }
}

 // маппинг состояния приложения в свойства компонента-контейнера
 const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { resetUser })(User)