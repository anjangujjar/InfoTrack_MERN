import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, Box, Button, Alert } from '@mui/material';

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
                    Profile
                </Typography>
                {user ? (
                    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                        <Typography variant="body1" gutterBottom>
                            Username: {profile.username}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Email: {profile.email}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Phone: {profile.phone}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={logout} sx={{ mt: 2 }}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        You need to log in to view this page.
                    </Alert>
                )}
            </Box>
        </Container>
    );
};

export default Profile;
