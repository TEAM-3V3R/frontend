import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import styles from './canvas.module.scss';

const Canvas = forwardRef(function Canvas(
  { imgUrl, brushSize = 10, mode = 'draw' },
  ref
) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [drawLayer, setDrawLayer] = useState(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const baseCtx = canvas.getContext('2d');
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      setImgSize({ width: img.width, height: img.height });
      canvas.width = img.width;
      canvas.height = img.height;
      baseCtx.clearRect(0, 0, canvas.width, canvas.height);
      baseCtx.drawImage(img, 0, 0);

      const drawCanvas = document.createElement('canvas');
      drawCanvas.width = img.width;
      drawCanvas.height = img.height;
      setDrawLayer(drawCanvas);
      setUndoStack([drawCanvas.toDataURL()]);
    };
  }, [imgUrl]);

  useImperativeHandle(ref, () => ({
    undo: handleUndo,
    redo: handleRedo,
    getMaskBase64: () => {
      if (!drawLayer) return null;
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = drawLayer.width;
      maskCanvas.height = drawLayer.height;
      const maskCtx = maskCanvas.getContext('2d');
      maskCtx.drawImage(drawLayer, 0, 0);
      return maskCanvas.toDataURL('image/png');
    },
    clear: () => {
      if (!drawLayer) return;
      const ctx = drawLayer.getContext('2d');
      ctx.clearRect(0, 0, drawLayer.width, drawLayer.height);
      drawToMainCanvas();
      setUndoStack([]); // undo 스택도 초기화
      setRedoStack([]);
    },
  }));

  const saveState = (layer) => {
    setUndoStack((prev) => [...prev, layer.toDataURL()]);
    setRedoStack([]);
  };

  const restoreState = (dataUrl) => {
    if (!drawLayer) return;
    const ctx = drawLayer.getContext('2d');
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, drawLayer.width, drawLayer.height);
      ctx.drawImage(img, 0, 0);
      drawToMainCanvas();
    };
  };

  const drawToMainCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const baseCtx = canvas.getContext('2d');
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      baseCtx.clearRect(0, 0, canvas.width, canvas.height);
      baseCtx.drawImage(img, 0, 0);
      baseCtx.drawImage(drawLayer, 0, 0);
    };
  }, [imgUrl, drawLayer]);

  useEffect(() => {
    if (drawLayer) {
      drawToMainCanvas();
    }
  }, [drawLayer, drawToMainCanvas]);

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const imageAspect = imgSize.width / imgSize.height;
    const canvasAspect = rect.width / rect.height;

    let drawWidth, drawHeight, offsetX, offsetY;
    if (imageAspect > canvasAspect) {
      drawWidth = rect.width;
      drawHeight = rect.width / imageAspect;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      drawHeight = rect.height;
      drawWidth = rect.height * imageAspect;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    }

    const x = ((e.clientX - rect.left - offsetX) / drawWidth) * imgSize.width;
    const y = ((e.clientY - rect.top - offsetY) / drawHeight) * imgSize.height;
    if (x < 0 || x > imgSize.width || y < 0 || y > imgSize.height) return null;
    return { x, y };
  };

  const handleMouseDown = (e) => {
    if (!drawLayer) return;
    const coords = getCanvasCoordinates(e);
    if (!coords) return;
    setIsDrawing(true);
    const ctx = drawLayer.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !drawLayer) return;
    const coords = getCanvasCoordinates(e);
    if (!coords) return;
    const ctx = drawLayer.getContext('2d');

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation =
      mode === 'erase' ? 'destination-out' : 'source-over';
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    drawToMainCanvas();
  };

  const handleMouseUp = () => {
    if (!isDrawing || !drawLayer) return;
    setIsDrawing(false);
    saveState(drawLayer);
  };

  const handleUndo = () => {
    if (undoStack.length < 2 || !drawLayer) return;
    const newUndo = [...undoStack];
    const current = newUndo.pop();
    const prev = newUndo[newUndo.length - 1];
    setUndoStack(newUndo);
    setRedoStack((prevRedo) => [current, ...prevRedo]);
    restoreState(prev);
  };

  const handleRedo = () => {
    if (redoStack.length === 0 || !drawLayer) return;
    const [next, ...rest] = redoStack;
    setUndoStack((prevUndo) => [...prevUndo, next]);
    setRedoStack(rest);
    restoreState(next);
  };

  return (
    <div ref={containerRef} className={styles.canvasWrapper}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
      />
    </div>
  );
});

export default Canvas;
