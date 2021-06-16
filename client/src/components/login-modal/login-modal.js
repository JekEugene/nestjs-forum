import React from 'react'
import ReactDOM from 'react-dom'
import {Redirect} from 'react-router-dom'

function LoginModal(props){
    return(
        <div class="modal" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={props.loginSubmit}>
                            <div class="form-group">
                                <label for="email">email</label>
                                <input  type="email" 
                                        class="form-control" 
                                        id="email" 
                                        name="emailInput"
                                        onChange={(e)=>props.handleChange(e)} 
                                        required/>
                            </div>
                            <div class="form-group">
                                <label for="password">password</label>
                                <input  type="password" 
                                        class="form-control" 
                                        id="password" 
                                        name="passwordInput"
                                        onChange={(e)=>props.handleChange(e)} 
                                        required/>
                            </div>
                            <div class="modal-footer">
                                <button id="login-btn" type="submit" class="btn btn-primary">login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal