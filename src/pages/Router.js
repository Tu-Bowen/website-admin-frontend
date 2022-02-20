import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import React from 'react'
import Login from './Login'
import AdminIndex from './AdminIndex'
function Approuter() {
    return (
        <Router>
            <Route exact path="/">
                <Redirect to="/adminIndex" />
            </Route>
            <Route path="/login" exact component={Login} />
            <Route path="/adminIndex/" component={AdminIndex} />
        </Router>
    )
}
export default Approuter