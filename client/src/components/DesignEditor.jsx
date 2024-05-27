import React from 'react';
import CanvasModel from '../canvas';
import Customizer from './Customizer';
import SvgCustom from './SvgCustom';
const DesignEditor = ({ user }) => {
  return (
    <div className="editor">
      <CanvasModel />
      <Customizer user={user} />
    </div>
  );
};

export default DesignEditor;
