window.onkeydown = function(e) {
  switch (e.which) {
    case 37: // left
      break;

    case 38: // up
      break;

    case 39: // right
      break;

    case 40: // down
      break;

    default:
      return; // exit this handler for other keys
  }
};

window.processing = false;

window.onwheel = function(e) {
  if (processing === false) {
    processing = true;
    if (e.deltaY > 0) {
      if ($(".active").data("page") != 3) {
        nextSection();
      }
    } else {
      if (!($(".active").data("page") == 1)) {
        backSection();
      }
    }
    setTimeout(function() {
      processing = false;
    }, 1600);
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
  }, 1000);
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
  }, 1000);
}
