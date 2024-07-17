"use client";
import { loginUser, reloadUser } from '@/store/reducers/userSlice';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    }, [username, password, dispatch]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch(reloadUser(user));
            return router.push('/');
        };
    }, [router]);
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div>Please login with emilys, emilyspass</div>
            <form className='flex w-full max-w-md flex-col justify-start gap-4 p-4' onSubmit={handleSubmit}>
                <input
                    className='flex h-11 w-full flex-row p-1'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className='flex h-11 w-full flex-row p-1'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className='flex h-11 w-full flex-row items-center justify-center rounded-md bg-gray-950 p-1 text-white' type="submit"><div>Login</div></button>
            </form>
        </div>
    );
};

export default Login;
