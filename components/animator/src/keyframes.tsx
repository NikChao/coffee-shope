const fadeIn = {
  from: { position: 'absolute', opacity: 0 },
  enter: { opacity: 1 },
};

const slideIn = {
  from: { opacity: 0, transform: 'translate3d(0,-10px,0)' },
  enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
};

const fadeOut = {
  leave: { opacity: 0 },
};

const slideOut = {
  leave: {
    opacity: 0,
    transform: 'translate3d(0,-10px,0)',
  },
};

function getSpringConfig({ onMount, onUnmount }: { onMount?: string; onUnmount?: string }) {
  let inAnimation, outAnimation;

  switch (onUnmount) {
    case 'fade-out':
      outAnimation = fadeOut;
      break;
    case 'slide-out':
      outAnimation = slideOut;
      break;
    default:
      break;
  }

  switch (onMount) {
    case 'fade-in':
      inAnimation = fadeIn;
      break;
    case 'slide-in':
      inAnimation = slideIn;
      break;
    default:
      break;
  }

  return {
    ...outAnimation,
    ...inAnimation,
  };
}

export { getSpringConfig };
