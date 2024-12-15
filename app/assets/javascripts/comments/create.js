// Listen for successful create comment form submissions
$(document).on('ajax:success', '.new-comment-form',
  function (event, data, status, xhr) {

  // Extract JSON response
  const newCommentHtml = data.comment_html;

  // Append the new comment to the comments container
  $('.comments-container').append(newCommentHtml);

  // Hide no-comments placeholder if it was visible
  $('.comments-no-comment-placeholder').hide(); 

  // Clear the form input
  $(this).find('input[type="text"]').val('');

  // Disable the submit button again
  $('#comment-submit-button').prop('disabled', true);
});

// Handle form submission errors
$(document).on('ajax:error', '.new-comment-form', function (event) {
  const errors = event.detail[0].errors || ["An error occurred. Please try again."];
  alert("Failed to post comment: " + errors.join(', '));
});