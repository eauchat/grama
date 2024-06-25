
$(document).ready(function () {
  $('a[rel="lightbox"]').{pluginName}({
    openSpeed: {openSpeed},
    closeSpeed: {closeSpeed},
    closeOnClick: "{closeOnClick}",
    closeOnEsc: "{closeOnEsc}",
    root: "{root}",
    afterContent: function () {
      var imageTitle = this.$currentTarget.find("img").attr("alt");
      this.$instance.find(".featherlight-image_title").remove();
      if (imageTitle) $('<div class="featherlight-image_title">').text(imageTitle).appendTo(this.$instance.find(".featherlight-content"));
    },
    onResize: function () {
      // got to do this because well it would be to easy if featherlight was done in a way this could be done with css
      // without this, title text get's wider than the image
      this.$instance.find(".featherlight-image_title").width(this.$instance.find(".featherlight-image").width());
    },
  });
});
