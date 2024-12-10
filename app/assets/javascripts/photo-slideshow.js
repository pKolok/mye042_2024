document.addEventListener('turbolinks:load', function () { 
  const $containers = $('.home-photo');

  const slideshowIntervals = new Array($containers.length);
  const currentIndeces = new Array($containers.length).fill(0);
  const imageElements = [];
  const titleElements = [];

  $containers.each(function(followeeIndex) {
    const $container = $(this);

    const imageData = $container.data('images');
    
    imageElements.push($container.find('img'));
    titleElements.push($container.next());
    
    // Set up initial image if images exist
    if (imageData.length > 0) {
      updateSlideshow(imageData, followeeIndex);
    }

    // Add event listeners for mouse enter and leave
    $container.on('mouseenter', function() { 
      startSlideshow(imageData, followeeIndex);
    });
    $container.on('mouseleave', function() {
      stopSlideshow(followeeIndex);
    });
  });

  function startSlideshow(imageData, followeeIndex) {
    if (!slideshowIntervals[followeeIndex]) {
      slideshowIntervals[followeeIndex] = setInterval(() => {
        currentIndeces[followeeIndex] = (currentIndeces[followeeIndex] + 1) %
          imageData.length;
        updateSlideshow(imageData, followeeIndex);
      }, 1000); // Change image every 2 seconds
    }
  }

  function stopSlideshow(followeeIndex) {
    clearInterval(slideshowIntervals[followeeIndex]);
    slideshowIntervals[followeeIndex] = null;
  }

  function updateSlideshow(imageData, followeeIndex) {
    if (imageData.length > 0) {
      const currentImage = imageData[currentIndeces[followeeIndex]];

      imageElements[followeeIndex].attr('src', currentImage.src);

      if (currentImage.title) {
        titleElements[followeeIndex].text(currentImage.title);
        titleElements[followeeIndex].css('font-style', 'normal');
      } else {
        titleElements[followeeIndex].text("No title given");
        titleElements[followeeIndex].css('font-style', 'italic')
      }
    }
  }
  
});