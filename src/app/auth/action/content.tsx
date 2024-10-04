'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { auth } from '../../firebase';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
} from 'firebase/auth';

const ActionPage: React.FC = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');
  // const apiKey = searchParams.get('apiKey');
  // const lang = searchParams.get('lang');

  const [message, setMessage] = useState<string>('Processing...');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);

  useEffect(() => {
    if (!mode || !oobCode) {
      setMessage('Invalid or missing action parameters.');
      return;
    }

    switch (mode) {
      case 'resetPassword':
        handleResetPassword(oobCode);
        break;
      case 'verifyEmail':
        handleVerifyEmail(oobCode);
        break;
      default:
        setMessage('Unsupported action mode.');
    }
  }, [mode, oobCode]);

  const handleResetPassword = async (oobCode: string) => {
    try {
      // Verify the password reset code
      const userEmail = await verifyPasswordResetCode(auth, oobCode);
      if (userEmail) {
        setShowPasswordInput(true);
        setMessage(`Please enter a new password for ${userEmail}.`);
      } else {
        setMessage('Invalid or expired password reset code.');
      }
    } catch (_error) {
      setMessage('Invalid or expired password reset code.');
    }
  };

  const handleVerifyEmail = async (oobCode: string) => {
    try {
      // Apply the email verification code
      await applyActionCode(auth, oobCode);
      setMessage('Your email has been verified successfully!');
    } catch (_error) {
      setMessage('Invalid or expired email verification code.');
    }
  };

  const handleSubmitNewPassword = async () => {
    try {
      if (!newPassword) {
        setMessage('Please enter a new password.');
        return;
      }
      if (!validatePassword(newPassword)) {
        setMessage('Password does not meet the required criteria.');
        return;
      }
      // Confirm the password reset with the new password
      await confirmPasswordReset(auth, oobCode!, newPassword);
      setMessage('Your password has been reset successfully!');
      setShowPasswordInput(false);
    } catch (_error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,16}$/;
    return regex.test(password);
  };

  return (
    <div>
      <h1>Alien Carbon</h1>
      <p>{message}</p>

      {mode === 'resetPassword' && showPasswordInput && (
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleSubmitNewPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default ActionPage;
