import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useSnapshot } from 'valtio';
import svgState from '../store';
let canvas;
const SvgEditor = () => {
  const snap = useSnapshot(svgState);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!svgState.canvas) {
      canvas = new fabric.Canvas(canvasRef.current, {
        selection: false,
        backgroundColor: 'white',
      });
      svgState.canvas = canvas;

      const handleMouseDown = (options) => {
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
      };

      canvas.on('mouse:down', handleMouseDown);

      canvas.on('mouse:move', (options) => {
        const activeObject = canvas.getActiveObject();
        if (!activeObject) return;

        if (
          svgState.currentTool === 'rect' ||
          svgState.currentTool === 'text'
        ) {
          const width = Math.abs(options.pointer.x - activeObject.left);
          const height = Math.abs(options.pointer.y - activeObject.top);
          activeObject.set({ width, height });
        } else if (svgState.currentTool === 'line') {
          activeObject.set({
            x2: options.pointer.x,
            y2: options.pointer.y,
          });
        }

        canvas.renderAll();
      });

      canvas.on('mouse:up', () => {
        if (canvas.getActiveObject()) {
          canvas.discardActiveObject();
        }
      });
    }

    return () => {
      if (canvas) {
        // Удаление обработчиков событий перед вызовом dispose
        canvas.off('mouse:down');
        canvas.off('mouse:move');
        canvas.off('mouse:up');

        // Очистка ресурсов
        canvas.dispose();
        svgState.canvas = null;
      }
    };
  }, []);

  const handleToolClick = (tool) => {
    svgState.currentTool = tool;
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

      // Проверка, что SVG получен
      console.log('SVG Content:', svgContent);

      // Кодирование в Base64
      const base64EncodedSVG = `data:image/svg+xml;base64,${btoa(svgContent)}`;
      console.log(canvasRef);
      // Сохранение в нужное состояние или переменную
      console.log('Base64 SVG:', base64EncodedSVG);
      svgState.logoDecal = base64EncodedSVG;
    }
  };
  const handleSaveClickTexture = () => {
    if (canvas) {
      const svgContent = canvas.toSVG();

      // Проверка, что SVG получен
      console.log('SVG Content:', svgContent);

      // Кодирование в Base64
      const base64EncodedSVG = `data:image/svg+xml;base64,${btoa(svgContent)}`;
      console.log(canvasRef);
      // Сохранение в нужное состояние или переменную
      console.log('Base64 SVG:', base64EncodedSVG);
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
