import React from 'react';

interface Props {
  length: number;
}

const Times: React.FC<Props> = ({ length, children }) => (
  <>
    {Array(length)
      .fill(null)
      .map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>{children}</React.Fragment>
      ))}
  </>
);

export default Times;
