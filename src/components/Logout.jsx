import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session/local storage
    sessionStorage.clear();
    localStorage.clear();

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return null; // or you can return a spinner or message
}
