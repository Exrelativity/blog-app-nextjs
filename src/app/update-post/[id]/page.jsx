"use client";
import UpdatePost from "@/components/UpdatePost";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const fetchPost = async (id) => {
  const res = await axios.get(`https://dummyjson.com/posts/${id}`);
  return res.data;
}
export default function Page({ params: { id } }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPostData = async () => {
        try {
          const fetchedPost = await fetchPost(id);
          setPost(fetchedPost);
        } catch (error) {
          toast.error('Failed to fetch post', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPostData();
    }
  }, [id]);
  return (
    <main className="flex h-screen flex-col items-center justify-between p-10">
      {loading ? <div>Loading...</div> : <UpdatePost post={post} />}
    </main>
  );
}
