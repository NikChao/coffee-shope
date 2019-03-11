import React from "react";

interface Handlers { [key: string]: any };

function mergeEventHandlers (eventHandlers: Handlers) {
  return function (e: Handlers) {
    const newHandlers: Handlers = Object.keys(eventHandlers)
      .reduce((accum: Handlers, key) => {
        accum[key] = function(event: React.SyntheticEvent<any>) {
          const originalHandler = eventHandlers[key];
            originalHandler(event);
            if (typeof e[key] === 'function') {
              e[key](event);
            }
          }

          return accum;
      }, {});

    return {
      ...e,
      ...newHandlers
    }
  }
};

export default mergeEventHandlers;
export { mergeEventHandlers };