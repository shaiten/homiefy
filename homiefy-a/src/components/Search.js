
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";


const Home = () => {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({ name: ""})
    const { name } = post

    const [removed, setremoves] = useState([])
    const [remove, setremove] = useState({ removeQuery: ""})
    const { removeQuery } = remove

    useEffect(() => {
        fetchPosts()
    }, [])
    async function fetchPosts() {
        const { data } = await supabase
            .from('posts')
            .select()
        setPosts(data)
    }
    async function searchPosts() {
        const { data } = await supabase
            .from('posts')
            .select()
            .eq('name', name)
        setPosts(data)
        setPost({ name: ""})
    }
    async function deletePosts() {
        const { data } = await supabase
        .from('posts')
        .delete()
        .eq('name', removeQuery)
        fetchPosts()
    }

    return (
        <div className="row justify-content-center">
            <div className="col-11">
                <input
                    placeholder="search by name"
                    value={name}
                    onChange={e => setPost({ ...post, name: e.target.value })}
                />
                <button onClick={searchPosts}>submit</button>
                <button onClick={fetchPosts}>reset</button>
                <div> <br /> </div>
                <input
                    placeholder="delete by name"
                    value={removeQuery}
                    onChange={e => setremove({ ...remove, removeQuery: e.target.value })}
                />
                <button onClick={deletePosts}>delete</button>
                {
                    //.slice at index zero and reverse to show most recent first
                    posts.slice(0).reverse().map(post => (
                        <div className="row posting border" key={post.id}>
                            <div className="col-sm scoolLogo">
                                <img src="logo.png" className="logo-img" />
                            </div>
                            <div className="col-sm posting-col">
                                <h4 className="half-top">{post.name}</h4>
                            </div>
                            <div className="col-sm posting-col">
                                <p className="half-top">{post.address}</p>
                            </div>
                            <div className="col-sm posting-col">
                                <p className="half-top">{post.description}</p>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Home;




