window.onload = function() {
  setUpEvents();
};

function setUpEvents() {
  window.processing = false;
  window.anim = true;

  function animChecking() {
    anim = false;
    setTimeout(function() {
      anim = true;
    }, 1200);
  }
  window.onkeydown = function(e) {
    switch (e.which) {
      case 38: // up
        if (anim) {
          if (!($(".active").data("page") == 1)) {
            backSection();
            animChecking();
          }
        }
        break;

      case 40: // down
        if (anim) {
          if ($(".active").data("page") != 3) {
            animChecking();
            nextSection();
          }
        }
        break;

      default:
        return;
    }
  };

  window.onwheel = function(e) {
    if (processing === false) {
      processing = true;
      if (e.deltaY > 0) {
        if ($(".active").data("page") != 3) {
          if (anim) {
            animChecking();
            nextSection();
          }
        }
      } else {
        if (!($(".active").data("page") == 1)) {
          if (anim) {
            animChecking();
            backSection();
          }
        }
      }
      setTimeout(function() {
        processing = false;
      }, 1100);
    }
  };

  function nextSection() {
    $(".active").addClass("anim-down-lier");

    var page = $(".active").data("page");
    if (page == 1) {
      $(".bg-road").addClass("bg-road-down");
    }
    page++;
    var id = "#p" + page;
    $(id).addClass("anim-up-lier");
    setTimeout(function() {
      $(".bg-road").removeClass("bg-road-down");
      $(".bg-mountain").removeClass("bg-mountain-down");
      $(".active").removeClass("anim-down-lier");
      $(id).removeClass("anim-up-lier");
      $(".active").removeClass("active");
      $(id).addClass("active");
    }, 1100);
  }

  function backSection() {
    $(".active").addClass("anim-up-lier back");

    var page = $(".active").data("page");
    page--;
    if (page == 1) {
      $(".bg-mountain").addClass("bg-mountain-down");
    }
    var id = "#p" + page;
    $(id).addClass("anim-down-lier back");
    setTimeout(function() {
      $(".active").removeClass("anim-up-lier back");
      $(id).removeClass("anim-down-lier back");
      $(".active").removeClass("active");
      $(id).addClass("active");
    }, 1100);
  }

  window.addEventListener("touchend", processTouchend, false);
  window.addEventListener("touchstart", processTouchstart, false);

  window.touchStartPoint = 0;
  window.touchEndPoint = 0;

  function processTouchstart(e) {
    touchStartPoint = e.changedTouches[0].pageY;
  }

  function processTouchend(e) {
    touchEndPoint = e.changedTouches[0].pageY;
    checkingPoints();
  }

  function checkingPoints() {
    var check = touchEndPoint - touchStartPoint;
    if (check > 0) {
      if (!($(".active").data("page") == 1)) {
        if (anim) {
          animChecking();
          backSection();
        }
      }
    } else {
      if ($(".active").data("page") != 3) {
        if (anim) {
          animChecking();
          nextSection();
        }
      }
    }
  }
  $(".item").click(function() {
    clickChecking($(this).data("page"));
  });

  function clickChecking(clickedPage) {
    if (clickedPage == 0) {
      return;
    }

    var currentPage = $(".active").data("page");

    if (clickedPage == currentPage) {
      return;
    }

    if (currentPage < clickedPage) {
      nextClickedPage(clickedPage, currentPage);
    } else {
      backClickedPage(clickedPage, currentPage);
    }
  }

  function nextClickedPage(clicked, current) {
    $(".active").addClass("anim-down-lier");

    if (current == 1) {
      $(".bg-road").addClass("bg-road-down");
    }

    var id = "#p" + clicked;
    $(id).addClass("anim-up-lier");
    setTimeout(function() {
      $(".bg-road").removeClass("bg-road-down");
      $(".bg-mountain").removeClass("bg-mountain-down");
      $(".active").removeClass("anim-down-lier");
      $(id).removeClass("anim-up-lier");
      $(".active").removeClass("active");
      $(id).addClass("active");
    }, 1100);
  }

  function backClickedPage(clicked, current) {
    $(".active").addClass("anim-up-lier back");

    if (current == 1) {
      $(".bg-mountain").addClass("bg-mountain-down");
    }
    var id = "#p" + clicked;
    $(id).addClass("anim-down-lier back");
    setTimeout(function() {
      $(".active").removeClass("anim-up-lier back");
      $(id).removeClass("anim-down-lier back");
      $(".active").removeClass("active");
      $(id).addClass("active");
    }, 1100);
  }
}
