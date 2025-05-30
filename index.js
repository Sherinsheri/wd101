function validate(e) {
  if (e.validity.typeMismatch) {
    e.setCustomValidity("The Email is not in the right format!!!!!");
    e.reportValidity();
  } else {
    e.setCustomValidity("");
  }
}

let emailinput = document.getElementById("email");
emailinput.addEventListener("blur", () => validate(emailinput));

function validateDOB(input) {
  const today = new Date();
  const dob = new Date(input.value);

  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  // Extracted validation logic for DOB
  const minAge = 18;
  const maxAge = 55;

  if (age < minAge || age > maxAge) {
    input.setCustomValidity(`Age must be between ${minAge} and ${maxAge} years.`);
    input.reportValidity();
  } else {
    input.setCustomValidity("");
  }
}

let dobInput = document.getElementById("dob");
dobInput.addEventListener("blur", () => validateDOB(dobInput));

let user_form = document.getElementById("user_form");
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const tabelEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2 '>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2 '>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2 '>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2 '>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2 '>${entry.acceptTerms}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}<tr/>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full">
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">Dob</th>
      <th class="px-4 py-2">Accepted terms?</th>
    </tr>${tabelEntries}
    </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

user_form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Call the validation functions explicitly before collecting data
  validate(emailinput);
  validateDOB(dobInput);

  // If any validation fails, stop the submission
  if (!user_form.checkValidity()) {
    return;
  }

  let name = document.getElementById("name").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let dob = document.getElementById("dob").value;
  let acceptTerms = document.getElementById("acceptTerms").checked;
  const val = {
    name,
    password,
    email,
    dob,
    acceptTerms,
  };

  userEntries.push(val);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();

  user_form.reset();
});

displayEntries();
