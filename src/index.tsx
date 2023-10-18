import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerPlugin } from 'react-filepond';
import { pdfjs } from 'react-pdf';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tooltip/dist/react-tooltip.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

console.log(pdfjs.GlobalWorkerOptions.workerSrc);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
