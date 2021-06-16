import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

export default class AddPostPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: "",
      text: "",
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  addPostSubmit = async (e) => {
    e.preventDefault()
    const post = {
      title: this.state.title,
      text: this.state.text
    }
    this.setState({
      title: "",
      text: ""
    })
    let res = await fetch('http://localhost:4000/post/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(post)
    });
    const result = await res.json()
    this.props.alertCreate(result.msg, result.type)
  }

  render(){
    if (this.props.role >= 1 || this.props.role === 'user'|| this.props.role === 'moder'|| this.props.role === 'admin') {
      return (
        <div className="jumbotron">
          <div className="row ">
            <div className="col-2"></div>
            <div className="col-8">
              <h3 className="text-center">New post</h3>
              <form onSubmit={(e)=>this.addPostSubmit(e)}>
                <div class="form-group row">
                  <label for="title" class="col-sm-2 col-form-label">Title</label>
                  <div class="col-sm-10">
                    <input value={this.state.title} onChange={(e)=>this.handleChange(e)} name="title" type="text" class="form-control" id="title" required />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="text" className="col-sm-2 col-form-label">Text</label>
                  <div class="col-sm-10">
                    <textarea value={this.state.text} onChange={(e)=>this.handleChange(e)} name="text" class="form-control" id="text" rows="15" required></textarea>
                  </div>
                </div>
                <input type="hidden" value={this.props.id}/>
                <div class="form-group text-center">
                  <button type="submit" className="btn btn-primary">
                    Create new post 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (<Redirect to="/" />);
    }
  }
};