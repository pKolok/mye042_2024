// Listen for successful delete responses
$(document).on('ajax:success', '.comment-delete-icon', function (event) {

  // The element that triggered the AJAX request
  const target = event.target;

  // Check if the clicked link is a delete link
  if ($(target).is("[data-method='delete']")) {
    // Find the parent comment div
    const commentDiv = $(target).closest("[id^='comment-']");
    // Remove the comment div from the DOM
    commentDiv.remove();
  }

  // Check if no comments remain
  const $comments = $('.comment');
  if ($('.comment').length === 0) {
    $('.comments-no-comment-placeholder').show();
  }
});
  
// Handle AJAX errors
$(document).on('ajax:error', '.comment-delete-icon', function (event) {
  alert('Failed to delete the comment. Please try again.');
});