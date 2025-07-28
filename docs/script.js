document.addEventListener('DOMContentLoaded', () => {
//balls
  const container = document.getElementById('floating-balls');
const ballCount = Math.floor(window.innerWidth * window.innerHeight / 12000); 

for (let i = 0; i < ballCount; i++) {
  const ball = document.createElement('div');
  ball.classList.add('floating-ball');
  const size = Math.random() * 5 + 7;
  const posX = Math.random() * window.innerWidth;
  const posY = Math.random() * window.innerHeight;
  const duration = Math.random() * 30 + 10;
  const delay = Math.random() * -30;
  const opacity = Math.random() * 0.4 + 0.1;
  const directionX = (Math.random() - 0.5) * 200; 
  const directionY = (Math.random() - 0.5) * 200; 
  const animationName = `float-${i}`;
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes ${animationName} {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(${directionX}px, ${directionY}px);
      }
    }
  `, styleSheet.cssRules.length);

  ball.style.width = `${size}px`;
  ball.style.height = `${size}px`;
  ball.style.left = `${posX}px`;
  ball.style.top = `${posY}px`;
  ball.style.opacity = opacity;
  ball.style.position = 'absolute';
  ball.style.borderRadius = '50%';
  ball.style.background = 'radial-gradient(circle, rgba(86, 97, 249, 1) 0%, rgba(86, 97, 249, 0.8) 100%)';
  ball.style.animation = `${animationName} ${duration}s linear infinite`;
  ball.style.animationDelay = `${delay}s`;

  container.appendChild(ball);
}

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
  // lates downloader (this is in beta kinda but seems fine)
  document.querySelectorAll('.primary-button').forEach(button => {
    if (button.textContent.includes('Download')) {
      button.addEventListener('click', async () => {
        const repo = 'xfi0/Titled';
        const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const downloadUrl = data.assets[0].browser_download_url;
          window.open(downloadUrl, '_blank');
        } catch (err) {
          alert('ErroR! ' + err.message);
        }
      });
    }
  });
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