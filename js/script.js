// kriteria: array (untuk menyimpan data bus yang diinputkan user)
let listBus = []; 
let idSedangDiedit = null;

function tambahData() {
    // DOM: ambil data dari inputan user
    const nama = document.getElementById("namaBus").value;
    const rute = document.getElementById("tujuanBus").value;
    const jam = document.getElementById("jamBus").value;
    const harga = document.getElementById("hargaBus").value;

    // kriteria: kotak dialog (buat validasi input data bus)
    if (nama === "" || rute === "") {
        alert("Jangan dikosongkan ya!");
        return;
    }

    // kriteria: object string (buat rute bus jadi huruf kecil semua)
    let ruteKecil = rute.toLowerCase();

    // kriteria: object math (buat id bus random)
    let idBus = Math.floor(Math.random() * 900) + 100;

    // kriteria: object date (buat waktu input data bus)
    const tgl = new Date();
    let waktuInput = tgl.getHours() + ":" + tgl.getMinutes();

    // kriteria: object (buat object baru untuk data bus)
    let busBaru = {
        id: idBus,
        namaBus: nama,
        ruteBus: ruteKecil,
        jamBus: jam,
        hargaBus: harga,
        waktu: waktuInput
    };

    // simpan atau update
    if (idSedangDiedit === null) {
        listBus.push(busBaru);
    } else {
        // kalau sedang di edit, ganti data yang lama
        busBaru.id = idSedangDiedit; // ID lama
        const index = listBus.findIndex(b => b.id === idSedangDiedit);
        listBus[index] = busBaru;
        idSedangDiedit = null; // reset
        document.querySelector(".btn-simpan").innerText = "Simpan Data";
    }

    // Bersihkan input
    document.getElementById("namaBus").value = "";
    document.getElementById("tujuanBus").value = "";
    document.getElementById("jamBus").value = "";
    document.getElementById("hargaBus").value = "";

    munculkanTabel();
}

function munculkanTabel() {
    const tabel = document.getElementById("tempatData");
    const countArmada = document.getElementById("jumlahData");
    let baris = "";

    for (let i = 0; i < listBus.length; i++) {
        baris += `<tr>
            <td style="font-size: 11px; color: #7a6e60;">#${listBus[i].id}</td>
            <td class="td-nama">${listBus[i].namaBus}</td>
            <td class="td-tujuan"><span>${listBus[i].ruteBus}</span></td>
            <td>${listBus[i].jamBus}</td>
            <td class="td-harga">Rp ${listBus[i].hargaBus}</td>
            <td style="font-size: 11px;">${listBus[i].waktu}</td>
            <td>
                <button class="btn-edit" onclick="editData(${listBus[i].id})">Edit</button>
                <button class="btn-hapus" onclick="hapusData(${i})">Hapus</button>
            </td>
        </tr>`;
    }
    tabel.innerHTML = baris;
    countArmada.innerText = listBus.length + " armada";
}

// fitur edit: naruh data balik ke kotak input
function editData(id) {
    const bus = listBus.find(b => b.id === id);
    document.getElementById("namaBus").value = bus.namaBus;
    document.getElementById("tujuanBus").value = bus.ruteBus;
    document.getElementById("jamBus").value = bus.jamBus;
    document.getElementById("hargaBus").value = bus.hargaBus;
    
    idSedangDiedit = id;
    document.querySelector(".btn-simpan").innerText = "Update Data";
}

// kriteria: function dan kotak dialog (buat konfirmasi sebelum hapus data bus)
function hapusData(nomor) {
    if (confirm("Hapus jadwal ini?")) {
        listBus.splice(nomor, 1);
        munculkanTabel();
    }
}