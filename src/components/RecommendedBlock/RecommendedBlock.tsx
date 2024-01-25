import React from 'react';

import './RecommendedBlock.scss';

// import iphoneImage from '../../images/iPhone.png';
// import heartIcon from '../../images/icons/heart.svg';
// import { BtnSquare } from '../BtnSquare';
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
