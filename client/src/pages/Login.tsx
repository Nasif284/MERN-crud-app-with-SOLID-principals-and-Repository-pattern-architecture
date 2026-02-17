import React, { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    role: 'ADMIN' | 'STUDENT';
}

const Login: React.FC<LoginProps> = ({ role }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = role === 'ADMIN' ? '/admin/login' : '/login';
            const { data } = await api.post(endpoint, { email, password });
            login(data.token, data.user);
            if (data.user.role === 'ADMIN') navigate('/admin');
            else navigate('/student');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="title">{role === 'ADMIN' ? 'Admin Login' : 'Student Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn" style={{ width: '100%' }}>Login</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)' }}>
                    {role === 'ADMIN' ? (
                        <a href="/admin/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register Admin</a>
                    ) : (
                        <a href="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Don't have an account? Register</a>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Login;

