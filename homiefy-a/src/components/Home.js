
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Home = () => {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState ({ name: "", address: ''})
  const { name, address } = post
  useEffect(() => {
    fetchPosts()
  }, [])
  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select()
    setPosts(data)
    console.log("data: ", data)
  }
  //insert post by the user
  async function createPost(){
    await supabase
      .from('posts')
      .insert([
        { name, address}
      ])
      .single()
      //setpost reset the form field
    setPost({ name: "", address: ""})
    fetchPosts()
  }
  return (
    <div className="row justify-content-center">
      <div className="col-11"> 
      <input 
        placeholder="name"
        value={name}
        onChange={e => setPost({ ...post, name: e.target.value })}
      />
      <input 
        placeholder="address"
        value={address}
        onChange={e => setPost({ ...post, address: e.target.value })}
      />
      <button onClick={createPost}>submit</button>
      {
        //.slice at index zero and reverse to show most recent first
        posts.slice(0).reverse().map(post => (
          <div className="row posting border" key={post.id}>
            <div className="col-sm scoolLogo">
            <img src="trash.jpg"  className="img-fluid img-thumbnaiil" alt="image not working"/>
            </div>
            <div className="col-sm">
              <h4 className="half-top">{post.name}</h4>
            </div>
            <div className="col-sm">
              <p className="half-top">{post.address}</p>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Home;
