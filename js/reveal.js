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

    // Add base class and alternate direction (left/right) in document order
    nodes.forEach((el, i) => {
      el.classList.add('reveal');
      // even = from-left, odd = from-right
      el.classList.add((i % 2) === 0 ? 'from-left' : 'from-right');
    });

    // Use a single observer for efficiency
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
    }, { threshold: 0.08, rootMargin: '0px 0px -25% 0px' });

    // Reveal any elements already high enough in the viewport so animations
    // play on first load/refresh. Match the observer's rootMargin (-25% bottom).
    const triggerY = window.innerHeight * 0.75; // 100% - 25%
    nodes.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const delay = Math.min(800, i * 40);
      if(rect.top <= triggerY){
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
