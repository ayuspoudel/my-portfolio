import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaClock, FaSync } from "react-icons/fa";
import { nodes, edges, Node, Step } from "../data/About";

// StepItem component for modal
function StepItem({ step }: { step: Step }) {
  const [open, setOpen] = useState(false);

  const renderStatus = () => {
    switch (step.status) {
      case "success":
        return <FaCheckCircle color="#3fb950" />;
      case "failed":
        return <FaClock color="#d73a49" />;
      case "pending":
        return <FaSync className="spin" color="#f1e05a" />;
      default:
        return null;
    }
  };

  return (
    <div className={`dag__step dag__step--${step.status} ${open ? "dag__step--open" : ""}`}>
      <div className="dag__step-header" onClick={() => setOpen(!open)}>
        <span className="dag__step-arrow">{open ? "▾" : "▸"}</span>
        <span className="dag__step-title">{step.title}</span>
        <span className="dag__step-status">{renderStatus()}</span>
      </div>
      {open && step.description && (
        <div className="dag__step-body">
          <pre>{step.description}</pre>
        </div>
      )}
    </div>
  );
}

export default function Dag() {
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [expandedNode, setExpandedNode] = useState<Node | null>(null);

  useEffect(() => {
    const newPos: Record<string, { x: number; y: number }> = {};
    for (const node of nodes) {
      const el = nodeRefs.current[node.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        newPos[node.id] = {
          x: node.x + node.width,
          y: node.y + rect.height / 2,
        };
      }
    }
    setPositions(newPos);
  }, []);

  const renderIcon = (status: Node["status"]) => {
    switch (status) {
      case "done":
        return <FaCheckCircle color="#3fb950" />;
      case "pending":
        return <FaClock color="#d29922" />;
      case "inprogress":
        return <FaSync className="spin" color="#2f81f7" />;
      case "activelypending":
        return <span className="pulse-dot"></span>;
      default:
        return null;
    }
  };

  return (
    <div className="dag">
      {/* === Arrows === */}
      <svg className="dag__svg">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#64ffda" />
          </marker>
        </defs>
        {edges.map(([from, to], idx) => {
          const start = positions[from];
          const end = positions[to];
          if (!start || !end) return null;

          const path = `M ${start.x} ${start.y}
                        L ${(start.x + end.x) / 2} ${start.y}
                        L ${(start.x + end.x) / 2} ${end.y}
                        L ${end.x} ${end.y}`;
          return (
            <path
              key={idx}
              d={path}
              stroke="#64ffda"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="dag__edge"
            />
          );
        })}
      </svg>

      {/* === Nodes === */}
      {nodes.map((node) => (
        <div
          key={node.id}
          ref={(el) => (nodeRefs.current[node.id] = el)}
          className={`dag__node dag__node--${node.status}`}
          style={{
            left: node.x,
            top: node.y,
            width: node.width,
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={() => setExpandedNode(node)}
        >
          <div className="dag__header">
            <div className="dag__icon">{renderIcon(node.status)}</div>
            <div className="dag__label">{node.title}</div>
          </div>
          {node.company && <div className="dag__subtitle">{node.company}</div>}
          {node.date && <div className="dag__date">{node.date}</div>}
          {node.statusText && <div className="dag__status">{node.statusText}</div>}
        </div>
      ))}

      {/* === Modal === */}
      {expandedNode && (
        <div className="dag__modal">
          <div className="dag__modal-content">
            <button className="dag__modal-close" onClick={() => setExpandedNode(null)}>
              ×
            </button>

            {/* Header */}
            <div className="dag__modal-header">
              <h3>{expandedNode.title}</h3>
              {expandedNode.statusText && (
                <span className="dag__modal-status">{expandedNode.statusText}</span>
              )}
            </div>

            {/* Meta */}
            <div className="dag__modal-meta">
              {expandedNode.company && <span>{expandedNode.company}</span>}
              {expandedNode.date && <span> • {expandedNode.date}</span>}
            </div>

            {/* Details */}
            {expandedNode.details && (
              <div className="dag__modal-description">{expandedNode.details}</div>
            )}

            {/* Steps */}
            {expandedNode.steps && (
              <div className="dag__steps">
                {expandedNode.steps.map((step) => (
                  <StepItem key={step.id} step={step} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
