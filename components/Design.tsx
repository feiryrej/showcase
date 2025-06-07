import React from 'react';
import { ExpandableCardDemo } from './ExpandableCard';

function Design() {
  return (
    <div id="design" className="relative dark:bg-black-100 bg-white dark:bg-grid-white/[0.02] bg-grid-black/[0.3] min-h-screen">
      <div className="py-20">
        <h1 className="heading">
          A list of my <span className="text-purple">recent designs</span>
        </h1>
      </div>

      <ExpandableCardDemo />
    </div>
  );
}

export default Design;
