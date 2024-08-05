import React, { useState } from 'react';
import axios from '../utils/axios';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/signup', formData);
            console.log('Response:', response);
            if (response && response.data) {
                setMessage('Signup successful! Please log in.');
            } else {
                setMessage('Signup failed. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            if (err.response && err.response.data) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                <button type="submit">Signup</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
