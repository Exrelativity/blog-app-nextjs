"use client";
import { logout } from '@/store/reducers/userSlice';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { reloadUser } from "@/store/reducers/userSlice";
import { useEffect } from "react";

const Header = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch(reloadUser(user));
        };
    }, [dispatch]);

    return (
        <header className="w-full bg-white p-4 text-black shadow-md">
            <div className="mx-auto flex w-full items-center justify-between gap-5 px-10">
                <Link className="text-2xl font-bold" href="/">My Blog</Link>
                <nav className="flex flex-grow items-center justify-between gap-3">
                    <Link href="/" className="hover:underline">
                        Posts
                    </Link>
                    {user ? (<>
                        <Link href="/create-post" className="hover:underline">
                            create post
                        </Link>
                        <div className='flex flex-row items-center justify-center gap-3'>

                            <div className="max-w-[150px] truncate font-semibold">user:{user.username}</div>
                            <button
                                onClick={handleLogout}
                                className="rounded bg-gray-950 px-4 py-2 font-bold text-white hover:bg-gray-700"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                    ) : (
                        <Link href="/login">
                            <button className="rounded bg-gray-950 px-4 py-2 font-bold text-white hover:bg-gray-700">
                                Login
                            </button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
