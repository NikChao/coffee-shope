function mergeEventHandlers (eventHandlers) {
  return function (e) {
    const newHandlers = Object.keys(eventHandlers)
      .reduce((accum, key) => {
        accum[key] = function(event) {
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