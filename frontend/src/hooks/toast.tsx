import React, { createContext, useContext, useCallback, useState } from 'react';

interface ToastContextData {}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
}

export { ToastProvider, useToast };
