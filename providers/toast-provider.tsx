'use client';
import { Toaster } from 'react-hot-toast';

export const ToasterProvider = () =>{
  return <Toaster position="top-center" toastOptions={{
    className: '',
    style: {
      zIndex: 99999,
    },
  }}/>;
}