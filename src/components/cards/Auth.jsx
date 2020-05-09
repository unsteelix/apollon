import * as React from "react";
import { connect } from 'react-redux'
import { fetchPrivateCards, updateCards, resetQuery, setUser } from '../../actions/index.js'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            input: ''
        };

        this.inputChange = this.inputChange.bind(this);
        this.logIn = this.logIn.bind(this);
        this.fetchUserByPass = this.fetchUserByPass.bind(this);
    }


    inputChange(e){
        const pass = e.target.value.trim()
        this.setState({input: pass})

        if(pass.length >= 8){
            this.fetchUserByPass(pass)
            .then(res => {
                const status = res.status
                const data = res.data
                if(status === "success"){
                    const user = res.data
                    this.logIn(user)
                } else {
                    console.log(data)
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    logIn(user) {
        this.props.setUser(user)
        this.props.resetQuery()
        
        // подписываемся на изменения в карточках конкретного юзера
        this.props.fetchPrivateCards(user.userId)
    }

    fetchUserByPass(pass) {
        const url = `https://us-central1-apollon-71292.cloudfunctions.net/api/pass/${pass}`
        return fetch(url)
        .then(function(response) { return response.json(); })
    }









    render() {             
        const user = this.props.user || null;
        return (
            <div className="auth-card" >
                {user ? `current user: ${user.name}\n` : ''}
                auth: <input type="password" value={this.state.input} onChange={this.inputChange} />
            </div>
        );
    }
}

// маппинг состояния приложения в свойства компонента-контейнера
const mapStateToProps = state => ({ 
    user: state.user
})


export default connect(mapStateToProps, { setUser, resetQuery, fetchPrivateCards })(Auth)