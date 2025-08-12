document.addEventListener('DOMContentLoaded', () => {
  particlesJS('floating-balls', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 700 } },
      color: { value: "#a6b0ff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.6,
        random: true,
        anim: { enable: true, speed: 0.6, opacity_min: 0.15, sync: false }
      },
      size: {
        value: 5,
        random: true,
        anim: { enable: true, speed: 2, size_min: 1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 140,
        color: "#bcaaff",
        opacity: 0.2,
        width: 1.5
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false }
      }
    },
  });

  //smooth scorleing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // latest downloader
  document.querySelectorAll('.primary-button').forEach(button => {
  if (button.textContent.includes('Download') || button.textContent.includes('Get Started')) {
    button.addEventListener('click', () => Download());
  }
});
document.querySelectorAll('.secondary-button').forEach(button => {
  if (button.textContent.includes('Features')) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const featuresSection = document.querySelector('#features');
      if (featuresSection) {
        window.scrollTo({
          top: featuresSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  }
  else if (button.textContent.includes('Discord')) {
    button.addEventListener('click', () => {
      window.open('https://discord.gg/SXV8Bmy4Tt', '_blank');
    });
  }
});
  // downloads latest from githubs api
function Download() {
  const repo = 'xfi0/Titled';
  const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("Starting Download..."); // not sure if logging should be aval to the pub but im leaving it
      const downloadUrl = data.assets[0].browser_download_url;
      window.open(downloadUrl, '_blank');
    })
    .catch(err => {
      console.log('Download Error: ' + err.message);
    });
}

  // discord button
  document.querySelectorAll('.secondary-button').forEach(button => {
    if (button.textContent.includes('Discord')) {
      button.addEventListener('click', () => {
        window.open('https://discord.gg/SXV8Bmy4Tt', '_blank');
      });
    }
  });

//scrolll shit
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 11, 26, 0.95)';
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(10, 11, 26, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.feature-card, .section-header').forEach(el => {
    observer.observe(el);
  });
});