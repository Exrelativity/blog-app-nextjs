import Link from 'next/link';
import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div className="w-[24.5%] max-w-md overflow-hidden rounded-md border border-gray-200 bg-white max-md:w-full">
            <img className="w-full" src="https://picsum.photos/400/200" alt="Post Image" />
            <div className="aspect-w-9 aspect-h-4 flex w-full flex-grow flex-col items-center justify-between gap-2 px-6 py-4">
                <div className='flex w-full flex-row items-center justify-start'>
                    <Link href={`/view-post/${post.id}`}>
                        <div className="flex h-24 w-full flex-grow flex-col text-start text-xl font-bold">{post.title}</div>
                    </Link>
                </div>
                <div className="flex w-full flex-col gap-2">
                    <div className='flex w-full flex-row items-center justify-start gap-3 text-sm'>
                        <p className="truncate rounded-md bg-gray-400 px-2 py-1 text-xs text-white">views: {post.views}</p>
                        <p className="truncate rounded-md bg-gray-400 px-2 py-1 text-xs text-white">likes: {post.reactions.likes}</p>
                        <p className="truncate rounded-md bg-gray-400 px-2 py-1 text-xs text-white">dislikes: {post.reactions.dislikes}</p>
                    </div>
                    <div className='flex w-full flex-row items-center justify-start gap-3 text-sm'>
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-sx inline-block truncate rounded-md bg-gray-200 px-3 py-1 font-semibold text-gray-700"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
