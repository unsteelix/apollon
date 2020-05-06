import * as React from "react";
import { connect } from 'react-redux'

class LockScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pass: this.props.pass,
            lock: this.props.pass ? true : false,
            input: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.unlock = this.unlock.bind(this);
    }


    onInputChange(e){
        const pass = e.target.value.trim()

        this.setState({input: pass})
        
        if(pass === this.state.pass){
            this.unlock()
        }
    }

    unlock(){
        this.setState({lock: false})
    }



    render() {             
        const { pass, lock, input } = this.state

        const lockScreen = <div className="lock-screen">
            <input type="password" value={input} onChange={this.onInputChange} placeholder={pass} />
        </div>

        return (
            <>
            {lock ? lockScreen : this.props.children}
            </>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 

})


export default connect(mapStateToProps, {})(LockScreen)