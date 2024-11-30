import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Speak from '../pages/Speak';
import Record from '../pages/Record';
import Analysis from '../pages/Analysis';
import Gestures from '../pages/Gestures';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'speak', element: <Speak /> },
      { path: 'record', element: <Record /> },
      { path: 'gestures', element: <Gestures /> },
      { path: 'analysis', element: <Analysis /> },
    ],
  },
]);