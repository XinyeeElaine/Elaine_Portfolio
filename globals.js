/* The .jsx files were written for the old CDN setup: they read `React` /
   `ReactDOM` off the global scope and publish their components back onto
   `window` at the bottom of each file. This module re-creates those globals
   before any of them load, so the migration to Vite needed zero changes to
   the components themselves.

   ponytail: keeps script order load-bearing (main.jsx imports in sequence).
   Swap to real import/export per file if that ordering ever bites. */
import React from 'react';
import * as ReactDOM from 'react-dom/client';

window.React = React;
window.ReactDOM = ReactDOM;
