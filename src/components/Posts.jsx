"use client";
import PostCard from './PostCard';


const Posts = ({ posts }) => {
    return (
        <div className="flex flex-row flex-wrap justify-center gap-3">
            {Array.isArray(posts) && posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Posts;
