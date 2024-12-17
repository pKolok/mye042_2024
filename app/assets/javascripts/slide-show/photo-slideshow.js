$(document).on('turbolinks:load', function () {
  const $containers = $('.home-photo');

  const currentIndeces = new Array($containers.length).fill(0);
  const imageElements = [];
  const titleElements = [];
  let slideshowInterval;
  let clickTimeout;

  $containers.each(function(userIndex) {
    const $container = $(this);

    const images = $container.data('images');
    
    // Keep img and title HTML Elements
    imageElements.push($container.find('img'));
    titleElements.push($container.next());
    
    // Set up initial image if images exist
    if (images.length > 0) {
      updateSlideshow(images, userIndex);
    }

    // Add event listeners for mouse enter and leave
    $container.on('mouseenter', function() {
      if (PhotoCommentsPopup.isOpen) {
        return;
      }

      startSlideshow(images, userIndex);
    });
    $container.on('mouseleave', function() {
      if (PhotoCommentsPopup.isOpen) {
        return;
      }

      stopSlideshow();
    });

    // Add event listener for mouse click
    $container.on('click', function() {
      // Clear any existing timeout to distinguish from a double-click
      clearTimeout(clickTimeout);

      // Set a timeout for the single-click action
      clickTimeout = setTimeout(function () {
        stopSlideshow();

        PhotoCommentsPopup.getPhotoComments(
          images[currentIndeces[userIndex]].id);
      }, 300); // 300ms delay to detect potential double-clicks
    });

    if (userIndex === 0) {
      // Add event listener for mouse double click on current user pictures
      $container.on('dblclick', function() {
        // Clear the single-click timeout to prevent it from firing
        clearTimeout(clickTimeout);
  
        // Get the user ID
        const userId = extractUserId(window.location.href)
        // Get the photo ID
        const photoId = images[currentIndeces[userIndex]].id;
  
        // Send the DELETE request via AJAX
        $.ajax({
          url: `/users/${userId}/photos/${photoId}`, // Adjust userId as needed
          type: 'DELETE',
          success: function (response) {
            // Remove image from list of images in memory
            const photoIndex = currentIndeces[userIndex];
            images.splice(photoIndex, 1);

            // Treat case when user deletes last (in row) image
            currentIndeces[userIndex] = currentIndeces[userIndex] % 
              images.length;
  
            updateSlideshow(images, userIndex);
          },
          error: function (xhr, status, error) {
            // Handle errors
            console.error('Failed to delete photo:', error);
            alert('Failed to delete the photo.');
          },
        });
        
      });
    }

  });

  function startSlideshow(userImages, userIndex) {
    slideshowInterval = setInterval(() => {
      currentIndeces[userIndex] = (currentIndeces[userIndex] + 1) %
        userImages.length;
      updateSlideshow(userImages, userIndex);
    }, 2000);
  }

  function stopSlideshow() {
    clearInterval(slideshowInterval);
  }

  function updateSlideshow(userImages, userIndex) {
    if (userImages.length > 0) {
      const currentImage = userImages[currentIndeces[userIndex]];

      imageElements[userIndex].attr('src', currentImage.src);

      if (currentImage.title) {
        titleElements[userIndex].text(currentImage.title);
        titleElements[userIndex].css('font-style', 'normal');
      } else {
        titleElements[userIndex].text("No title given");
        titleElements[userIndex].css('font-style', 'italic')
      }
    } else {
      imageElements[userIndex].attr('src', "");
      titleElements[userIndex].remove();
      $('.home-photo#current-user').replaceWith('<div class="home-no-photos">Please add some photos</div>')
    }
  }

});

function extractUserId(url) {
  const regex = /\/users\/(\d+)(\/|$)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}