"use client";
import Posts from "@/components/Posts";
import axios from "axios";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const getPosts = async (id) => {
  const response = await axios.get('https://dummyjson.com/posts');
  return response.data.posts;
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        toast.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? <div>Loading...</div> : <Posts posts={posts} />}
    </main>
  );
}

