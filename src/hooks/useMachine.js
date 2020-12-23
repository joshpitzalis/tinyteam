/* eslint-disable */

import { useEffect, useMemo, useState } from 'react';
import { interpret } from 'xstate/lib/interpreter';

export function useMachine(machine, options = {}) {
  const [current, setCurrent] = useState(machine.initialState);
  const service = useMemo(
    () =>
      interpret(machine)
        .onTransition((state) => {
          setCurrent(state);
        })
        // .onEvent((e) => options.log && console.log('EVENT:', e))
        .start(),
    []
  );

  useEffect(() => () => service.stop(), []);

  return [current, service.send];
}
