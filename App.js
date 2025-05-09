import React from 'react'
import Navigation from './src/navigation/navigation';
import { AuthProvider } from './src/context/authContext';
export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>

  );
}