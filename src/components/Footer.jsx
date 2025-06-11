import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-auto border-top shadow-sm">
      <div className="text-center p-1">
        © {new Date().getFullYear()}{' '}
        <a 
          href="https://mauli-infotech.co.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white text-decoration-underline"
        >
          Mauli Infotech (OPC) Pvt. Ltd.
        </a> All rights reserved.
      </div>
    </footer>
  );
}
