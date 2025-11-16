inventory = [];

function normalizeName(rawName) {
  let nameInput = document.getElementById("name");
  let qtyInput = document.getElementById("qty");

  const name = nameInput.value;
  const qty = Number(qtyInput.value);

  console.log(typeof inputValue);
}

const form = document.getElementById("add-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const qty = Number(document.getElementById("qty").value);

  console.log("name: ", name);
  console.log("quantity: ", qty);
});

const STORAGE_KEY = "inventory.v1";

function saveInventory() {
  const payload = { version: 1, data: inventory };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
