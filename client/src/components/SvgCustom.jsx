import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useSnapshot } from 'valtio';
import svgState from '../store';

// Icon sources for custom controls
const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const cloneIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0 c0,0-0.001-0.001-0.001-0.002,34.161,-0.293,-0.086,-0.087,-0.188,-0.148,-0.295,-0.197,-0.027,-0.013,-0.057,-0.02,-0.086,-0.03,-0.086,-0.029,-0.174,-0.048,-0.265,-0.053,-33.453,-0,-33.494,-0,-22.177,-3.678,-0,-6.669,-2.992,-22.177,33.453,-34.454,-13.655,-13.655,-8.985,-13.655,-22.177,-0.085,-0.167,-0.249,-0.086,-0.087,-0.03,-4.663,-33.494,-2.574,-2.095,-22.177,-22.677,-2.095,-0.249,-22.177,-2.674,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,-22.177'-22.177,-22.177,-22.177,-22.177,-22.177,-22.177,10.277,-4.663,22.177,22.177,-10.663,-22.177,-4.663,-10.277'";

let canvas;

const SvgEditor = () => {
  const canvasRef = useRef(null);

  const handleKeyDown = (event) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (event.key === 'Delete' && activeObject) {
        canvas.remove(activeObject);
      }
    }
  };

  useEffect(() => {
    // Create the Fabric.js canvas
    canvas = new fabric.Canvas(canvasRef.current, {
      selection: true,
      backgroundColor: 'white',
    });

    // Define delete and clone object functions
    const deleteObject = (eventData, transform) => {
      const target = transform.target;
      canvas.remove(target);
      canvas.requestRenderAll();
    };

    const cloneObject = (eventData, transform) => {
      const target = transform.target;
      target.clone((cloned) => {
        cloned.left += 10;
        cloned.top += 10;
        canvas.add(cloned);
      });
    };

    // Add controls with custom icon rendering
    const deleteImg = new Image();
    deleteImg.src = deleteIcon;

    const cloneImg = new Image();
    cloneImg.src = cloneIcon;

    const renderIcon =
      (icon) => (ctx, left, top, styleOverride, fabricObject) => {
        const size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
      };

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon(deleteImg),
      cornerSize: 24,
    });

    fabric.Object.prototype.controls.clone = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: cloneObject,
      render: renderIcon(cloneImg),
      cornerSize: 24,
    });

    // Set up event handlers
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (canvas) {
        canvas.dispose();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []); // This effect runs once when the component is mounted

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 0,
      top: 50,
      fill: 'red',
      width: 100,
      height: 100,
      objectCaching: false,
      stroke: 'black',
      strokeWidth: 2,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
  };

  const addLine = () => {
    const line = new fabric.Line([100, 100, 200, 100], {
      stroke: 'black',
      strokeWidth: 2,
      left: 0,
      top: 50,
    });
    canvas.add(line);
    canvas.setActiveObject(line);
  };

  const addText = () => {
    const text = new fabric.IText('Hello Fabric', {
      left: 100,
      top: 100,
      fontSize: 24,
      fontFamily: 'Arial',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const handleClearCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = 'white';
    }
  };

  const handleSaveCanvas = (type) => {
    if (canvas) {
      const svgContent = canvas.toSVG();
      const base64EncodedSVG = `data:image/svg+xml;base64,${btoa(svgContent)}`;
      if (type === 'logo') {
        svgState.logoDecal = base64EncodedSVG;
      } else if (type === 'texture') {
        svgState.fullDecal = base64EncodedSVG;
      }
    }
  };

  return (
    <div className="absolute left-full ml-3  p-3 w-[200px] h-[220px] rounded-md flex flex-col gap-4">
      <button onClick={addRectangle}>Прямоугольник</button>
      <button onClick={addLine}>Линия</button>
      <button onClick={addText}>Текст</button>
      <button onClick={handleClearCanvas}>Очистить</button>
      <button onClick={() => handleSaveCanvas('logo')}>Лого</button>
      <button onClick={() => handleSaveCanvas('texture')}>Текстура</button>
      <div className="absolute left-full ml-3 ">
        <canvas ref={canvasRef} id="canvas" width="200" height="200" />
      </div>
    </div>
  );
};

export default SvgEditor;
