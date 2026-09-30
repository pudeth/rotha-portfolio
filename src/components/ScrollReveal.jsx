import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up', // 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in'
  delay = 0,
  threshold = 0.12,
  once = true
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  let animClass = 'reveal-init';
  let activeClass = 'reveal-visible';
  if (animation === 'fade-left') {
    animClass = 'reveal-init-left';
    activeClass = 'reveal-visible-left';
  } else if (animation === 'fade-right') {
    animClass = 'reveal-init-right';
    activeClass = 'reveal-visible-right';
  } else if (animation === 'zoom-in') {
    animClass = 'reveal-init-scale';
    activeClass = 'reveal-visible-scale';
  }

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${animClass} ${isVisible ? activeClass : ''} ${className}`}
    >
      {children}
    </div>
  );
}
