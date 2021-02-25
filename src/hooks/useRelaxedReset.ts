import { useEffect, useState } from 'react';

/**
 * Set to true quickly, but reset to false with a delay
 * Can be used to "relax" show/hide animations
 */
const useRelaxedReset = <Value>(value: Value, delay: number): Value => {
  const [relaxedValue, setRelaxedValue] = useState(value);

  useEffect(
    () => {
      const timeout = value
        ? setRelaxedValue(value)
        : setTimeout(() => {
            setRelaxedValue(value);
          }, delay);

      return () => {
        if (timeout) clearTimeout(timeout);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return relaxedValue;
};

export default useRelaxedReset;
