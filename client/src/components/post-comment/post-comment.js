function PostComment (props) {
    return(
        <form onSubmit={(e)=>props.submitComment(e)}>
            <textarea   value={props.commentText} 
                        onChange={(e)=>props.handleChange(e)} 
                        name="comment" 
                        type="text" 
                        class="form-control" 
                        id="comment" 
                        required></textarea>
            <br />
            <button className="btn btn-primary">send</button>
        </form>
    )
}
export default PostComment