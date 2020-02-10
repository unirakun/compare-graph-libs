import React, { useState, useEffect } from "react";
import {
  Sigma,
  EdgeShapes,
  NodeShapes,
  ForceAtlas2,
  RelativeSize,
  NOverlap,
  RandomizeNodePositions
  // @ts-ignore
} from "react-sigma";

const Chart = () => {
  const [nodes, setNodes] = useState([
    {
      id: "REP",
      label: "REP",
      color: "red",
      size: 1
    },
    {
      id: "COU",
      label: "COU",
      color: "green",
      type: "square",
      size: 1
    },
    {
      id: "ASS",
      label: "ASS",
      color: "grey",
      size: 1
    }
    // {
    //     "id": "DARVA",
    //     "label": "DARVA",
    //     "color": "grey",
    //     "type": "image",
    //     "image": {
    //         "url": "/darva.jpg"
    //     },
    //     "size": 1
    // }
  ]);

  const [edges, setEdges] = useState([
    {
      id: "ME17821",
      label: "ME17821",
      source: "REP",
      target: "COU",
      color: "green"
    },
    {
      id: "ME17822",
      label: "ME17822",
      source: "COU",
      target: "ASS",
      color: "red"
    },
    {
      id: "ME17823",
      label: "ME17823",
      source: "COU",
      target: "REP",
      color: "grey"
    }
  ]);

  const [data, setData] = useState<any>({ nodes: [], edges: [] });

  useEffect(() => {
    setData({ nodes, edges });
  }, [nodes, edges]);

  return (
    <>
      <button
        onClick={() => {
          setNodes(old => [
            ...old,
            {
              id: "DARVA",
              label: "DARVA",
              color: "grey",
              type: "image",
              image: {
                url: "https://s.qwant.com/fav/d/a/www_darva_com.ico"
              },
              size: 1
            }
          ]);

          setEdges(old => [
            ...old,
            {
              id: "ME82930",
              label: "ME82930",
              source: "REP",
              target: "DARVA",
              color: "green"
            }
          ]);
        }}
      >
        Add
      </button>
      {data.nodes.length && (
        <Sigma
          style={{
            width: "90vw",
            height: "90vh",
            flex: 1
          }}
          autoRescale
          graph={data}
          renderer="canvas"
          onClickNode={(e: any) =>
            console.log("node", e)
          }
          onClickEdge={(e: any) =>
            console.log("edge", e)
          }
          settings={{ drawEdges: true, drawEdgeLabels: true, clone: true }}
        >
          <RandomizeNodePositions />
          <ForceAtlas2
            iterationsPerRender={1}
            linLogMode
            timeout={100}
            worker
          />
          <RelativeSize initialSize={15} />
          <EdgeShapes default="curvedArrow" />
          <NodeShapes default="circle" />
          <NOverlap gridSize={10} maxIterations={100} />
        </Sigma>
      )}
    </>
  );
};

export default Chart;
