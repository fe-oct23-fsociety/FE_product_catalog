import React from 'react';

import './RecommendedBlock.scss';

import { RecommendedCard } from '../RecommendedCard/RecommendedCard';

export const RecommendedBlock: React.FC = () => {
  return (
    <div className="contain">
      <RecommendedCard />
      <RecommendedCard />
      <RecommendedCard />
      <RecommendedCard />
      <RecommendedCard />
    </div>
  );
};

export default RecommendedBlock;
