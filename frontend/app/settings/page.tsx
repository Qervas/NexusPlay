'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';
import Layout from '../layout';
import Link from 'next/link';

const SettingsPage = () => {
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (session) {
			setName(session.user?.name ?? ""); 
			setEmail(session.user?.email ?? "");
			setImage(session.user?.image ?? ""); 
        }
    }, [session]);


    if (!session) {
        return (
            <Layout>
                <p>You are not signed in. <Link href="#" onClick={() => signIn()}>Sign in</Link></p>
            </Layout>
        );
    }

    const handleSave = async () => {
		if (name !== (session.user?.name ?? "") || image !== (session.user?.image ?? "")) {
            try {
                const response = await axios.post('http://localhost:5000/api/users', {
                    email,
                    name,
                    image
                });
                console.log('Update successful:', response.data);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Failed to update user:', error);
                alert('Failed to update profile!');
            }
        } else {
            alert('No changes to save.');
        }
    };

	return (
        <div>
            <h1>Settings</h1>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} disabled />
            </div>
            <div>
                <label>Image URL:</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                <div style={{ margin: '10px 0' }}>
                    {image && <img src={image} alt="Profile Preview" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%' }} />}
                </div>
            </div>
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
};

export default SettingsPage;
