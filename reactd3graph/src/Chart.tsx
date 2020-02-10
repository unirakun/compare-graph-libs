import React, { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";

const options = {
  linkHighlightBehavior: true,
  nodeHighlightBehavior: true,
  directed: true,
  // staticGraphWithDragAndDrop: true,
  node: {
    highlightStrokeColor: "blue"
  },
  link: {
    highlightColor: "blue",
    renderLabel: true,
    type: "CURVE_SMOOTH"
  },
  panAndZoom: true
};

const Chart = () => {
  const [data, setData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: []
  });

  const [nodes, setNodes] = useState([
    { id: "REP", color: "red" },
    { id: "COU", color: "green", symbolType: "square" },
    { id: "ASS" }
  ]);

  const [links, setLinks] = useState([
    { source: "REP", target: "COU", label: "ME17821", color: "green" },
    { source: "COU", target: "ASS", label: "ME17822", color: "red" },
    { source: "COU", target: "REP", label: "ME17823" }
  ]);

  useEffect(() => {
    setData({ nodes, links });
  }, [nodes, links]);

  return (
    <>
      <button
        onClick={() => {
          setNodes(old => [
            ...old,
            {
              id: "DARVA",
              viewGenerator: ({ id, size }: any) => {
                return (
                  <div
                    style={{
                      width: 20 / size,
                      height: 20 / size,
                      backgroundImage:
                        "url(https://s.qwant.com/fav/d/a/www_darva_com.ico)",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat no-repeat",
                      backgroundSize: "contain"
                    }}
                  >
                    {id}
                  </div>
                );
              }
            }
          ]);

          setLinks(old => [
            ...old,
            {
              source: "REP",
              target: "DARVA",
              label: "ME82930"
            }
          ]);
        }}
      >
        Add
      </button>
      {data.nodes.length && (
        <Graph
          id="graph-id"
          data={data}
          config={options}
          onClickNode={(nodeId: any) => console.log("node clicked", nodeId)}
          onClickLink={(source: any, target: any) =>
            console.log("link clicked", { source, target })
          }
        />
      )}
    </>
  );
};

export default Chart;
