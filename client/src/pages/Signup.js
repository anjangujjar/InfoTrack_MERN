import React, { useState } from 'react';
import axios from '../utils/axios';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', confirmEmail: '', password: '', confirmPassword: '', phone: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = () => {
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match.');
            return false;
        }
        setMessage('');
        return true;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

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
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                bgcolor="#f0f2f5"
                p={3}
                borderRadius={2}
                boxShadow={3}
                sx={{ backgroundColor: 'white' }}
            >
                <Typography variant="h4" gutterBottom>
                    Signup
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        label="Username"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        label="Password"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        label="Phone Number"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Signup
                    </Button>
                </Box>
                {message && <Alert severity="error" sx={{ mt: 2 }}>{message}</Alert>}
            </Box>
        </Container>
    );
};

export default Signup;

