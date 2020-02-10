import React, { useState, useEffect } from "react";
// then import echarts modules those you have used manually.
import echarts, { EChartOption } from "echarts/lib/echarts";
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';

// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
import "echarts/lib/chart/graph";
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';

// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';

// import 'echarts/lib/component/title';

// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';

// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';

// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

// import 'zrender/lib/vml/vml';

const Chart = () => {
  const [data, setData] = useState<EChartOption.SeriesGraph.DataObject[]>([
    {
      name: "REP"
    },
    {
      name: "COU",
      symbol: 'rectangle',
      itemStyle: {
        color: 'green',
      },
    },
    {
      name: "ASS",
    }
  ]);

  const [links, setLinks] = useState<{ source: string, target: string, name: string, lineStyle?: { color?: string, type?: string } }[]>([
    {
      source: "REP",
      target: "COU",
      name: "ME17821",
      lineStyle: {
        color: 'green',
      }
    },
    {
      source: "COU",
      target: "ASS",
      name: "ME17822",
      lineStyle: {
        color: 'red',
      }
    },
    {
      source: "COU",
      target: "REP",
      name: "ME17823",
      lineStyle: {
        color: 'grey',
        type: 'dashed'
      }
    }
  ]);

  const [series, setSeries] = useState<EChartOption.SeriesGraph[]>([
    {
      name: "AUTO",
      type: "graph",
      layout: "force",
      symbolSize: 10,
      draggable: true,
      edgeSymbol: ["circle", "arrow"],
      focusNodeAdjacency: true,
      left: '5%',
      top: '5%',
      width: '90%',
      height: '90%',
      edgeLabel: {
        show: true,
        formatter: (params: { data: { name: string } }) => params.data.name,
      },
      label: {
        show: true
      },
      lineStyle: {
        color: "source",
        curveness: 0.3
      },
      emphasis: {
        lineStyle: {
          width: 10
        }
      },
      force: {
        layoutAnimation: true,
        repulsion: 100,
        gravity: 0.3,
      },
      roam: true
    }
  ]);
  const [options, setOptions] = useState<EChartOption>({
    series: [],
  });

  useEffect(() => {
    setOptions(old => ({ ...old, series }));
  }, [series]);

  useEffect(() => {
    // @ts-ignore: ts-2345,ts-10005
    setSeries(old => [{ ...old[0], data, links }]);
  }, [data, links]);

  return (
    <div style={{ height: '50vh' }}>
      <button
        onClick={() => {
          setData(old => [...old, { name: "DARVA", symbol: 'image://https://s.qwant.com/fav/d/a/www_darva_com.ico' }]);
          setLinks(old => [...old, { source: "REP", target: "DARVA", name: "ME82930" }]);
        }}
      >
        Add
      </button>
      <div style={{ width: '90vw', height: '90vh', position: 'relative' }} ref={(ref) => {
        if (ref === null) return;
        const chart = echarts.init(ref, undefined, { width: 'auto', height: 'auto' });
        chart.setOption(options);
        chart.on('dataZoom', () => console.log('zooooom'))
        chart.on('click', (params: {}) => console.log(params))
        window.onresize = () => {
          chart.resize()
        }
        // chart.dispatchAction({ type: 'datazoom', start: 10, end: 20 })
      }} />
      {/* <ReactEchartsCore
        echarts={echarts}
        option={options}
        notMerge={true}
        lazyUpdate={true}
        // style={{ height: 1000 }}
        // theme={"theme_name"}
        onChartReady={chart => {
          console.log('chart ready')
        }}
        onEvents={{
          click: (what) => (what.dataType && what.dataType === "node" && alert(what.data.name)),
        }}
        //   opts={}
      /> */}
    </div>
  );
};

export default Chart;
