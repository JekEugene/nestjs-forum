import React from 'react'
import ReactDOM from 'react-dom'
import {Redirect} from 'react-router-dom'
 
function RegisterModal(props){
    return(
        <div class="modal" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={props.registerSubmit}>
                            <div class="form-group">
                                <label for="name">name</label>
                                <input  type="text" 
                                        className="form-control" 
                                        id="name" 
                                        name="nameInput"
                                        onChange={(e)=>props.handleChange(e)}  
                                        required/>
                            </div>
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
                                <button id="register-btn" type="submit" class="btn btn-primary">register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal