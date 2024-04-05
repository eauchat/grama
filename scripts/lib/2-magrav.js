
const queryParams = new URLSearchParams(window.location.search);

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const grama = {
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //                                                  QUERY PARAMETERS GETTER/SETTER
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

  /**
    DESCRIPTION: get value from current url query
    ARGUMENTS: ( !key <string> « key you want to get value of » )
    RETURN: <any>
  */
  queryGet: function (key) { return queryParams.get(key); },

  /**
    DESCRIPTION: set value from current url query
    ARGUMENTS: (
      !key <string> « key you want to get value of »,
      !value <any> « value to set »,
    )
    RETURN: <void>
  */
  querySet: function (key, value) {
    queryParams.set(key, value);
    let newurl = window.location.protocol +"//"+ window.location.host + window.location.pathname +"?"+ queryParams.toString();
    // window.history.pushState({ path: newurl }, "", newurl); // current state will be kept in history (previous button will go back to it)
    window.history.replaceState({ path: newurl }, "", newurl); // current state will not be kept in history (previous button will not go back to it)
  },

  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //                                                  GET LOCALE FROM BROWSER
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

  /**
    DESCRIPTION: check browser preferences and return locale code matching the one of the browser (if browser locale is a supported language)
    ARGUMENTS: ( ø )
    RETURN: <string|undefined>
  */
  getLocaleFromBrowser: function () {

    let browserLanguage = window.navigator.userLanguage || window.navigator.language;

    // iterate supportedLanguages to see if browser language is supported
    let i = 0;
    let supportedLanguageCodes = _.keys(languages);
    while (i < supportedLanguageCodes.length) {
      if (browserLanguage.match(
        new RegExp("^"+ supportedLanguageCodes[i])
      )) return supportedLanguageCodes[i];
      i++;
    };

  },

  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //                                                  GET CONTRAST COLOR FOR THE GIVEN COLO
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

  /**
    DESCRIPTION: get contrast color (white or black) for the given color
    ARGUMENTS: ( !color <hexString> )
    RETURN: <number>
  */
  contrastColor: function (color) {

    // CONVERT HEX COLOR TO RGB (http://gist.github.com/983661)
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    var red = color >> 16;
    var green = color >> 8 & 255;
    var blue = color & 255;

    // RETURN HSP (CALCULATION INSPIRED BY: http://alienryderflex.com/hsp.html)
    if (Math.sqrt(
      0.299 * (red * red) +
      0.587 * (green * green) +
      0.114 * (blue * blue)
    ) < 127.5) return "white"
    else return "black";

  },

  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //                                                  STICKY NAV TITLE
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

  /**
    DESCRIPTION: used on invividual post pages, displays the post title in place of the nav bar when scrolling past the title
    ARGUMENTS: ({
      !navSelector: <string> « query selector to get the nav bar »,
      !titleSelector: <string> « query selector to get the title »,
      !activeClass: <string> « class to add to the nav bar when title should be shown in it »,
    })
    RETURN: <void>
    EXAMPLES:
      grama.stickyNavTitle({
        navSelector: ".site-nav-main",
        titleSelector: ".post-full-title",
        activeClass: "nav-post-title-active",
      });
  */
  stickyNavTitle: function (options) {
    var nav = document.querySelector(options.navSelector);
    var title = document.querySelector(options.titleSelector);
    var scrolledElement = document.querySelector(".grama-body");

    var lastScrollY = scrolledElement.scrollTop;
    var ticking = false;

    function onScroll () {
      lastScrollY = scrolledElement.scrollTop;
      requestTick();
    }

    function requestTick () {
      if (!ticking) requestAnimationFrame(update);
      ticking = true;
    };

    function update () {
      var trigger = title.getBoundingClientRect().top + window.scrollY;
      var triggerOffset = title.offsetHeight + 35;

      // show/hide post title
      if (lastScrollY >= trigger + triggerOffset) nav.classList.add(options.activeClass)
      else nav.classList.remove(options.activeClass);

      ticking = false;
    };

    scrolledElement.addEventListener("scroll", onScroll, { passive: true });

    update();
  },

  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
};
