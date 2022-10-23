import React from 'react';

export const WrapFieldComponent: React.FC = ({ children }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const [state, setState] = React.useState(
    childrenArray.map((child) => child.props.value)
  );
  const childrenWithProps = React.Children.map(childrenArray, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        uid: `uid_${i}`,
        value: state[i],
        onChange: (k, v) =>
          setState((prev) => {
            const a = [...prev];
            a[i] = v;
            return a;
          }),
      });
    }
    return child;
  });

  return (
    <div>
      {childrenWithProps}
      <div className="">{String(state)}</div>
    </div>
  );
};
