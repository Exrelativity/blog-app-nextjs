"use client";
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const UpdatePost = ({ post }) => {
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
        }
    }, [post])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const response = await axios.put(`https://dummyjson.com/posts/${post?.id}`, { title: title, body: body, userId: user.id });
        if (response.data) {
            toast.success("data saved successfully");
        }
        return response.data;
    }, [title, post, body, user]);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            return router.push('/login');
        }
    }, [router]);

    if (!post) {
        return <div className='flex'>Loading...</div>;
    }
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <form className='flex w-full max-w-md flex-col justify-start gap-4 p-4' onSubmit={handleSubmit}>
                <input
                    className='flex h-11 w-full flex-row rounded-md p-1'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    className='flex h-96 w-full flex-row rounded-md p-1'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Body"
                />
                <button className='flex h-11 w-full flex-row items-center justify-center rounded-md bg-gray-950 p-1 text-white' type="submit"><div>Save</div></button>
            </form>
        </div>
    );
};

export default UpdatePost;
