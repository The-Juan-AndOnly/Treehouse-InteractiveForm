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
    '#colors-js-puns, #otherJob, #activityTotal,  #credit-card, #paypal, #bitcoin'
  ).hide();
};

// Function that adds an input field when the Job Role of "Other" is selected
const otherJobRole = () => {
  if ($('#title').val() === 'other') {
    $('#otherJob')
      .show()
      .focus();
  } else {
    $('#otherJob').hide();
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

// Activities section

const checkActivities = () => {};

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
    const id = e.target.id;
    highlightBorder(showBorder, border, id);
  };
};

$('form').prepend(`<p id="error"></p>`);
const highlightBorder = (show, element, name) => {
  if (show) {
    element.classList.add('error');
    if (name === 'cc-num') {
      $('#error').text(`Please enter a valid Credit Card #`);
    } else {
      $('#error').text(`Please enter a valid ${name}`);
    }
    $('#error').show();
  } else {
    element.classList.remove('error');
    $('#error').text(``);
    $('#error').hide();
  }
};

// On Form Submit prevents page from refreshing as runs the validators
const formSubmit = e => {
  e.preventDefault();
  let errorMessage = '';
  // Check if name is blank or does not pass RegEx

  document.getElementById('error').innerHTML = errorMessage;
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
