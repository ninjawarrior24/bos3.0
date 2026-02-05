(function(){
  // Reveal text elements on scroll with a performant IntersectionObserver.
  // Respects prefers-reduced-motion and applies a modest stagger.
  if(typeof window === 'undefined') return;
  document.addEventListener('DOMContentLoaded', function(){
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Selectors tuned for textual content — adjust as needed.
    const selector = [
      'h1','h2','h3','h4','h5','h6',
      'p','li','blockquote','figcaption',
      '.section-title','.section-lead',
      '.hero-title .line','.hero-sub',
      '.drake-copy','.feature h3',
      '.gs-icon p','.foot-links a'
    ].join(',');

    let nodes = Array.from(document.querySelectorAll(selector));
    if(nodes.length === 0) return;

    // Filter out hidden elements and cap to avoid heavy work on very large pages
    nodes = nodes.filter(el => el.offsetParent !== null).slice(0, 800);

    // Add base class and enforce a consistent "from-below" reveal for
    // all viewports (desktop and mobile) for visual consistency.
    nodes.forEach((el) => {
      el.classList.add('reveal', 'from-below');
      el.classList.remove('from-left', 'from-right');
    });

    // Use a single observer for efficiency. Lower threshold and larger bottom
    // rootMargin so elements reveal slightly earlier (more sensitive).
    // Make the observer trigger earlier (higher on screen) by increasing
    // the negative bottom rootMargin. This causes elements to be considered
    // intersecting when they enter the top portion of the viewport.
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          // Stagger based on index to create a natural cascading effect
          const idx = nodes.indexOf(el);
          const delay = Math.min(1200, idx * 70); // cap delay
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('is-revealed');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -10% 0px' });

    // Reveal any elements already high enough in the viewport so animations
    // play on first load/refresh. Use a more generous trigger for mobile.
    // Use a later trigger point so elements reveal lower on the page
    // (when they are closer to or below the viewport fold).
    const triggerY = window.innerHeight * 0.95;
    nodes.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const delay = Math.min(800, i * 40);
      if(rect.top <= triggerY && rect.bottom >= -100){
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-revealed');
        // don't observe since already revealed
      } else {
        // use the observer for elements below the trigger
        io.observe(el);
      }
    });
  });
})();
