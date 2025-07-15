// src/components/FlowChartEditor.tsx
import React, { useCallback, useEffect, useRef, useState, KeyboardEvent } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  NodeResizer,
  useReactFlow,
} from '@xyflow/react';
import html2canvas from 'html2canvas-pro';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';

/* ----------------- Recoil atoms ----------------- */
export const nodesState = atom<any[]>({ key: 'nodes', default: [] });
export const edgesState = atom<any[]>({ key: 'edges', default: [] });
export const imageDataUrlState = atom<string | null>({ key: 'imageDataUrl', default: null });
export const diagramInstructionsState = atom<string>({ key: 'diagramInstructions', default: '1.Please press delete to delete arrow or rectangle\n2.please click fit view leftside bottom\n3.+  to  zoom in\n4.- to zoom out' });

const handleStyle = (color: string) => ({ background: color, width: 8, height: 8, borderRadius: '50%' });

/* ----------------- Editable Node ----------------- */
const EditableNode = ({ id, data, selected }: any) => {
  const { setNodes } = useReactFlow();
  const [text, setText] = useState(data.label ?? '');
  const saveLabel = () =>
    setNodes((ns) =>
      ns.map((n) => (n.id === id ? { ...n, data: { ...n.data, label: text } } : n))
    );

  return (
    <div
      className="rounded border-2 border-blue-500 bg-blue-100 p-2 text-sm"
      style={{ width: data.width ?? 200, height: data.height ?? 120 }}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={120}
        minHeight={80}
        lineStyle={{ stroke: '#2563eb' }}
        handleStyle={{ fill: '#2563eb' }}
      />
      <textarea
        className="h-full w-full resize-none rounded border bg-white p-1 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={saveLabel}
        onKeyDown={(e: KeyboardEvent) => e.stopPropagation()}
        placeholder="Type here…"
      />
      {['Top', 'Right', 'Bottom', 'Left'].map((pos) => (
        <Handle
          key={`s-${pos}`}
          type="source"
          position={Position[pos]}
          id={`source-${pos.toLowerCase()}`}
          style={handleStyle('#06b6d4')}
        />
      ))}
      {['Top', 'Right', 'Bottom', 'Left'].map((pos) => (
        <Handle
          key={`t-${pos}`}
          type="target"
          position={Position[pos]}
          id={`target-${pos.toLowerCase()}`}
          style={handleStyle('#f97316')}
        />
      ))}
    </div>
  );
};

const nodeTypes = { editable: EditableNode };

/* ----------------- Flow Chart Editor ----------------- */
export const FlowChartEditor: React.FC = () => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [edges, setEdges] = useRecoilState(edgesState);
  const setImage = useSetRecoilState(imageDataUrlState);
  const [counter, setCounter] = useState(1);
  const [instructions, setInstructions] = useRecoilState(diagramInstructionsState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setNodes: setRFNodes, setEdges: setRFEdges } = useReactFlow();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const onNodesChange = useCallback((c) => setNodes((ns) => applyNodeChanges(c, ns)), [setNodes]);
  const onEdgesChange = useCallback((c) => setEdges((es) => applyEdgeChanges(c, es)), [setEdges]);
  const onConnect = useCallback((p) => setEdges((es) => addEdge({ ...p, style: { strokeWidth: 2 } }, es)), [setEdges]);

  const addNode = () => {
    const id = `n-${counter}`;
    const newNode = {
      id,
      type: 'editable',
      position: { x: 100 + counter * 20, y: 100 + counter * 20 },
      data: { label: '', width: 200, height: 120 },
      style: { width: 200, height: 120 },
    };
    setNodes((ns) => [...ns, newNode]);
    setCounter(counter + 1);
  };

  const saveDiagram = async () => {
    const container = ref.current;
    if (!container) return;

    const rfWrapper = container.querySelector('.react-flow') as HTMLElement;
    if (!rfWrapper) return;

    const nodeElements = Array.from(rfWrapper.querySelectorAll('.react-flow__node')) as HTMLElement[];
    if (nodeElements.length === 0) return;

    const bbox = nodeElements.reduce(
      (acc, el) => {
        const box = el.getBoundingClientRect();
        const flowBox = rfWrapper.getBoundingClientRect();
        return {
          left: Math.min(acc.left, box.left - flowBox.left),
          top: Math.min(acc.top, box.top - flowBox.top),
          right: Math.max(acc.right, box.right - flowBox.left),
          bottom: Math.max(acc.bottom, box.bottom - flowBox.top),
        };
      },
      { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity }
    );

    const rawWidth = bbox.right - bbox.left;
    const rawHeight = bbox.bottom - bbox.top;
    const SCALE = 0.8;

    const clone = rfWrapper.cloneNode(true) as HTMLElement;
    clone.style.transformOrigin = 'top left';
    clone.style.transform = `scale(${SCALE})`;
    clone.style.position = 'absolute';
    clone.style.left = `-${rawWidth * SCALE + 200}px`;
    clone.style.top = `-${rawHeight * SCALE + 200}px`;
    clone.style.background = '#fff';
    clone.style.overflow = 'visible';
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      backgroundColor: '#fff',
      useCORS: true,
      x: bbox.left * SCALE,
      y: bbox.top * SCALE,
      width: rawWidth * SCALE,
      height: rawHeight * SCALE,
      scale: 2,
    });

    document.body.removeChild(clone);
    setImage(canvas.toDataURL('image/png'));
    navigate('/');
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (["Delete", "Backspace"].includes(e.key)) {
        setRFNodes((ns) => ns.filter((n) => !n.selected));
        setRFEdges((es) => es.filter((e) => !e.selected));
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [setRFNodes, setRFEdges]);

  return (
    <div className="h-screen w-screen">
      <div className="flex gap-3 border-b bg-gray-100 p-3 items-center">
        <button onClick={addNode} className="rounded bg-blue-600 px-3 py-1 text-white">
          ➕ Add Node
        </button>
        <button onClick={saveDiagram} className="rounded bg-green-600 px-3 py-1 text-white">
          💾 Save & Go ➡
        </button>
        {/* <input
          type="text"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Enter instructions for this diagram"
          className="ml-4 flex-1 rounded border px-2 py-1 text-sm"
        /> */}
        <button
          className="ml-2 px-3 py-1 rounded bg-purple-600 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          📘 Show Instructions
        </button>
      </div>
      <div className="w-full h-[600px] overflow-auto" ref={ref}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          panOnDrag
          zoomOnScroll
          nodesDraggable={true}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* Instruction Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold">Diagram Instructions</Dialog.Title>
            <p className="mt-4 whitespace-pre-wrap text-sm text-gray-700">{instructions || 'No instructions provided.'}</p>
            <div className="mt-6 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded bg-blue-600 px-4 py-1 text-white"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
