
$(document).ready(function () {

  // hover on avatar
  var hoverTimeout;
  $(".mtp-authors_avatars--hoverable").hover(function () {
    var $this = $(this);

    clearTimeout(hoverTimeout);

    $(".mtp-author_card").removeClass("hovered");
    $(this).children(".mtp-author_card").addClass("hovered");

  }, function () {
    var $this = $(this);

    hoverTimeout = setTimeout(function () {
      $this.children(".mtp-author_card").removeClass("hovered");
    }, 800);

  });
});
