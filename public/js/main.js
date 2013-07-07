// Remove the ugly Facebook appended hash
// <https://github.com/jaredhanson/passport-facebook/issues/12>
if (window.location.hash && window.location.hash === "#_=_") {
  // If you are not using Modernizr, then the alternative is:
  //   `if (window.history && history.pushState) {`
  if (Modernizr.history) {
    window.history.pushState("", document.title, window.location.pathname);
  } else {
    // Prevent scrolling by storing the page's current scroll offset
    var scroll = {
      top: document.body.scrollTop,
      left: document.body.scrollLeft
    };
    window.location.hash = "";
    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scroll.top;
    document.body.scrollLeft = scroll.left;
  }
}

$(function () {
  // handle "data-method" links
  $('a[data-method]').on('click', function () {
    var method = $(this).data('method');
    var action = $(this).attr('href');
    var confirmMsg = $(this).data('confirm');
    var form = $('<form hidden="true" method="post" action="' + action + '"></form>');
    form.append($('<input type="hidden" name="_method" value="' + method + '" />'));

    if (confirmMsg && !confirm(confirmMsg)) {
      return false;
    }

    $('body').append(form);
    form.submit();

    return false;
  });
});