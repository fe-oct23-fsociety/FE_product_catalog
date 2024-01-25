import React from 'react';
import './container.scss';
import { Card } from '../Card';

type Props = {
  phoneEntities: number[];
};

export const PhonesPageGrid: React.FC<Props> = ({ phoneEntities }) => {
  return (

    <div className="container">
      {phoneEntities.map((phoneEntity) => (
        <Card key={phoneEntity} />
      ))}
    </div>

  );
};

export default PhonesPageGrid;
