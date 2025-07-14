document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.square-box');
  const threshold = 350;

  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  const lerpFactor = 0.1; 

  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  function update() {
    currentRotateX = lerp(currentRotateX, targetRotateX, lerpFactor);
    currentRotateY = lerp(currentRotateY, targetRotateY, lerpFactor);

    box.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

    requestAnimationFrame(update);
  }

  document.addEventListener('mousemove', (e) => {
    const rect = box.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distTopLeft = Math.hypot(mouseX - rect.left, mouseY - rect.top);
    const distTopRight = Math.hypot(mouseX - rect.right, mouseY - rect.top);
    const distBottomLeft = Math.hypot(mouseX - rect.left, mouseY - rect.bottom);
    const distBottomRight = Math.hypot(mouseX - rect.right, mouseY - rect.bottom);

    const nearCorner =
      distTopLeft < threshold ||
      distTopRight < threshold ||
      distBottomLeft < threshold ||
      distBottomRight < threshold;

    if (!nearCorner) {
      targetRotateX = 0;
      targetRotateY = 0;
      return;
    }

    const boxCenterX = rect.left + rect.width / 2;
    const boxCenterY = rect.top + rect.height / 2;

    const xPercent = (mouseX - boxCenterX) / (rect.width / 2);
    const yPercent = (mouseY - boxCenterY) / (rect.height / 2);

    const maxRotation = 10;

    targetRotateX = maxRotation * -yPercent;
    targetRotateY = maxRotation * xPercent;
  });

  window.addEventListener('mouseout', () => {
    targetRotateX = 0;
    targetRotateY = 0;
  });

  update(); 
});
// auto latest downloader
 document.getElementById('download-latest').addEventListener('click', async () => {
    const repo = 'xfi0/Titled'; // user / repo
    const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch release info');

      const data = await response.json();
      if (!data.assets || data.assets.length === 0) throw new Error('No assets found in latest release');

      const downloadUrl = data.assets[0].browser_download_url;

      window.open(downloadUrl, '_blank');
    } catch (err) {
      alert('Error fetching latest release: ' + err.message);
    }
  });
