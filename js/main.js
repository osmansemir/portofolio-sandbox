
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

  // nav handling

  let navButton = document.querySelector('.hamburger'),
    sideNav = document.querySelector('.nav');

  navButton.addEventListener('click', function(e){
    navButton.classList.toggle('is-open');
    sideNav.classList.toggle('is-open');
  });

  let sideNavLinks = document.querySelectorAll('.side-nav a');
  sideNavLinks.forEach(link => {
    link.addEventListener('click', function(){
      sideNav.classList.remove('is-open');
      navButton.classList.remove('is-open');
    });
  });
  
  let fullNavLinks = document.querySelectorAll('.full-nav a');
  fullNavLinks.forEach(element => {
    element.addEventListener('click', function (e) {
      e.preventDefault()
      let destin = document.querySelector(e.target.hash);
      destin.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
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