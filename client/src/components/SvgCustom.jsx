import React, { useEffect } from 'react';
import { fabric } from 'fabric';
import { proxy, useSnapshot } from 'valtio';
import svgState from '../store';
import * as THREE from 'three';
const SvgEditor = () => {
  const snap = useSnapshot(svgState);

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      selection: false,
      backgroundColor: 'white',
    });
    svgState.canvas = canvas;

    canvas.on('mouse:down', (options) => {
      if (canvas.getActiveObject()) return;

      let element;
      if (svgState.currentTool === 'rect') {
        element = new fabric.Rect({
          left: options.pointer.x,
          top: options.pointer.y,
          fill: 'red',
          width: 1,
          height: 1,
        });
      } else if (svgState.currentTool === 'line') {
        element = new fabric.Line(
          [
            options.pointer.x,
            options.pointer.y,
            options.pointer.x,
            options.pointer.y,
          ],
          {
            stroke: 'black',
          }
        );
      } else if (svgState.currentTool === 'text') {
        element = new fabric.IText('Hello', {
          left: options.pointer.x,
          top: options.pointer.y,
        });
      }
      if (element) {
        canvas.add(element);
        canvas.setActiveObject(element);
      }
    });

    canvas.on('mouse:move', (options) => {
      if (!canvas.getActiveObject()) return;
      if (svgState.currentTool === 'rect' || svgState.currentTool === 'text') {
        const width = Math.abs(
          options.pointer.x - canvas.getActiveObject().left
        );
        const height = Math.abs(
          options.pointer.y - canvas.getActiveObject().top
        );
        canvas.getActiveObject().set({ width, height });
      } else if (svgState.currentTool === 'line') {
        canvas
          .getActiveObject()
          .set({ x2: options.pointer.x, y2: options.pointer.y });
      }
      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      canvas.discardActiveObject().renderAll();
    });
  }, []);

  const handleToolClick = (tool) => {
    svgState.currentTool = tool;
  };

  const handleClearClick = () => {
    svgState.canvas.clear();
  };
  const handleSaveClick = () => {
    const svgContent = svgState.canvas.toSVG();
    console.log(svgContent);
    svgState.logoDecal = `data:image/svg+xml;base64,${btoa(svgContent)}`;
    // Сохраните SVG в состоянии
  };
  console.log(snap);
  return (
    <div className="absolute left-full ml-3 glassmorphism p-3 w-[200px] h-[220px] rounded-md flex flex-col gap-4">
      <button onClick={() => handleToolClick('rect')}>Add Rectangle</button>
      <button onClick={() => handleToolClick('line')}>Add Line</button>
      <button onClick={() => handleToolClick('text')}>Add Text</button>
      <button onClick={handleClearClick}>Clear Canvas</button>
      <button onClick={handleSaveClick}>Save as SVG</button>
      <canvas id="canvas" width={200} height={200} />
    </div>
  );
};

export default SvgEditor;
