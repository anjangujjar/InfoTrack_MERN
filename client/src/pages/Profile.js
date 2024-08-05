import React, { useContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/user/profile');
                setProfile(data);
            } catch (err) {
                console.log(err.response.data.message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            {user ? (
                <div>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>You need to log in to view this page.</p>
            )}
        </div>
    );
};

export default Profile;
