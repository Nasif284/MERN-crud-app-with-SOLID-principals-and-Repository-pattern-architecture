import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
    role: 'ADMIN' | 'STUDENT';
}

const Register: React.FC<RegisterProps> = ({ role }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '', course: '', age: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = role === 'ADMIN' ? '/admin/register' : '/register';
            await api.post(endpoint, { ...form, age: Number(form.age) });
            navigate(role === 'ADMIN' ? '/admin/login' : '/login');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="title">{role === 'ADMIN' ? 'Admin Register' : 'Student Register'}</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input className="input" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
                    <input className="input" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

                    {role === 'STUDENT' && (
                        <>
                            <input className="input" placeholder="Course" onChange={e => setForm({ ...form, course: e.target.value })} />
                            <input className="input" placeholder="Age" type="number" onChange={e => setForm({ ...form, age: e.target.value })} />
                        </>
                    )}

                    <button className="btn" style={{ width: '100%' }}>Register</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)' }}>
                    {role === 'ADMIN' ? (
                        <a href="/admin/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Already have an admin account? Login</a>
                    ) : (
                        <a href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Already have an account? Login</a>
                    )}
                </p>
            </div>
        </div>
    );
};
export default Register;

