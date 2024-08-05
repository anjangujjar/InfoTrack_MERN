import React, { useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Correct import for react-router-dom v6

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const { login } = useAuth(); // Use useAuth() hook
    const navigate = useNavigate(); // Use useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/auth/login', formData);
            login(data.token);
            navigate('/profile'); // Use navigate instead of history.push
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
