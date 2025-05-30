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
  // validate(emailinput);

  // if (!emailinput.checkValidity()) {
  //   event.preventDefault(); // stop form submission if invalid
  // }
  const today = new Date();
  const date = new Date(document.getElementById("dob").value);
  const ageDiff = today - date;
  const age = ageDiff / (365.25 * 24 * 60 * 60 * 1000); // approx years

  if (age < 18 || age > 55) {
    alert("Your age must be between 18 and 55 to register.");
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
