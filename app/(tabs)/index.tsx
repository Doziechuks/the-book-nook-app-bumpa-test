import { ROUTES } from '@/src/constants/routes';
import { Redirect } from 'expo-router';
import React from 'react';

export default function TabsIndex() {
  return <Redirect href={ROUTES.HOME} />;
}
