'use client';
import React, { useState } from 'react';
import { Network, Maximize2 } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
  connections: number;
}

interface GraphEdge {
  id: string;
  from: string;
  to: string;
}

const nodes: GraphNode[] = [
  { id: 'n-ml', label: 'Machine Learning', x: 50, y: 50, size: 22, color: 'hsl(263, 69%, 60%)', connections: 8 },
  { id: 'n-nlp', label: 'NLP', x: 75, y: 30, size: 16, color: 'hsl(199, 89%, 48%)', connections: 5 },
  { id: 'n-dl', label: 'Deep Learning', x: 30, y: 25, size: 18, color: 'hsl(263, 50%, 55%)', connections: 6 },
  { id: 'n-stats', label: 'Statistics', x: 20, y: 60, size: 14, color: 'hsl(38, 92%, 50%)', connections: 4 },
  { id: 'n-nn', label: 'Neural Networks', x: 60, y: 72, size: 15, color: 'hsl(158, 64%, 40%)', connections: 5 },
  { id: 'n-tf', label: 'Transformers', x: 82, y: 60, size: 13, color: 'hsl(199, 70%, 55%)', connections: 3 },
  { id: 'n-rag', label: 'RAG', x: 68, y: 48, size: 12, color: 'hsl(38, 70%, 55%)', connections: 3 },
  { id: 'n-emb', label: 'Embeddings', x: 45, y: 80, size: 11, color: 'hsl(158, 50%, 45%)', connections: 4 },
  { id: 'n-cv', label: 'Computer Vision', x: 15, y: 40, size: 13, color: 'hsl(0, 72%, 51%)', connections: 3 },
  { id: 'n-opt', label: 'Optimization', x: 35, y: 45, size: 10, color: 'hsl(220, 50%, 55%)', connections: 2 },
];

const edges: GraphEdge[] = [
  { id: 'e-1', from: 'n-ml', to: 'n-dl' },
  { id: 'e-2', from: 'n-ml', to: 'n-stats' },
  { id: 'e-3', from: 'n-ml', to: 'n-nlp' },
  { id: 'e-4', from: 'n-dl', to: 'n-nn' },
  { id: 'e-5', from: 'n-nn', to: 'n-tf' },
  { id: 'e-6', from: 'n-nlp', to: 'n-tf' },
  { id: 'e-7', from: 'n-tf', to: 'n-rag' },
  { id: 'e-8', from: 'n-rag', to: 'n-emb' },
  { id: 'e-9', from: 'n-nn', to: 'n-emb' },
  { id: 'e-10', from: 'n-dl', to: 'n-cv' },
  { id: 'e-11', from: 'n-ml', to: 'n-opt' },
  { id: 'e-12', from: 'n-stats', to: 'n-opt' },
];

function getNodeById(id: string) {
  return nodes.find((n) => n.id === id);
}

export default function KnowledgeGraphPreview() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div
      className="rounded-xl border p-5"
      style={{
        backgroundColor: 'hsl(var(--surface))',
        borderColor: 'hsl(var(--border-subtle))',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className="text-base font-semibold"
            style={{ color: 'hsl(var(--text-primary))' }}
          >
            Summary
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--text-muted))' }}>
            {nodes.length} nodes · {edges.length} relationships
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150"
          style={{
            backgroundColor: 'hsl(var(--surface-elevated))',
            borderColor: 'hsl(var(--border))',
            color: 'hsl(var(--text-secondary))',
          }}
        >
          <Maximize2 size={12} />
          Full View
        </button>
      </div>

      {/* SVG Graph */}
      <div
        className="rounded-lg overflow-hidden relative"
        style={{
          backgroundColor: 'hsl(224, 20%, 7%)',
          height: '220px',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Edges */}
          {edges.map((edge) => {
            const from = getNodeById(edge.from);
            const to = getNodeById(edge.to);
            if (!from || !to) return null;
            const isHighlighted =
              hoveredNode === edge.from || hoveredNode === edge.to;
            return (
              <line
                key={edge.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={
                  isHighlighted
                    ? 'hsl(263, 69%, 60%)'
                    : 'hsl(224, 14%, 22%)'
                }
                strokeWidth={isHighlighted ? 0.6 : 0.3}
                strokeOpacity={isHighlighted ? 0.9 : 0.5}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size / 10 + (isHovered ? 1 : 0)}
                  fill={node.color}
                  fillOpacity={isHovered ? 1 : 0.75}
                  stroke={isHovered ? 'white' : 'transparent'}
                  strokeWidth={0.4}
                />
                {(isHovered || node.size >= 18) && (
                  <text
                    x={node.x}
                    y={node.y + node.size / 10 + 2.5}
                    textAnchor="middle"
                    fontSize="2.8"
                    fill="hsl(220, 20%, 80%)"
                    fontFamily="DM Sans, sans-serif"
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div
          className="absolute bottom-2 left-2 flex items-center gap-3"
          style={{ color: 'hsl(var(--text-muted))' }}
        >
          <div className="flex items-center gap-1.5">
            <Network size={10} />
            <span className="text-xs">Hover to explore</span>
          </div>
        </div>
      </div>

      {/* Hovered node info */}
      <div className="mt-3 h-8 flex items-center">
        {hoveredNode ? (
          (() => {
            const node = getNodeById(hoveredNode);
            if (!node) return null;
            return (
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: 'hsl(var(--text-primary))' }}
                >
                  {node.label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: 'hsl(var(--text-muted))' }}
                >
                  {node.connections} connections
                </span>
              </div>
            );
          })()
        ) : (
          <span className="text-xs" style={{ color: 'hsl(var(--text-muted))' }}>
            Hover a node to see details
          </span>
        )}
      </div>
    </div>
  );
}