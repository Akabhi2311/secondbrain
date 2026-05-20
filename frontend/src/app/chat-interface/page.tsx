import React from 'react';
import AppLayout from '@/components/AppLayout';
import ChatLayout from './components/ChatLayout';
import AuthGuard from '@/components/AuthGuard';
export default function ChatInterfacePage() {
  return (
    <AuthGuard>
    <AppLayout currentPath="/chat-interface">
      <ChatLayout />
    </AppLayout>
    </AuthGuard>
  );
}