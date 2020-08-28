
window.addEventListener("DOMContentLoaded", function () {

  // get the form elements defined in your form HTML above

  var form = document.getElementById("contact-form");
  var button = document.getElementById("my-form-button");
  var status = document.getElementById("my-form-status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    button.style = "display: none ";
    status.classList.remove('failure');
    status.classList.add('success');
    status.innerHTML = "Thanks !";
  }

  function error() {
    status.classList.remove('success');
    status.classList.add('failure');
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });


  //jquery for nav handling

  let navButton = $('.hamburger'),
    sideNav = $('.nav');
  navButton.on('click', function () {
    $(this).toggleClass('is-open');
    sideNav.toggleClass('is-open');
  });
  $('.side-nav a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().parent().parent().removeClass('is-open');
    navButton.removeClass('is-open');
    let destin = $(this)[0].hash;
    $.scrollTo(destin, 1500);
  });
  $('.full-nav a').on('click', function (e) {
    e.preventDefault();
    let destin = $(this).attr('href');
    $.scrollTo(destin, 1500);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}