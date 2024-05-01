import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useSnapshot } from 'valtio';
import svgState from '../store';

let canvas;
let currentTool = '';
const SvgEditor = () => {
  const snap = useSnapshot(svgState);
  const canvasRef = useRef(null);

  const handleKeyDown = (event) => {
    const activeObject = canvas.getActiveObject();
    if (event.key === 'Delete' && activeObject) {
      canvas.remove(activeObject);
    }
  };

  useEffect(() => {
    if (!svgState.canvas) {
      canvas = new fabric.Canvas(canvasRef.current, {
        selection: true, // Позволяет выделять и перемещать объекты
        backgroundColor: 'white',
      });
      svgState.canvas = canvas;

      document.addEventListener('keydown', handleKeyDown);

      const handleMouseDown = (options) => {
        const activeObject = canvas.getActiveObject();

        if (activeObject && !activeObject.isMoving()) {
          return;
        }

        if (currentTool === 'rect') {
          const rect = new fabric.Rect({
            left: options.pointer.x,
            top: options.pointer.y,
            fill: 'red',
            width: 1,
            height: 1,
          });
          canvas.add(rect);
          canvas.setActiveObject(rect);
        } else if (currentTool === 'line') {
          const line = new fabric.Line(
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
          canvas.add(line);
          canvas.setActiveObject(line);
        } else if (currentTool === 'text') {
          const text = new fabric.IText('Hello', {
            left: options.pointer.x,
            top: options.pointer.y,
          });
          canvas.add(text);
          canvas.setActiveObject(text);
        }
      };

      canvas.on('mouse:down', handleMouseDown);

      canvas.on('mouse:move', (options) => {
        const activeObject = canvas.getActiveObject();
        if (!activeObject) return;

        if (currentTool === 'rect') {
          const newWidth = options.pointer.x - activeObject.left;
          const newHeight = options.pointer.y - activeObject.top;
          activeObject.set({ width: newWidth, height: newHeight });
        } else if (currentTool === 'line') {
          activeObject.set({
            x2: options.pointer.x,
            y2: options.pointer.y,
          });
        }

        canvas.requestRenderAll();
      });

      canvas.on('mouse:up', () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && currentTool === 'rect') {
          activeObject.setCoords(); // Обновляет координаты после изменения размера
        }
        canvas.discardActiveObject();
      });

      canvas.on('object:added', (e) => {
        const obj = e.target;
        if (obj) {
          obj.setControlsVisibility({
            mt: true, // Верхний средний
            mb: true, // Нижний средний
            ml: true, // Левый средний
            mr: true, // Правый средний
            bl: true, // Нижний левый
            br: true, // Нижний правый
            tl: true, // Верхний левый
            tr: true, // Верхний правый
            mtr: true, // Поворотный угол
          });
        }
      });
    }

    return () => {
      if (canvas) {
        canvas.off('mouse:down');
        canvas.off('mouse:move');
        canvas.off('mouse:up');
        canvas.dispose();
        svgState.canvas = null;
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  const handleToolClick = (tool) => {
    currentTool = tool;
  };

  const handleClearClick = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = 'white';
    }
  };

  const handleSaveClickLogo = () => {
    if (canvas) {
      const svgContent = canvas.toSVG();
      const base64EncodedSVG = `data:image/svg+xml;base64,${btoa(svgContent)}`;
      svgState.logoDecal = base64EncodedSVG;
    }
  };

  const handleSaveClickTexture = () => {
    if (canvas) {
      const svgContent = canvas.toSVG();
      const base64EncodedSVG = `data:image/svg+xml;base64,${btoa(svgContent)}`;
      svgState.fullDecal = base64EncodedSVG;
    }
  };

  return (
    <div className="absolute left-full ml-3  p-3 w-[200px] h-[220px] rounded-md flex flex-col gap-4">
      <button onClick={() => handleToolClick('rect')}>Прямоугольник</button>
      <button onClick={() => handleToolClick('line')}>Линия</button>
      <button onClick={() => handleToolClick('text')}>Текст</button>
      <button onClick={handleClearClick}>Очистить канву</button>
      <button onClick={handleSaveClickLogo}>Приклеить к футболке (svg)</button>
      <button onClick={handleSaveClickTexture}>
        Растянуть по футболке (svg)
      </button>
      <div className="absolute left-full ml-3 ">
        <canvas ref={canvasRef} id="canvas" width={200} height={200} />
      </div>
    </div>
  );
};

export default SvgEditor;
