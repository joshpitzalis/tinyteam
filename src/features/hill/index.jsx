/* eslint-disable */
import React, { useEffect } from 'react';
import 'hill-chart/dist/styles.css';
import HillChart from 'hill-chart';


const data = [
  {
    id: '3', // (optional)
    color: 'red',
    description: 'Late af task',
    size: 10,
    x: 12.069770990416055,
    y: 12.069770990416057,
  },

  {
    id: '2', // (optional)
    color: 'green',
    description: 'Hell yeah!',
    x: 93.48837209302326,
    y: 6.511627906976724,
    size: 10,
  },
];

export const Hill = ({ width, height }) => {

  const config = {
    target: '.hill-chart',
    width: width || 1000,
    height: height || 200,
    preview: false,
  };

  useEffect(() => {
    const hill = new HillChart(data,  config );
    hill.render();
  }, []);
  return <svg className="hill-chart" />;
};
