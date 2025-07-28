'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/components/utils/routes';
import Card from '@mui/material/Card';
import React, { useState } from 'react';

const ChangePasswordSection: React.FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        
        try {
            const response = await api.put('/api/users/changePassword', { oldPassword, newPassword });
            setSuccess('Password changed successfully.');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Failed to change password.');
        }
    };

    return (
        <Card className="w-5xl m-5 mt-10 p-5    ">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Current Password</label>
                    <Input
                        type="password"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">New Password</label>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Confirm New Password</label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">{success}</div>}
                <Button
                    type="submit"
                >Change Password</Button>
            </form>
        </Card>
    );
};

export default ChangePasswordSection;