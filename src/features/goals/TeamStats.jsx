import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

export const TeamStats = () => (
  <section className="pa3 pa5-ns" data-name="slab-stat-small">
    {/* <h3 className="f6 ttu tracked">Project Stats</h3> */}
    <div className="cf">
      <dl className="db dib-l w-auto-l lh-title mr6-l">
        {/* useful for finding github issues count history */}
        {/* https://9-volt.github.io/bug-life/?repo=joshpitzalis/tinyteams */}
        <Sparklines
          data={[3, 12, 13, 8, 9, 10, 12, 21, 19, 22, 32, 46, 55, 51, 71]}
        >
          <SparklinesLine style={{ fill: 'none' }} />
        </Sparklines>
        <dd className="f6 fw4 ml0">Github Issues</dd>
        <dd className="f7 fw4 ml0 o-30">Last updated 18 March</dd>
        <dd className="f2 f-subheadline-l fw6 ml0">71</dd>
      </dl>
      <dl className="db dib-l w-auto-l lh-title mr6-l">
        <dd className="f6 fw4 ml0">Email Subscribers</dd>
        <dd className="f7 fw4 ml0 o-30">Last updated 18 March</dd>
        <dd className="f2 f-subheadline-l fw6 ml0">0</dd>
      </dl>
    </div>
  </section>
);
