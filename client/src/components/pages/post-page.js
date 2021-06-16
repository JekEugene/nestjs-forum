import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import PostComment from '../post-comment/post-comment'
import CantPostComment from '../cant-post-comment/cant-post-comment'
export default class PostPage extends Component{

  constructor(props){
    super(props)
    this.state = {
      commentText: "",
      name: props.name,
      user_id: props.user_id,
      post: null,
      comments: [],
      delete: false
    }
  }

  handleChange = (e) => {
    this.setState({commentText: e.target.value})
  }

  deletePost = async (post_id) => {
    const res = await fetch('http://localhost:4000/post/deletePost', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({post_id})
    });
    if(res.status >= 200 && res.status <300){
      this.setState({delete: true})
    }
  }

  deleteComment = async (comment_id) => {
    const res = await fetch('http://localhost:4000/post/deleteComment', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({comment_id})
    });
    const result = await res.json()
    const resComments = await fetch(`http://localhost:4000${window.location.pathname}/getComments`)
    const resultComments = await resComments.json()
    this.setState({comments: resultComments})
  }

  submitComment = async (e) => {
    e.preventDefault()
    const post_id = window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1)
    console.log(post_id)
    const comment = {
      post_id: post_id,
      commentText: this.state.commentText
    }
    this.setState({commentText: ''})
    const res = await fetch('http://localhost:4000/post/addComment', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(comment)
    });
    const result = await res.json()
    const resComments = await fetch(`http://localhost:4000${window.location.pathname}/getComments`)
    const resultComments = await resComments.json()
    this.setState({comments: resultComments})
  }

  componentDidMount = async () => {
    const resPost = await fetch(`http://localhost:4000${window.location.pathname}`)
    const resultPost = await resPost.json()
    this.setState({post: resultPost})
    const resComments = await fetch(`http://localhost:4000${window.location.pathname}/getComments`)
    const resultComments = await resComments.json()
    this.setState({comments: resultComments})
  }

  render(){
    console.log(this.state.delete)
    if(this.state.delete === true){
      return <Redirect to="/"/>
    }
    if(this.state.post === null) {
      return(
        <div className="jumbotron">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
      )
    }
    if(this.state.post === undefined){
        return(
          <div className="jumbotron text-center">
            <h2>Post not found</h2>
          </div>
        )
    }
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    let comments = null
    if(this.state.comments === null){
      comments =  <><div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div></>
    } else {
      if(this.state.comments === undefined || this.state.comments.length === 0){
        comments =  ''
      } else {
        console.log("comments")
        console.log(this.state.comments[0].user_id)
        console.log(this.props.user_id)
        comments = this.state.comments.map((comment)=>{
          return  <><br/><div className="bg-light">
                      <div className="row">
                        <p><Link to={`/user/${comment.user_id}`}><strong>{comment.user_name} </strong></Link>&nbsp;</p>
                        <p className="font-weight-light"> {new Date(+comment.date).toLocaleString("en-US", options)}</p>
                        {(comment.user_id == this.props.user_id || this.props.role === 'admin' || this.props.role === 'moder') && !(this.props.role == 'guest') ? 
                          <button className="btn" onClick={()=>this.deleteComment(comment.id)}>
                            <i class="fa fa-times" ></i>
                          </button> : null}
                      </div>
                    <p>{comment.text}</p>
                  </div></>
        })
      }
    }
    console.log('date')
    console.log(typeof this.state.post.date) 
    console.log(new Date(+this.state.post.date))
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-sm-12 col-md-10">
            <p> <Link to={`/user/${this.state.post.user_id}`}>
                  <strong>{this.state.post.user_name}</strong>
                </Link> {new Date(+this.state.post.date).toLocaleString("en-US", options)}
                {(this.state.post.user_id == this.props.user_id || this.props.role === 'admin' || this.props.role === 'moder') && !(this.props.role == 'guest')? 
                          <button className="btn" onClick={()=>this.deletePost(this.state.post.id)}>
                            <i class="fa fa-times" ></i>
                          </button> : null}
            </p>
            <h3>{this.state.post.title} </h3>
            <p>{this.state.post.text}</p>
          </div>
        </div>
        <div className="row bg-light">
          <div className="col-md-1"></div>
          <div className="col-sm-12 col-md-10">
            <h3>Comments </h3>
            <hr/>
            { this.props.role === 'user' || this.props.role === 'admin' || this.props.role === 'moder' ? <PostComment commentText={this.state.commentText}
                                                  handleChange={this.handleChange}
                                                  submitComment={this.submitComment}/> : <CantPostComment /> }
            {comments}
          </div>
        </div>
      </div>
    );
  }
};