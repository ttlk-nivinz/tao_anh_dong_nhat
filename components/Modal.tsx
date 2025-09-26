
import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-slate-800 p-4 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white text-3xl font-bold"
      >
        &times;
      </button>
    </div>
  );
};
