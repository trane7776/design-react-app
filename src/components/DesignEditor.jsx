import React from 'react';
import CanvasModel from '../canvas';
import Customizer from './Customizer';
const DesignEditor = () => {
  return (
    <div className="editor">
      <CanvasModel />
      <Customizer />
    </div>
  );
};

export default DesignEditor;
