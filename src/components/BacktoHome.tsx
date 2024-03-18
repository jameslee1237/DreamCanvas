"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const BackToHomeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button
      className="back-to-home-button hover:bg-[#026bcd]"
      onClick={handleClick}
    >
      Back to Home
    </button>
  );
};

export default BackToHomeButton;