import React from 'react'
import ReactDOM from 'react-dom'

function Logout(props) {
    return(
        <form onSubmit={props.logoutSubmit}>
            <button type="submit" class="btn btn-primary btn-light">
                logout
            </button>
        </form>
    )
}

export default Logout