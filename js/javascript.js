$(document).ready(function () {
  $("#navigation-item-1").hover(
    function () {
      $(".overlay1").fadeIn(500);
    },
    function () {
      $(".overlay1").fadeOut(500);
    }
  );
  $("#navigation-item-2").hover(
    function () {
      $(".overlay2").fadeIn(500);
    },
    function () {
      $(".overlay2").fadeOut(500);
    }
  );
  $("#navigation-item-3").hover(
    function () {
      $(".overlay3").fadeIn(500);
    },
    function () {
      $(".overlay3").fadeOut(500);
    }
  );
  $("#navigation-item-4").hover(
    function () {
      $(".overlay4").fadeIn(500);
    },
    function () {
      $(".overlay4").fadeOut(500);
    }
  );
});
