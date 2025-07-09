const firebaseConfig = {
  databaseURL: "https://coffee-dda5d-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function login() {
  const pass = document.getElementById("admin-pass").value;
  if (pass === "4321") {
    document.getElementById("admin-panel").style.display = "block";
    loadOrders();
  } else {
    alert("كلمة السر غير صحيحة");
  }
}

function addMenuItem() {
  const name = document.getElementById('newItem').value;
  const price = document.getElementById('newPrice').value;
  if (name && price) {
    db.ref("menu").push({ name, price });
    document.getElementById('newItem').value = '';
    document.getElementById('newPrice').value = '';
  }
}

function loadOrders() {
  db.ref("orders").on("value", snapshot => {
    const ordersDiv = document.getElementById('orders');
    ordersDiv.innerHTML = '';
    const orders = snapshot.val();
    for (let key in orders) {
      const order = orders[key];
      let html = `<div class="item"><strong>الطاولة: ${order.table}</strong><ul>`;
      order.items.forEach(i => {
        html += `<li>${i.name} - الكمية: ${i.qty} - ملاحظات: ${i.note}</li>`;
      });
      html += '</ul></div>';
      ordersDiv.innerHTML += html;
    }
  });
}
