document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('hamburgerMenu');
  
  if (hamburger && menu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
      }
    });
    
    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
      });
    });
  }
});
