window.onload = function() {
  setUpEvents();
};

function setUpEvents() {
  window.processing = true;
  window.anim = false;
  animChecking();

  function animChecking() {
    anim = false;
    setTimeout(function() {
      anim = true;
    }, 1200);
  }

  // Up key and Down key
  window.onkeydown = function(e) {
    if (anim) {
      animChecking();
      switch (e.which) {
        case 38: // up
          checkBack();
          break;
        case 40: // down
          checkNext();
          break;
        default:
          return;
      }
    }
  };

  // Scrolling
  window.onwheel = function(e) {
    console.log(processing);
    if (processing === true) {
      if (anim) {
        animChecking();
        processing = false;
        if (e.deltaY > 0) {
          checkNext();
        } else {
          checkBack();
        }
        setTimeout(function() {
          processing = true;
        }, 2000);
      }
    }
  };

  function checkNext() {
    if ($(".active").hasClass("home")) {
      fromHomeToService();
    } else {
      if ($(".active").data("page") != 2) {
        nextSection();
      }
    }
  }

  function checkBack() {
    if ($(".active").data("page") == 1 && $(".active").hasClass("services")) {
      fromServiceToHome();
    } else {
      if (!$(".active").hasClass("home")) {
        backSection();
      }
    }
  }

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
      $(".bg-road").addClass("bg-road-down-back");
    }
    var id = "#p" + page;
    $(id).addClass("anim-down-lier back");
    setTimeout(function() {
      $(".active").removeClass("anim-up-lier back");
      $(id).removeClass("anim-down-lier back");
      $(".active").removeClass("active");
      $(id).addClass("active");
      $(".bg-road").removeClass("bg-road-down-back");
      $(".bg-mountain").removeClass("bg-mountain-down");
    }, 1100);
  }

  function fromHomeToService() {
    $(".active").removeClass("home");
    $(".active").addClass("services");
    $(".bg-mountain").removeClass("bg-mountain-home");
    $(".bg-road").removeClass("bg-road-home");
    $(".bg-mountain").addClass("bg-mountain-services");
    $(".bg-road").addClass("bg-road-services");
    setTimeout(function() {
      $(".bg-mountain").removeClass("bg-mountain-services");
      $(".bg-road").removeClass("bg-road-services");
    }, 1100);
  }

  function fromServiceToHome() {
    $(".active").removeClass("services");
    $(".active").addClass("home");
    $(".bg-mountain").addClass("bg-mountain-services-back");
    $(".bg-road").addClass("bg-road-services-back");

    setTimeout(function() {
      $(".bg-mountain").removeClass("bg-mountain-services-back");
      $(".bg-road").removeClass("bg-road-services-back");
    }, 1100);
  }

  // Scrolling for mobile
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
    if (anim) {
      animChecking();
      if (check > 0) {
        if (!($(".active").data("page") == 1)) {
          backSection();
        }
      } else {
        if ($(".active").data("page") != 3) {
          nextSection();
        }
      }
    }
  }

  // Clik Nav Item
  $(".item").click(function() {
    if (anim) {
      animChecking();
      clickChecking($(this).data("page"));
    }
  });
  /*
  function clickChecking(clickedPage) {
    if (clickedPage == 0) {
      return;
    }

    var currentPage = $(".active").data("page");

    if (clickedPage == currentPage) {
      if (clickedPage == 1) {
        var clickData = $(this).data("page-for-click");
        var clickDataActive = $(".active-item").data("page-for-click");
        if (clickData == "home" && clickDataActive == "services") {
          fromHomeToService();

          return;
        }
        if (clickData == "services" && clickDataActive == "home") {
          fromServiceToHome();

          return;
        }
      }
    } else {
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
  }*/
}
