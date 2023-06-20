import { useCallback, useLayoutEffect } from 'react';

export function useBodyScrollLock() {
  const lockScroll = useCallback(() => {
    const body = document.body;
    const scrollBarWidth = window.innerWidth - body.clientWidth;
    document.body.style.overflow = 'hidden';
    body.style.marginRight = `${scrollBarWidth}px`;
  }, []);

  const unLockScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
    const body = document.body;
    body.style.overflow = '';
    body.style.marginRight = '';
  }, []);

  useLayoutEffect(() => {
    lockScroll();
    return () => {
      unLockScroll();
    };
  }, [lockScroll, unLockScroll]);

  return { lockScroll, unLockScroll };
}
