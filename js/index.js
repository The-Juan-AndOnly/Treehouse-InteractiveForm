// jQuery ready function for when the DOM is fully Loaded
$(() => {
  hideElements(); // Hides Some Elements when page loads
  $('#name').focus(); //Auto focus on name input
  $('#payment option[value="credit card"]').prop('selected', true); // Auto selects credit card as payment type
  $('#credit-card').show();
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
    $('#other-title').on('input', function() {
      this.value.trim() === ''
        ? (this.nextElementSibling.style.display = 'block')
        : (this.nextElementSibling.style.display = 'none');
    });
  } else {
    $('#other-title').get(0).nextElementSibling.style.display = 'none';
    $('#other-title').hide();
  }
};

// Function for T-shirt Color
const tShirtColor = () => {
  $colorSelect = $('#colors-js-puns');
  $designSelect = $('#design');
  $jsPuns = $('option:contains("JS Puns shirt only")');
  $heartJS = $('option:contains("JS shirt only")');

  // Once a Design is selected the appropriate Shirts will be displayed
  if ($designSelect.val() !== 'Select Theme') {
    $colorSelect.show();
    $designSelect.get(0).nextElementSibling.style.display = 'none';

    // Only shows Shirts that are labelled "js puns"
    if ($('#design').val() === 'js puns') {
      $heartJS.hide();
      $('#color').val($jsPuns.val());
      $jsPuns.show();
    } else {
      // show the I heart JS shirts
      $jsPuns.hide();
      $('#color').val($heartJS.val());
      $heartJS.show();
    }
  } else {
    // hide the shirt colors and turn on tooltip to select a design
    $colorSelect.hide();
    $designSelect.get(0).nextElementSibling.style.display = 'block';
  }
};

/*
  Activities section
  Set total to 0  & checks to see which checkbox was checked and disables any corresponsing activites with the same day and time. 
  Also increases/decreases total. And display if total > 0
*/
let total = 0;
const checkActivities = e => {
  const input = e.target;
  $('.activities .tooltip .sidetooltiptext').get(0).style.display = 'none'; //turn off tooltip
  const unavailable = `<span style="color:red; text-transform:uppercase;">Unavailable</span>`;
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
        $('#express')
          .prop({ disabled: true }) //disable corresponding event with same time & date
          .after(unavailable);
        total += 100;
      } else {
        $('#express').prop('disabled', false); // re-enable corresponding event with same time & date
        $('#express')
          .get(0)
          .nextSibling.remove();
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;
    case 'js-libs':
      if (input.checked) {
        $('#node')
          .prop('disabled', true) //disable corresponding event with same time & date
          .after(unavailable);
        total += 100;
      } else {
        $('#node').prop('disabled', false); // re-enable corresponding event with same time & date
        $('#node')
          .get(0)
          .nextSibling.remove();
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;
    case 'express':
      if (input.checked) {
        $('#js-frameworks')
          .prop('disabled', true) //disable corresponding event with same time & date
          .after(unavailable);
        total += 100;
      } else {
        $('#js-frameworks').prop('disabled', false); //re-enable corresponding event with same time & date
        $('#js-frameworks')
          .get(0)
          .nextSibling.remove();
        total === 0 ? (total = 0) : (total -= 100);
      }
      break;
    case 'node':
      if (input.checked) {
        $('#js-libs')
          .prop('disabled', true) //disable corresponding event with same time & date
          .after(unavailable);
        total += 100;
      } else {
        $('#js-libs').prop('disabled', false); //re-enable corresponding event with same time & date
        $('#js-libs')
          .get(0)
          .nextSibling.remove();
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
  // conditional to display/hide total if amount is greater than 0
  total > 0
    ? $('#activityTotal')
        .text('Total $ ' + total)
        .show()
    : $('#activityTotal').hide();
};

// PaymentInfo function that accepts type as props and will "show" or "hide" appropriate div
const paymentInfo = type => {
  switch (type) {
    case 'select_method':
      return $('#bitcoin, #paypal, #credit-card').hide();
    case 'paypal':
      return $('#paypal').show(), $('#credit-card, #bitcoin').hide();
    case 'bitcoin':
      return $('#bitcoin').show(), $('#paypal, #credit-card').hide();
    default:
      return $('#credit-card').show(), $('#paypal, #bitcoin').hide();
  }
};

// RegEx validators inspired from the RegEx Course on TeamTreehouse.com

const isValidName = name => {
  return /^([A-Z]|[a-z])[a-zA-Z]+ ([A-Z]|[a-z])[a-zA-Z]+$/.test(name);
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
    const toolTip = text !== '' && !valid;
    const span = e.target.nextElementSibling;
    showToolTip(toolTip, span);
  };
};

const showToolTip = (show, spanElement) => {
  if (show) {
    $(spanElement).css('display', 'block');
  } else {
    $(spanElement).css('display', 'none');
  }
};

/* 
    Form Submit Functions
*/

// Modal for after the Form Successfully submits
const modal = order => {
  const container = document.querySelector('.container'); // Create container for Modal
  const modalDiv = document.createElement('div');
  modalDiv.id = 'modal'; //
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
  <h4>Shirt Size: <span>${order.shirt.size}</span></h4>
  <h4>Design: <span>${order.shirt.color.split('(', 1)}</span></h4>
  <h4>Activities: <span> ${order.activities.map(activity =>
    activity.nextSibling.textContent.trim().split(' —', 1)
  )}</span></h4>
  <h4>Total: $<span>${order.total}</span></h4>
  <h4>Payment Method: <span>${order.payment}</span></h4>
  <h4><span>We look forward to seeing you at Full Stack Conf &#128513;</span></h4>
  `;
  modalDiv.appendChild(modalDisplay);
  container.appendChild(modalDiv);
  setTimeout(() => {
    location.reload();
  }, 5000);
};

// Form Error to display on top of Form when Fields are missing | invalid
const formError = document.createElement('span');
formError.id = 'error';
formError.style.display = 'none';
$('form').prepend(formError);

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

  // Create an order Object that will be passed to a modal function when form successfully submits
  const order = {
    name: name.val(), //name value
    email: email.val(), //email value
    job: jobRole.val() !== 'other' ? jobRole.val() : $('#other-title').val(), //job value
    shirt: {
      size: $('#size option:selected').text(), //shirt size
      color: $('#color option:selected').text() //shirt color
    },
    activities: $('.activities input[type="checkbox"]:checked').get(), //array of activities selected
    total: $('#activityTotal')
      .get(0)
      .textContent.split('$', 2)[1], //Get the numeric value of total
    payment: $('#payment option:selected').text() //type of payment
  };
  //
  // Check if name is blank or if input has error class and turns on tooltip if invalid | missing
  function validateForm() {
    let isValid = true;
    if (name.val() === '' || !isValidName(name.val())) {
      name.get(0).nextElementSibling.style.display = 'block';
      errorMessage === '' && (errorMessage = 'Invalid Name');
      isValid = false;
    }
    if (email.val() === '' || !isValidEmail(email.val())) {
      email.get(0).nextElementSibling.style.display = 'block';
      errorMessage === ''
        ? (errorMessage = 'Invalid Email')
        : (errorMessage += ', Email');
      isValid = false;
    }
    if (jobRole.val() === 'other' && $('#other-title').val() === '') {
      $('#other-title')
        .next()
        .get(0).style.display = 'block';
      errorMessage === ''
        ? (errorMessage = 'Invalid Job Role')
        : (errorMessage += ', Job Role');
      isValid = false;
    }
    if (shirtDesign.val() === 'Select Theme') {
      $('#design').get(0).nextElementSibling.style.display = 'block';
      errorMessage === ''
        ? (errorMessage = 'Invalid Shirt Design')
        : (errorMessage += ', Shirt Design');
      isValid = false;
    }
    if (activities.length === 0) {
      $('.activities .tooltip .sidetooltiptext').get(0).style.display = 'block';
      errorMessage === ''
        ? (errorMessage = 'Invalid Activites')
        : (errorMessage += ', Activities');
      isValid = false;
    }
    if (paymentInfo.val() === 'select_method') {
      $('#payment').get(0).nextElementSibling.style.display = 'block';
      errorMessage === ''
        ? (errorMessage = 'Invalid Payment Method')
        : (errorMessage += ', Payment Method');
      isValid = false;
    }
    if (
      paymentInfo.val() === 'credit card' &&
      (ccNum.val() === '' || !isValidCC(ccNum.val()))
    ) {
      $(ccNum).get(0).nextElementSibling.style.display = 'block';
      errorMessage === ''
        ? (errorMessage = 'Invalid Credit Card #')
        : (errorMessage += ', Credit Card #');
      isValid = false;
    }
    if (
      paymentInfo.val() === 'credit card' &&
      (zip.val() === '' || !isValidZip(zip.val()))
    ) {
      $(zip).get(0).nextElementSibling.style.display = 'block';
      errorMessage === ''
        ? (errorMessage = 'Invalid Zip Code')
        : (errorMessage += ', Zip Code');
      isValid = false;
    }
    if (
      paymentInfo.val() === 'credit card' &&
      (cvv.val() === '' || !isValidCVV(cvv.val()))
    ) {
      $(cvv).get(0).nextElementSibling.style.display = 'block';
      errorMessage === ''
        ? (errorMessage = 'Invalid CVV')
        : (errorMessage += ', CVV');
      isValid = false;
    }
    return isValid;
  }
  // Contional that will either run modal if everything is completed successfully or display error message
  validateForm() ? modal(order) : (formError.textContent = errorMessage);
  $('html, body').animate({ scrollTop: 0 }, 'slow');
  errorMessage !== ''
    ? (formError.style.display = 'block')
    : (formError.style.display = 'none');
};

// Event Handlers

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
