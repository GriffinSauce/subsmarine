import { FunctionComponent } from 'react';

const Container: FunctionComponent = ({ children }) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Container;
