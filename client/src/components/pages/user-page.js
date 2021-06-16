import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class UserPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: null,
      posts: []
    }
  }

  componentDidMount = async () => {
    let res1 = await fetch(`http://localhost:4000${window.location.pathname}`, {
        method: 'GET',
        credentials: 'include',
    });
    const result1 = await res1.json()
    console.log(result1.id + "user1"+ result1.name)
    this.setState({ user: result1})
    let res2 = await fetch(`http://localhost:4000${window.location.pathname}/getPosts`, {
      method: 'Get',
      credentials: 'include',
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8'
      // },
      //body: JSON.stringify({user_id: result1.id})
    });
    const result2 = await res2.json()
    this.setState({posts: result2})
  }

  render(){
    if(this.state.user === null) {
      return(
        <div className="jumbotron">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )
    }
    if(this.state.user === undefined){
        return(
          <div className="jumbotron text-center">
            <h2>User not found</h2>
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
    let posts = ''
    if(this.state.posts === null) {
      posts = <><div className="jumbotron">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
              </div></>
    } else {
      if(this.state.posts === undefined || this.state.posts.length == 0){
        posts = <><div className="jumbotron">
                    <h3>No posts</h3>
                  </div></>
      } else {
        console.log('warning')
        console.log(this.state.posts)
        posts = this.state.posts.map((post)=>{
          return  <><div className="row">
                      <div className="col-md-1"></div>
                      <div className="col-sm-12 col-md-10">
                        <p><Link to={`/user/${post.user_id}`}><strong>{post.user_name}</strong></Link> {new Date(+post.date).toLocaleString("en-US", options)}</p>
                        <h3>{post.title} </h3>
                        <p>{post.text.slice(0, 500)+"..."}</p>
                        <Link to={`/post/${post.id}`}>
                          <button className="btn btn-secondary">Read more</button>
                        </Link>
                      </div>
                    </div>
                    <hr />
                  </>
        })
      }
    }
    
    return (
      <div className="jumbotron row">
        <div className="col-md-1"></div>
        <div className="col-sm-12 col-md-10">
          <h2>{this.state.user.name}</h2>
          <p>Date of registration: {new Date(+this.state.user.date).toLocaleString("en-US", options)}</p>
          <p>last posts:</p>
          {posts}
        </div>
      </div>
    );
  }
};
