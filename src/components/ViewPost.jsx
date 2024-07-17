"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from "axios";

const ViewPost = ({ post }) => {
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState(null);


    const handleDelete = useCallback(async () => {
        await axios.delete(`https://dummyjson.com/posts/${post?.id}`)
        router.push('/');
    }, [post?.id, router]);

    const fetchComments = async (id) => {
        const response = await axios.get(`https://dummyjson.com/posts/${id}/comments`);
        setComments(response.data.comments);
    };

    useEffect(() => {
        if (post) {
            fetchComments(post.id);
        }
    }, [post]);

    const handleAddComment = async () => {
        const response = await axios.post('https://dummyjson.com/comments/add', {
            body: newComment,
            postId: id,
            user: { id: 1, username: 'currentUser', fullName: 'Current User' },
        });
        setComments([...comments, response.data]);
        setNewComment('');
    };

    const handleEditComment = async (commentId, body) => {
        const response = await axios.put(`https://dummyjson.com/comments/${commentId}`, { body });
        setComments(
            comments.map((comment) =>
                comment.id === commentId ? { ...comment, body: response.data.body } : comment
            )
        );
        setEditingComment(null);
    };

    const handleDeleteComment = async (commentId) => {
        await axios.delete(`https://dummyjson.com/comments/${commentId}`);
        setComments(comments.filter((comment) => comment.id !== commentId));
    };


    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto w-full max-w-3xl p-4">
            <div className="overflow-auto rounded-md">
                <img
                    className="w-full"
                    src="https://picsum.photos/800/400"
                    alt="Post Image"
                />
                <div className="flex flex-col gap-2 px-6 py-4">
                    <div className="mb-2 text-3xl font-bold">{post?.title}</div>
                    <div className="mb-2 text-start">{post?.body}</div>

                    <div className="flex w-full flex-col gap-2">
                        <div className='flex w-full flex-row justify-start gap-3 text-sm'>
                            <p className="truncate rounded-md bg-gray-400 px-2 py-1 text-xs text-white">views: {post?.views}</p>
                            <p className="truncate rounded-md bg-gray-400 px-2 py-1 text-xs text-white">likes: {post?.reactions?.likes}</p>
                            <p className="truncate rounded-md bg-gray-400 px-2 py-1 text-xs text-white">dislikes: {post?.reactions?.dislikes}</p>
                        </div>
                        <div className='flex w-full flex-row items-center justify-start gap-3 text-sm'>
                            {post?.tags && post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-sx inline-block truncate rounded-md bg-gray-200 px-3 py-1 font-semibold text-gray-700"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    {user && <div className="flex flex-row justify-start gap-3">
                        <Link className="flex h-11 w-96 flex-row items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-center font-bold text-white hover:bg-gray-700" href={`/update-post/${post?.id}`}>

                            <div>Edit</div>

                        </Link>
                        <button
                            onClick={handleDelete}
                            className="flex h-11 w-96 flex-row items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-center font-bold text-white hover:bg-gray-700"
                        >
                            <div>Delete</div>
                        </button>
                    </div>}
                </div>
            </div>
            <div className="overflow-auto rounded-md px-6 py-4">
                <div className="mb-2 text-2xl font-bold">Comments</div>
                {Array.isArray(comments) && comments.map((comment) => (
                    <div key={comment.id} className="mb-4 rounded-md border p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <div className="text-sm font-semibold text-gray-700">
                                {comment.user.fullName} (@{comment.user.username})
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setEditingComment(comment)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        {editingComment?.id === comment.id ? (
                            <div>
                                <textarea
                                    value={editingComment.body}
                                    onChange={(e) => setEditingComment({ ...editingComment, body: e.target.value })}
                                    className="mb-2 w-full rounded-md border p-2"
                                />
                                <button
                                    onClick={() => handleEditComment(comment.id, editingComment.body)}
                                    className="rounded-md bg-green-500 px-2 py-1 font-bold text-white hover:bg-green-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingComment(null)}
                                    className="ml-2 rounded-md bg-gray-500 px-2 py-1 font-bold text-white hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="text-gray-800">{comment.body}</div>
                        )}
                    </div>
                ))}
                <div className="mt-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="mb-2 w-full rounded-md border p-2"
                        placeholder="Add a comment..."
                    />
                    <button
                        onClick={handleAddComment}
                        className="rounded-md bg-gray-950 px-4 py-2 font-bold text-white hover:bg-gray-700"
                    >
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewPost;
