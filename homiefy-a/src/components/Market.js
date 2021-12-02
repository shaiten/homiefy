
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Market = () => {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({ name: "", price: "", description: "" })
    const { name, price, description } = post
    useEffect(() => {
        fetchPosts()
    }, [])
    async function fetchPosts() {
        const { data } = await supabase
            .from('items')
            .select()
        setPosts(data)
        console.log("data: ", data)
    }
    //insert post by the user
    async function createPost() {
        await supabase
            .from('items')
            .insert([
                { name, price, description }
            ])
            .single()
        //setpost reset the form field
        setPost({ name: "", price: "", description: "" })
        fetchPosts()
    }
    return (
        <div className="row justify-content-center">
            <div className="col-11">
                <form>
                    <div class="form-group">
                        <input
                            placeholder="name"
                            value={name}
                            onChange={e => setPost({ ...post, name: e.target.value })}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type='number'
                            placeholder="price"
                            value={price}
                            onChange={e => setPost({ ...post, price: e.target.value })}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            placeholder="description"
                            value={description}
                            onChange={e => setPost({ ...post, description: e.target.value })}
                        />
                    </div>
                </form>
                <button onClick={createPost}>submit</button>
                {
                    //.slice at index zero and reverse to show most recent first
                    posts.slice(0).reverse().map(post => (
                        <div class="container">
                            <div className="row marketPosting border d-flex justify-content-center" key={post.id}>
                                <div className="col-4 scoolLogo">
                                    <img src="logo.png" className="logo-img" />
                                </div>
                                <div className="row border">
                                    <div className="col-6 posting-col">
                                        <h4>{post.name}</h4>
                                    </div>
                                    <div className="col-6 posting-col">
                                        <h6>price</h6>
                                        <p>{post.price}</p>
                                    </div>
                                </div>
                                <div class="w-100"></div>
                                <div className="row d-flex justify-content-center no-pad-marg">
                                    <div className="col posting-col border description no-pad-marg">
                                        <p>{post.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Market;
