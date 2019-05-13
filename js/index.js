// jQuery ready function for when the DOM is fully Loaded
$(() => {
  // Auto focus on the "Name" input field when form loads
  $('#name').focus();
  tShirtColor();
});
/*


















*/

// Function that adds an input field when the Job Role of "Other" is selected
const otherJobRole = () => {
  if ($('#title').val() === 'other') {
    const otherLabel = document.createElement('label');
    otherLabel.for = 'other_role';
    const otherInput = document.createElement('input');
    otherInput.type = 'text';
    otherInput.id = 'other_role';
    otherInput.name = 'other_role';
    // Adds a placeholder text to the input field
    otherInput.placeholder = 'Enter your job role';
    $('fieldset:first').append(otherInput);

    otherInput.focus();
  } else {
    $('#other_role').remove();
  }
};

const tShirtColor = () => {
  $colorSelect = $('#colors-js-puns');
  $jsPuns = $('option:contains("JS Puns shirt only")');
  $heartJS = $('option:contains("JS shirt only")');

  // Hide the T-Shirt Color Select initially
  $colorSelect.hide();
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
  }
};

//

//
$('#title').on('change', otherJobRole);
$('#design').on('change', tShirtColor);
$();
