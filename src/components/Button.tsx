import { ElementType } from 'react';
import mergeClasses from 'utils/mergeClasses';

export enum ButtonColor {
  Gray = 'gray',
  Blue = 'blue',
}

const baseClasses =
  'inline-flex items-center justify-center px-5 py-3 font-semibold leading-none rounded';

const colors = {
  gray: 'text-gray-500 bg-gray-200 rounded hover:bg-gray-300',
  blue: 'text-white bg-blue-500 hover:bg-blue-600',
};

interface Props {
  className?: string;
  color?: ButtonColor;
  as?: ElementType;
}

const Button: React.FC<Props> = ({
  className,
  color = ButtonColor.Blue,
  children,
  as = 'button',
}) => {
  const Component = as;
  const colorClasses = colors[color];

  return (
    <Component
      type="button"
      className={mergeClasses(baseClasses, colorClasses, className)}
    >
      {children}
    </Component>
  );
};

export default Button;
