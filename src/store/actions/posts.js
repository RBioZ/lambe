import {SET_POSTS,
   ADD_COMMENT,
   CREATING_POST,
   POST_CREATED} from './actionTypes';
import axios from 'axios'


export const addPost = post => {
  return dispatch => {
    dispatch(creatingPost())
    axios({
      url:'uploadImage',
      baseURL:'https://us-central1-lambe-3f5ae.cloudfunctions.net',
      method:'post',
      data:{
        image:post.image.base64
      }
    })
      .catch(err => console.log(err))
      .then(resp => {
        post.image = resp.data.imageUrl || "Erro"
        axios.post('/posts.json',{...post})
          .catch(err => console.log(err))
          .then(res => {
            dispatch(fetchPosts())
            dispatch(postCreated())
          })
      })
  }
  

//  return {
//    type: ADD_POST,
//    payload: post
//  }
}

export const addComment = payload => {
  return dispatch => {
    axios.get(`/posts/${payload.postId}.json`)
      .catch(err => console.log(err))
      .then(res => {
        const comments = res.data.comments || []
        comments.push(payload.comment)
        axios.patch(`/posts/${payload.postId}.json`, {comments})
          .catch(err => console.log(err))
          .then(res => {
            dispatch(fetchPosts())
          })
      })
  }
}

export const setPosts = posts => {
  return {
    type:SET_POSTS,
    payload:posts
  }
}

export const fetchPosts = () => {
  return dispatch => {
    axios.get('/posts.json')
      .catch(err => console.log(err))
      .then(res => {
        const rawPosts = res.data
        const posts = []
        for (let key in rawPosts){
          posts.push({
            ...rawPosts[key],
            id:key
          })
        }
        dispatch(setPosts(posts.reverse()))
      })
  }
}


export const creatingPost = () => {
  return{
    type: CREATING_POST
  }
}

export const postCreated = () => {
  return{
    type: POST_CREATED 
  }
}