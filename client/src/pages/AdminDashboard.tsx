import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const [students, setStudents] = useState<any[]>([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [editing, setEditing] = useState<any>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const { data } = await api.get('/admin/students');
            setStudents(data);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleBlock = async (id: string, blocked: boolean) => {
        try {
            if (blocked) await api.put(`/admin/students/${id}/unblock`);
            else await api.put(`/admin/students/${id}/block`);
            fetchStudents();
        } catch (err) { alert('Action failed'); }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/admin/students/${editing._id}`, editing);
            setEditing(null);
            fetchStudents();
        } catch (err) { alert('Update failed'); }
    };

    return (
        <div className="container">
            <nav className="navbar glass-panel">
                <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
                <div>
                    <span style={{ marginRight: '1rem' }}>Hello, {user?.name}</span>
                    <button className="btn btn-secondary" onClick={() => { logout(); navigate('/admin/login'); }}>Logout</button>
                </div>
            </nav>

            {editing && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3>Edit Student</h3>
                    <form onSubmit={handleUpdate}>
                        <input className="input" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Name" />
                        <input className="input" value={editing.course} onChange={e => setEditing({ ...editing, course: e.target.value })} placeholder="Course" />
                        <button className="btn">Save Changes</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditing(null)} style={{ marginLeft: '1rem' }}>Cancel</button>
                    </form>
                </div>
            )}

            <div className="grid">
                {students.map(student => (
                    <div key={student._id} className="card">
                        <h3>{student.name}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{student.email}</p>
                        <p>Course: {student.course}</p>
                        <p>Age: {student.age}</p>
                        <div style={{ marginBottom: '1rem' }}>
                            <span className={`status-badge ${student.blocked ? 'status-blocked' : 'status-active'}`}>
                                {student.blocked ? 'Blocked' : 'Active'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn" onClick={() => setEditing(student)}>Edit</button>
                            <button
                                className={`btn ${student.blocked ? 'btn-secondary' : 'btn-danger'}`}
                                onClick={() => toggleBlock(student._id, student.blocked)}
                            >
                                {student.blocked ? 'Unblock' : 'Block'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminDashboard;
