const Form = document.querySelector("form");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

// Update Element with h tag
const years = document.querySelector(".years");
const months = document.querySelector(".months");
const days = document.querySelector(".days");

var date = new Date();
var d2 = date.getDate();
var m2 = 1 + date.getMonth();
var y2 = date.getFullYear();
var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

Form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Day Input Handler
  if (
    dayInput.value.length > 2 ||
    dayInput.value.length < 1 ||
    dayInput.value > 31
  ) {
    showError(dayInput, "date is invalid");
  } else {
    removeError(dayInput);
  }

  // Month Error Handler
  if (monthInput.value.length > 2 || monthInput.value.length < 1) {
    showError(monthInput, "month is invalid");
  } else if (monthInput.value > 12) {
    showError(monthInput, "invalid month no");
  } else {
    removeError(monthInput);
  }

  // Year input Handler
  if (yearInput.value.length < 4) {
    showError(yearInput, "year is invalid");
  } else if (yearInput.value > y2) {
    showError(yearInput, `Year is valid upto ${y2}`);
  } else {
    removeError(yearInput);
  }

  if (dayInput.value > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (monthInput.value > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }

  var d, m, y;
  const errorInputs = document.querySelectorAll(".error");
  if (errorInputs.length === 0) {
    d = d2 - dayInput.value;
    m = m2 - monthInput.value;
    y = y2 - yearInput.value;
    updateYears(d, m, y);
  }
});

function showError(input, message) {
  const parentElement = input.parentElement;
  parentElement.classList.add("error");
  const small = parentElement.querySelector("small");
  small.innerText = message;
}

function removeError(input) {
  const parentElement = input.parentElement;
  parentElement.classList.remove("error");
}

let intervalSpeed = 40;

function updateYears(dvalue, mvalue, yvalue) {
  let interval;
  let intervalValue = 0;
  if (yvalue > 0) {
    interval = setInterval(() => {
      intervalValue++;
      if (intervalValue >= yvalue) {
        intervalValue = yvalue;
        clearInterval(interval);
        setTimeout(() => {
          updateMonth(dvalue, mvalue);
        }, 50);
      }
      years.textContent = intervalValue;
    }, intervalSpeed);
  } else {
    updateMonth(dvalue, mvalue);
    years.textContent = yvalue;
  }
}

function updateMonth(dvalue, mvalue) {
  let interval;
  let intervalValue = 0;
  if (mvalue > 0) {
    interval = setInterval(() => {
      intervalValue++;
      if (intervalValue >= mvalue) {
        intervalValue = mvalue;
        clearInterval(interval);
        setTimeout(() => {
          updateDay(dvalue);
        }, 50);
      }
      months.textContent = intervalValue;
    }, intervalSpeed);
  } else {
    updateDay(dvalue);
    months.textContent = mvalue;
  }
}

function updateDay(dvalue) {
  let interval;
  let intervalValue = 0;
  if (dvalue > 0) {
    interval = setInterval(() => {
      intervalValue++;
      if (intervalValue >= dvalue) {
        intervalValue = dvalue;
        clearInterval(interval);
      }
      days.textContent = intervalValue;
    }, intervalSpeed);
  } else {
    days.textContent = dvalue;
  }
}
