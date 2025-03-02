$(document).ready(function(){
  // Nav bar Section
  $(".ab-pfo-nav-item").click(function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    $(".ab-pfo-nav-item").removeClass("active");
    $(this).addClass("active");

    var target = $($(this).attr("href")); // Get target section

    if (target.length) {
        window.scrollTo({
            top: target.offset().top - 100,
            behavior: "smooth"
        });
    }
  });


  //Scroll to top
  $(window).scroll(function(){
      if ($(this).scrollTop() > 100) {
          $('#go-top').fadeIn();
          $('#go-top').css("display","flex");
      } else {
          $('#go-top').fadeOut();
      }
  });

  $("#go-top").click(function(){
    window.scrollTo({
        top: $("html, body").offset().top,
        behavior: "smooth"
    });
  });
});

// Hamburger Animation 
$(".ab-pfo-hamburger").click(() => {
  $(".mob.ab-pfo-nav-list-container").removeClass("animate-reverse");
  $(".ab-pfo-hamburger").toggleClass("animate");
  $(".mob.ab-pfo-nav-list-container").toggleClass("show");
  
});

$(".mob.ab-pfo-nav-list-container .ab-pfo-nav-list-item").click(() => {
  $(".mob.ab-pfo-nav-list-container").removeClass("show");
  $(".ab-pfo-hamburger").removeClass("animate");
  $(".mob.ab-pfo-nav-list-container").addClass("animate-reverse");
});


// Skills Slider
$(".ab-pfo-tech-skills-slick-slider").slick({
  slidesToShow: 6,
  infinite: true,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  dots: false,
  arrows: true,
  prevArrow: `<button type="button" class="slick-prev"><svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="27.5" cy="27.5" r="27.5" fill="#F3E04F"/>
  <path d="M12.9393 27.9393C12.3536 28.5251 12.3536 29.4749 12.9393 30.0607L22.4853 39.6066C23.0711 40.1924 24.0208 40.1924 24.6066 39.6066C25.1924 39.0208 25.1924 38.0711 24.6066 37.4853L16.1213 29L24.6066 20.5147C25.1924 19.9289 25.1924 18.9792 24.6066 18.3934C24.0208 17.8076 23.0711 17.8076 22.4853 18.3934L12.9393 27.9393ZM40 27.5L14 27.5V30.5L40 30.5V27.5Z" fill="black"/>
  </svg>
  </button>`,
  nextArrow: `<button type="button" class="slick-next"><svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="27.5" cy="27.5" r="27.5" fill="#F3E04F"/>
  <path d="M42.0607 30.0607C42.6464 29.4749 42.6464 28.5251 42.0607 27.9393L32.5147 18.3934C31.9289 17.8076 30.9792 17.8076 30.3934 18.3934C29.8076 18.9792 29.8076 19.9289 30.3934 20.5147L38.8787 29L30.3934 37.4853C29.8076 38.0711 29.8076 39.0208 30.3934 39.6066C30.9792 40.1924 31.9289 40.1924 32.5147 39.6066L42.0607 30.0607ZM15 30.5H41V27.5H15V30.5Z" fill="black"/>
  </svg>
  </button>`,
  responsive: [
    {
      breakpoint: 1441,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
});

// Academic Background section
$(".ab-pfo-academic-tab").each(function () {
  $(this).click(function () {
    $(".ab-pfo-academic-tab").removeClass("active");
    $(".ab-pfo-academic-tab-content").removeClass("active");
    $(this).addClass("active");

    var attribute = $(this).attr("data-attribute");
    $("#" + attribute).addClass("active");
  });
});


// Form Validation
document.getElementById("Contact-Form").addEventListener("submit", validateForm);

function validateForm(event) {
  let phonevalid = false;
  let emailvalid = false;

  // Phone Number Validation
  let phoneInput = document.getElementById("phone-number").value;
  let phoneError = document.getElementById("phone-error");
  if (!/^\d{10}$/.test(phoneInput)) {
    phoneError.textContent = "Phone number must be exactly 10 digits.";
    phoneError.style.display = "block";
    phonevalid = false;
  } else {
    phoneError.textContent = "";
    phonevalid = true;
  }

  // Email Validation
  let emailInput = document.getElementById("email").value;
  let emailError = document.getElementById("emial-error");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.display = "block";
    emailvalid = false;
  } else {
    emailError.textContent = "";
    emailvalid = true;
  }

  if (!phonevalid || !emailvalid) {
    event.preventDefault(); 
    return false;
  }
  event.preventDefault();
  sendMail();
  return false;

};


// Mail Send Success Message 
function submitMsg(conMessage){
  if(conMessage == "Email sending failed" || conMessage == "Failed to Submit. Please try again later"){
    $(".confirm-msg-div").css({
      "background-color" :"#ff9393", 
      "border": "2px solid #e90000"
    });
    $(".confirm-msg").css({
      "color": "#e90000"
    });
  }
  $(".confirm-msg-div").fadeIn();
  $('.confirm-msg').text(conMessage);
  // Empty the field after submit 
  $("#email").val("");
  $("#name").val("");
  $("#phone-number").val("");
  $("#message").val("");

  setTimeout(function(){
    $(".confirm-msg-div").fadeOut();
  },3000);
}

function sendMail() {
  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone-number").value;
  var message = document.getElementById("message").value;

  if (email == "" || name == "" || message == "") {
      alert("Fields Should not be empty");
      return;
  }

  // Send email
  var xhr = new XMLHttpRequest();
  var conMessage = "";
  xhr.open("POST", "send_mail.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  $(".loader-div").fadeIn();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      $(".loader-div").fadeOut(); // Hide loader after response is received

      if (xhr.status === 200) {
          conMessage = xhr.responseText;
          submitMsg(conMessage); // Success message
      } else {
          conMessage = "Failed to Submit. Please try again later"; // Custom failure message
          submitMsg(conMessage);
      }
    }
  };

  var params = "email=" + encodeURIComponent(email) + "&name=" + encodeURIComponent(name) + "&phone-number=" + encodeURIComponent(phone) + "&message=" + encodeURIComponent(message);

  xhr.send(params);

}

