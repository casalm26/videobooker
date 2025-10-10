import { useEffect, useState } from 'react';

type Viewport = {
  width: number;
  height: number;
};

const DEFAULT_VIEWPORT: Viewport = { width: 1280, height: 720 };

export function useViewport() {
  const [viewport, setViewport] = useState<Viewport>(() => {
    if (typeof window !== 'undefined') {
      return { width: window.innerWidth, height: window.innerHeight };
    }

    return DEFAULT_VIEWPORT;
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewport;
}
