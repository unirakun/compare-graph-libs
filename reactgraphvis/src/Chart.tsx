import React, { useState, useEffect } from "react";
// @ts-ignore
import Graph from "react-graph-vis";

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000",
    smooth: true
  },
  interaction: {
    hover: true
  },
  height: "500px"
};

const events = {
  select: function(event: any) {
    var { nodes, edges } = event;
    console.log("selected", nodes, edges);
  }
};

const Chart = () => {
  const [nodes, setNodes] = useState<{ id: number, label: string, title?: string, shape?: string, color?: { } }[]>([
    {
      id: 1,
      label: "REP ",
      title: "REP  1 tootip text",
      shape: "circle",
      color: {
        background: "red",
        highlight: { background: "red" },
        hover: { background: "red" }
      }
    },
    {
      id: 2,
      label: "COU ",
      title: "COU  2 tootip text",
      shape: "box",
      color: {
        background: "green",
        highlight: { background: "green" },
        hover: { background: "green" }
      }
    },
    { id: 3, label: "ASS", title: "ASS 3 tootip text" }
  ]);

  const [edges, setEdges] = useState<{}[]>([
    {
      from: 1,
      to: 2,
      label: "ME17821",
      color: { color: "green", hover: "green", highlight: "green" }
    },
    {
      from: 2,
      to: 3,
      label: "ME17822",
      color: { color: "red", hover: "red", highlight: "red" }
    },
    {
      from: 2,
      to: 1,
      label: "ME17823",
      color: { color: "grey", hover: "grey", highlight: "grey" },
      dashes: true
    }
  ]);

  const [graph, setGraph] = useState({
    nodes,
    edges
  });

  useEffect(() => {
    setGraph({ edges, nodes });
  }, [edges, nodes]);

  return (
    <>
      <button onClick={() => {
          setNodes(old => [...old, { id: 4, label: 'DARVA', shape: 'image', image: 'https://s.qwant.com/fav/d/a/www_darva_com.ico' }])
          setEdges(old => [...old, { from: 1, to: 4, label: 'ME82930', arrowStrikethrough: false }])
      }}>Add</button>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network: any) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </>
  );
};

export default Chart;
