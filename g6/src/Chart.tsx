import React, { useState, useEffect, useRef } from "react";
import G6 from "@antv/g6";

const Chart = () => {
  const containerRef = useRef<any>();
  const graphRef = useRef<G6.Graph>();
  const [nodes, setNodes] = useState<G6.NodeConfig[]>([
    {
      id: "REP",
      label: "REP",
      style: {
        fill: "red",
        stroke: "red"
      }
    },
    {
      id: "COU",
      label: "COU",
      shape: "rect",
      size: 50,
      style: {
        fill: "green",
        stroke: "green",
        radius: 5
      }
    },
    {
      id: "ASS",
      label: "ASS"
    }
  ]);
  const [edges, setEdges] = useState<G6.EdgeConfig[]>([
    // An edge links from node1 to node2
    {
      source: "REP",
      target: "COU",
      label: "ME17821",
      style: {
        stroke: "green",
        endArrow: true
      }
    },
    {
      source: "COU",
      target: "ASS",
      label: "ME17822",
      style: {
        stroke: "red",
        endArrow: true
      }
    },
    {
      source: "COU",
      target: "REP",
      label: "ME17823",
      style: {
        stroke: "grey",
        endArrow: true,
        lineDash: [5, 3]
      }
    }
  ]);

  useEffect(() => {
    if (!graphRef.current) return;
    if (!containerRef.current) return;
    
    graphRef.current.data({ edges, nodes });
    graphRef.current.render();
  }, [edges, nodes]);

  useEffect(() => {
    window.onresize = () => {
      if (!graphRef.current) return;
      if (!containerRef.current) return;

      graphRef.current.changeSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      graphRef.current.fitView([100])
    };
    return () => {
      window.onresize = () => {};
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setNodes(old => [
            ...old,
            {
              id: "DARVA",
              label: "DARVA",
              img: "https://s.qwant.com/fav/d/a/www_darva_com.ico",
              shape: "image",
              size: 50
            }
          ]);
          setEdges(old => [
            ...old,
            {
              source: "REP",
              target: "DARVA",
              label: "ME82930",
              style: { endArrow: true }
            }
          ]);
        }}
      >
        Add
      </button>
      <div
        style={{ width: "90vw", height: "90vh" }}
        ref={e => {
          if (graphRef.current) return;
          if (!e) return;
          containerRef.current = e;
          graphRef.current = new G6.Graph({
            container: e,
            width: e.scrollWidth,
            height: e.scrollHeight,
            // linkCenter: true,
            modes: {
              default: [
                "drag-canvas",
                "drag-node",
                "zoom-canvas",
                "click-select",
                "activate-relations"
              ]
            },
            layout: {
              type: "force",
              preventOverlap: true,
              nodeSize: 150
            },
            defaultEdge: {
              shape: "quadratic",
              labelCfg: {
                autoRotate: true,
                refY: -10
              }
            }
          });

          graphRef.current.on("node:click", e => {
            console.log("Yeah node!", e);
          });

          graphRef.current.on("edge:click", e => {
            console.log("Yeah edge!", e);
          });
        }}
      />
    </>
  );
};

export default Chart;
