import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

import './authentication.css'
import LoginComp from './login'
import RegisterComp from './register'


class AuthenticationPage extends Component {
    render () {
        return (
            <div className="auth_page">
                <div className="cover"></div>
                <Route exact path="/login" component={ LoginComp } />
                <Route exact path="/register" component={ RegisterComp } />
            </div>
        )
    }
}


export default AuthenticationPage