import Icon from 'antd/lib/icon';
import Slider from 'antd/lib/slider';
import React from 'react';
import { useFireColl } from '../../hooks/firebase';
// 'Dec 11th'

const marks = (setVisbility, setColor) => ({
  0: {
    date: 'Dec 11th',
    details: 'Project Started',
    label: (
      <Objective
        icon="trophy"
        color={null}
        setColor={setColor}
        setVisbility={setVisbility}
        fontSize="24px"
      />
    )
  },
  16: {
    style: {
      fontSize: '24px'
    },
    label: <Icon type="trophy" />
  },
  37: {
    style: {
      fontSize: '24px'
    },
    label: (
      <Objective
        icon="trophy"
        color={null}
        setColor={setColor}
        setVisbility={setVisbility}
        fontsize="24px"
      />
    )
  },
  50: {
    style: {
      color: '#70bdd2',
      fontSize: '24px'
    },
    label: (
      <Icon
        type="rocket"
        className="rot30"
        onClick={() => {
          setColor('#70bdd2');
          setVisbility(true);
        }}
        onMouseLeave={() => {
          setColor(null);
          setVisbility(false);
        }}
      />
    )
  },
  70: {
    style: {
      color: '#f4c368',
      fontSize: '24px'
    },
    label: <Icon type="rocket" />
  },
  100: {
    style: {
      color: '#4191f7',
      fontSize: '24px'
    },
    label: <Icon type="rocket" />
  },

  231: {
    style: {
      color: '#a9749e',
      fontSize: '24px'
    },
    label: <Icon type="rocket" />
  },
  365: {
    style: {
      color: '#de5c37',
      fontSize: '24px'
    },
    label: <Icon type="rocket" />
  }
});
export const Stats = () => {
  const [value, setValue] = React.useState(42);
  const [color, setColor] = React.useState(null);
  const [visible, setVisbility] = React.useState(false);
  const objectives = useFireColl(`objectives`);
  console.log('objectives', objectives);
  // tk reduce objectives array into mark object liket he one above
  return (
    <div data-testid="goalRoad">
      <div className="h3 flex align-items">
        {visible && (
          <div data-testid="detailsBox" className="w-100 tc pa3">
            <h1 style={{ color: `${color}` }}>hello</h1>
          </div>
        )}
      </div>
      <div
        className="mw9 center ph3 ph5-ns mb6"
        onMouseLeave={() => setValue(42)}
      >
        <Slider
          marks={marks(setVisbility, setColor)}
          onChange={val => setValue(val)}
          value={value}
          max={365}
          tipFormatter={e => e * 2}
          tooltipVisible
        />
      </div>
    </div>
  );
};

const Objective = ({ icon, color, setColor, setVisbility, fontSize }) => {
  return (
    <div
      data-testid="objective"
      onMouseEnter={() => {
        setColor(color);
        setVisbility(true);
      }}
      onMouseLeave={() => {
        setColor(color);
        setVisbility(true);
      }}
      onMouseLeave={() => {
        setColor(null);
        setVisbility(false);
      }}
    >
      <Icon type={icon} className="rot30" style={{ fontSize }} />
    </div>
  );
};

export const TeamStats = () => {
  return (
    <section className="pa3 pa5-ns" data-name="slab-stat-small">
      <h3 className="f6 ttu tracked">Today</h3>
      <div className="cf">
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">Votes cast</dd>
          <dd className="f3 fw6 ml0">24</dd>
        </dl>
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">Todos created</dd>
          <dd className="f3 fw6 ml0">3</dd>
        </dl>
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">Hour Worked</dd>
          <dd className="f3 fw6 ml0">44</dd>
        </dl>
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">Chat Comments</dd>
          <dd className="f3 fw6 ml0">102</dd>
        </dl>

        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
          <dd className="f6 fw4 ml0">People</dd>
          <dd className="f3 fw6 ml0">3</dd>
        </dl>
        <dl className="fl fn-l w-50 dib-l w-auto-l lh-title">
          <dd className="f6 fw4 ml0">Days left</dd>
          <dd className="f3 fw6 ml0">126</dd>
        </dl>
      </div>
    </section>
  );
};
