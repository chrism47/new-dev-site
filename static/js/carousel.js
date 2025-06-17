const images = document.querySelectorAll('.carousel-img');
    let currentIndex = 0;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    document.querySelector('.prev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    document.querySelector('.next').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    // Touch support
    const carousel = document.getElementById('carousel');
    let startX = 0;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          currentIndex = (currentIndex + 1) % images.length;
        } else {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        showImage(currentIndex);
      }
    });