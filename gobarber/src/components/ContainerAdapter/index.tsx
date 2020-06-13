import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const ContainerAdapter: React.FC = ({ children }) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    enabled
  >
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
);

export default ContainerAdapter;
