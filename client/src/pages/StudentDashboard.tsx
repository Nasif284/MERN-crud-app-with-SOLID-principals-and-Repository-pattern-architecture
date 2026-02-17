import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/student/profile');
            setProfile(data);
        } catch (err) { console.error(err); }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await api.put('/student/profile', profile);
            setProfile(data);
            setIsEditing(false);
            alert('Updated successfully');
        } catch (err) { alert('Update failed'); }
    };

    if (!profile) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <nav className="navbar glass-panel">
                <h1 style={{ margin: 0 }}>Student Dashboard</h1>
                <button className="btn btn-secondary" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
            </nav>

            <div className="card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
                <h2 className="title" style={{ fontSize: '2rem' }}>My Profile</h2>
                {!isEditing ? (
                    <div>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Course:</strong> {profile.course}</p>
                        <p><strong>Age:</strong> {profile.age}</p>
                        <div style={{ marginTop: '2rem' }}>
                            <button className="btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Name</label>
                            <input className="input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Course</label>
                            <input className="input" value={profile.course} onChange={e => setProfile({ ...profile, course: e.target.value })} />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Age</label>
                            <input type="number" className="input" value={profile.age} onChange={e => setProfile({ ...profile, age: Number(e.target.value) })} />
                        </div>
                        <button className="btn">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ marginLeft: '1rem' }}>Cancel</button>
                    </form>
                )}
            </div>
        </div>
    );
};
export default StudentDashboard;
