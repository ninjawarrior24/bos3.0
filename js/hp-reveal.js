/* Human Platform: reveal from below for title and list items */
(function(){
  if(typeof window === 'undefined') return;
  document.addEventListener('DOMContentLoaded', function(){
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = document.getElementById('human-platform-extend');
    if(!section) return;

    const title = section.querySelector('.section-title');
    const items = Array.from(section.querySelectorAll('.hp-list li'));

    const nodes = [];
    if(title) nodes.push(title);
    nodes.push(...items);
    if(nodes.length === 0) return;

    nodes.forEach((el, i) => {
      el.classList.remove('from-left','from-right');
      el.classList.add('reveal','from-below');
      const delay = Math.min(1200, i * 90);
      el.style.transitionDelay = delay + 'ms';
    });
  });
})();
