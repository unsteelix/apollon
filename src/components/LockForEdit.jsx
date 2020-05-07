import * as React from "react";
import { connect } from 'react-redux'

class LockForEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {             
        const { curUser, userId, editAll, mode } = this.props
        const canEdit = editAll === true || (curUser && curUser.userId === userId) ? true : false
        const show = mode === 'edit'  // lock screen show only in 'edit' mode

        const lockScreen = <div className="lock-for-edit">
            У вас нет прав для редактирования
        </div>

        return (
            <>
            {!show || canEdit ? this.props.children : lockScreen}
            </>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    curUser: state.user
})


export default connect(mapStateToProps, {})(LockForEdit)