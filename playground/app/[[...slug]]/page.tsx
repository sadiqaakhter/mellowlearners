'use client';
import {BrowserRouter} from 'react-router-dom';
import {useEffect, useState} from 'react';
import App from '../../src/App';

export default function PlaygroundPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div aria-label="Loading Mellow Learners Playground" />;
  return <BrowserRouter><App /></BrowserRouter>;
}

