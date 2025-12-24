const DB_URL = "https://develop-re-expertise2026-default-rtdb.asia-southeast1.firebasedatabase.app/data.json";

function login() {
  const u = username.value;
  const p = password.value;

  if (u === "Ranap" && p === "rsmp11") {
    localStorage.role = "user";
    location.href = "dashboard.html";
  }
  else if (u === "201708073" && p === "Papamama00") {
    localStorage.role = "admin";
    location.href = "dashboard.html";
  }
  else {
    error.innerText = "Username / Password salah";
  }
}

function logout() {
  localStorage.clear();
  location.href = "index.html";
}

function simpanData() {
  const data = {
    nama: nama.value,
    rm: rm.value,
    unit: unit.value,
    permintaan: permintaan.value,
    jam: new Date().toLocaleString(),
    status: "Baru"
  };

  fetch(DB_URL, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(() => {
    window.open(
      `https://wa.me/6285156868857?text=Halo, ada permintaan Re Expertise dari ${data.unit} atas nama ${data.nama}`,
      "_blank"
    );
    loadData();
  });
}

function loadData() {
  fetch(DB_URL)
    .then(res => res.json())
    .then(data => {
      let no = 1;
      tabelData.innerHTML = "";
      for (let id in data) {
        tabelData.innerHTML += `
        <tr>
          <td>${no++}</td>
          <td>${data[id].nama}</td>
          <td>${data[id].unit}</td>
          <td>${data[id].permintaan}</td>
          <td>${data[id].jam}</td>
          <td>${data[id].status}</td>
          <td>
            <button onclick="updateStatus('${id}','Selesai')">Selesai</button>
          </td>
        </tr>`;
      }
    });
}

function updateStatus(id, status) {
  fetch(`https://develop-re-expertise2026-default-rtdb.asia-southeast1.firebasedatabase.app/data/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  }).then(loadData);
}

if (location.pathname.includes("dashboard")) {
  loadData();
}
