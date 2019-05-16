// jQuery ready function for when the DOM is fully Loaded
$(() => {
  // Hides Some Elements when page loads
  hideElements();
  // Auto focus on the "Name" input field when form loads
  $('#name').focus();
});

/* 

  Function to hide Elements that are meant to be hidden on page start

*/
const hideElements = () => {
  $(
    '#colors-js-puns, #other-title, #activityTotal,  #credit-card, #paypal, #bitcoin'
  ).hide();
};

// Function that adds an input field when the Job Role of "Other" is selected
const otherJobRole = () => {
  if ($('#title').val() === 'other') {
    $('#other-title')
      .show()
      .focus();
  } else {
    $('#other-title').hide();
  }
};

// Function for T-shirt Color
const tShirtColor = () => {
  $colorSelect = $('#colors-js-puns');
  $jsPuns = $('option:contains("JS Puns shirt only")');
  $heartJS = $('option:contains("JS shirt only")');

  // Once a Design is selected the appropriate Shirts will be displayed
  if ($('#design').val() !== 'Select Theme') {
    $colorSelect.show();
    // Only shows Shirts that are labelled "js puns"
    if ($('#design').val() === 'js puns') {
      $heartJS.hide();
      $('#color').val($jsPuns.val());
      $jsPuns.show();
    } else {
      $jsPuns.hide();
      $('#color').val($heartJS.val());
      $heartJS.show();
    }
  } else {
    $colorSelect.hide();
  }
};

/*

    Activities section
    Set total to 0 checkes to see which checkbox was checked and disables any corresponsing activites with the same day and time. 
    
    Also increases/decreases total. And display if total > 0

*/
let total = 0;
const checkActivities = e => {
  const input = e.target;

  const value = input.id;
  switch (value) {
    case 'all':
      if (input.checked) {
        total += 200;
      } else {
        total === 0 ? (total = 0) : (total -= 200);
      }
      break;
    case 'js-frameworks':
      if (input.checked) {
        $('#express').prop('disabled', true);
        total += 100;
      } else {
        $('#express').prop('disabled', false);
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;
    case 'js-libs':
      if (input.checked) {
        $('#node').prop('disabled', true);
        total += 100;
      } else {
        $('#node').prop('disabled', false);
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;

    case 'express':
      if (input.checked) {
        $('#js-frameworks').prop('disabled', true);
        total += 100;
      } else {
        $('#js-frameworks').prop('disabled', false);
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;
    case 'node':
      if (input.checked) {
        $('#js-libs').prop('disabled', true);
        total += 100;
      } else {
        $('#js-libs').prop('disabled', false);
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;
    case 'build-tools':
      if (input.checked) {
        total += 100;
      } else {
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;
    case 'npm':
      if (input.checked) {
        total += 100;
      } else {
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;
    default:
      return;
  }
  total > 0
    ? $('#activityTotal')
        .text('Total $ ' + total)
        .show()
    : $('#activityTotal').hide();
};

// PaymentInfo function that accepts type as props and will "show" or "hide" appropriate div
const paymentInfo = type => {
  switch (type) {
    case 'credit card':
      return $('#credit-card').show(), $('#paypal, #bitcoin').hide();
    case 'paypal':
      return $('#paypal').show(), $('#credit-card, #bitcoin').hide();
    case 'bitcoin':
      return $('#bitcoin').show(), $('#paypal, #credit-card').hide();
    default:
      return $('#bitcoin, #paypal, #credit-card').hide();
  }
};

// RegEx validators

const isValidName = name => {
  return /^([a-z])?[a-z]+ ?[a-z]*$/i.test(name);
};

const isValidEmail = email => {
  return /^[^@]+@[^@]+\.[a-z]+$/i.test(email);
};

const isValidCC = ccNum => {
  if (ccNum.startsWith(3)) {
    return /^3\d{3}(-| )?\d{6}(-| )?\d{5}$/g.test(ccNum);
  } else {
    return /^\d{4}(-| )?\d{4}(-| )?\d{4}(-| )?\d{4}$/g.test(ccNum);
  }
};

const isValidZip = zip => {
  return /^\d{5}$/.test(zip);
};

const isValidCVV = cvv => {
  return /^\d{3}$/.test(cvv);
};

const inputHandler = validator => {
  return e => {
    const text = e.target.value; //input text
    const valid = validator(text); // returns true|false depending on regex validation
    const showBorder = text !== '' && !valid;
    const border = e.target;
    highlightBorder(showBorder, border);
  };
};

$('form').prepend(`<p id="error"></p>`);
const highlightBorder = (show, element) => {
  show ? element.classList.add('error') : element.classList.remove('error');
  // $('#error').text(``);
  // $('#error').text().length > 0 ? $('#error').show() : $('#error').hide();
};

/* 
    Form Submit Functions
*/

// Scroll to the top of Page
const scrollToTop = () => {
  $('html,body').animate({ scrollTop: 0 }, 'slow');
};

const modal = order => {
  const container = document.querySelector('.container');
  const modalDiv = document.createElement('div');
  modalDiv.id = 'modal';
  const modalDisplay = document.createElement('div');
  modalDisplay.classList.add('modal-flex');
  modalDisplay.innerHTML = `
  <h1>Thank You!!</h1>
  <p>We have received your registration and emailed you a copy at ${
    order.email
  }. </p>
  <h3>Here is your following registration:</h3>
  <h4>Name: <span>${order.name}</span></h4>
  <h4>Email: <span>${order.email}</span></h4>
  <h4>Job role: <span>${order.job.toUpperCase()}<span></h4>
  <h4>Shirt Size: <span>${order.shirt.size.charAt(0).toUpperCase()}</span></h4>
  <h4>Design: <span>${order.shirt.color.split('(', 1)}</span></h4>
  <h4>Activities: <span> ${order.activities.map(activity =>
    activity.nextSibling.textContent.trim().split(' —', 1)
  )}</span></h4>
  <h4>Payment Method: <span>${order.payment}</span></h4>
  <h4><span>We look forward to seeing you at Full Stack Conf &#128513;</span></h4>
  `;
  modalDiv.appendChild(modalDisplay);
  container.appendChild(modalDiv);
  setTimeout(() => {
    location.reload();
  }, 7000);
};

// On Form Submit prevents page from refreshing as runs the validators
const formSubmit = e => {
  e.preventDefault();
  const name = $('#name');
  const email = $('#email');
  const jobRole = $('#title');
  const shirtDesign = $('#design');
  const activities = $('.activities input[type="checkbox"]:checked');
  const paymentInfo = $('#payment');
  const ccNum = $('#cc-num');
  const zip = $('#zip');
  const cvv = $('#cvv');
  let errorMessage = '';
  const order = {
    name: name.val(), //name value
    email: email.val(), //email value
    job: jobRole.val() !== 'other' ? jobRole.val() : $('#other-title').val(), //job value
    shirt: {
      size: $('#size').val(), //shirt size
      color: $('#color option:selected').text() //shirt color
    },
    activities: $('.activities input[type="checkbox"]:checked').get(), //array of activities selected
    payment: $('#payment option:selected').text() //type of payment
  };

  // Check if name is blank or if input has error class
  if (name.val() === '' || name.hasClass('error')) {
    errorMessage = `Please Enter A Valid Name`;
    scrollToTop();
  } else if (email.val() === '' || email.hasClass('error')) {
    errorMessage = `Please Enter a Valid Email`;
    scrollToTop();
  } else if (jobRole.val() === 'other' && $('#other-title').val() === '') {
    errorMessage = `Please Fill in the Other Job Role`;
    scrollToTop();
  } else if (shirtDesign.val() === 'Select Theme') {
    errorMessage = `Please Select A Shirt Theme`;
    scrollToTop();
  } else if (activities.length === 0) {
    errorMessage = `Please Select An Activity`;
    scrollToTop();
  } else if (paymentInfo.val() === 'select_method') {
    errorMessage = `Please Select a Valid Payment Method`;
    scrollToTop();
  } else if (paymentInfo.val() === 'credit card') {
    if (ccNum.val() === '' || ccNum.hasClass('error')) {
      errorMessage = `Please Enter a Valid Credit Card Number`;
      scrollToTop();
    } else if (zip.val() === '' || zip.hasClass('error')) {
      errorMessage = `Please Enter a Valid Zip Code`;
      scrollToTop();
    } else if (cvv.val() === '' || cvv.hasClass('error')) {
      errorMessage = `Please Enter a Valid CVV Number`;
      scrollToTop();
    } else {
      modal(order);
    }
  } else {
    modal(order);
  }

  document.getElementById('error').innerHTML = errorMessage;
  $('#error').text().length > 0 ? $('#error').show() : $('#error').hide();
};

//
// Event Handlers
//

$('#title').change(otherJobRole);
$('#design').change(tShirtColor);
$('#payment').change(() => {
  paymentInfo($('#payment').val());
});
$('.activities :checkbox').on('click', checkActivities);
$('#name').on('input', inputHandler(isValidName));
$('#email').on('input', inputHandler(isValidEmail));
$('#cc-num').on('input', inputHandler(isValidCC));
$('#zip').on('input', inputHandler(isValidZip));
$('#cvv').on('input', inputHandler(isValidCVV));
$('form').submit(formSubmit);
