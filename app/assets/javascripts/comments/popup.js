// Namespace
let PhotoCommentsPopup = {
  isOpen: Boolean = false,

  getPhotoComments: function(photoId) {
    const currentUrl = window.location.href;
    $.ajax({type: 'GET',
            url: currentUrl + "/photos/" + photoId + "/comments",
            timeout: 5000,
            success: PhotoCommentsPopup.showPhotoComments,
            error: function(xhrObj, textStatus, exception) { alert('Error!'); }
            });
    return(false);
  },

  showPhotoComments: function(data, requestStatus, xhrObject) {
    const oneFourth = Math.ceil($(window).width() / 4);
    $('.home-photo-comments-popup')
      .css({'left': oneFourth,  'width': 2*oneFourth, 'top': 150 })
      .html(data)
      .show();
    
    PhotoCommentsPopup.isOpen = true;
    
    $('#closeLink').click(PhotoCommentsPopup.hidePhotoComments);

    return(false);
  },

  hidePhotoComments: function() {
    $('.home-photo-comments-popup').hide();

    PhotoCommentsPopup.isOpen = false;

    return(false);
  }
};

// Disable or enable the submit button based on input value
$(document).on('input','#new-comment-input', function (event) {
  const submitButton = $('#comment-submit-button');
  if ($(this).val().trim() === '') {
    submitButton.prop('disabled', true);
  } else {
    submitButton.prop('disabled', false);
  }
});

// Bind ESC key to closing of the comments pop-up
$(document).on('keydown', function (e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    if (PhotoCommentsPopup.isOpen) {
      PhotoCommentsPopup.hidePhotoComments();
    }
  }
});