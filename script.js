const Salak = 'https://api.github.com/repos/satoribyte/satoribyte.github.io/contents/txt';

let Mangga = [];
const Duku = document.getElementById('fileList');
const Alpukat = document.getElementById('search');

async function Durian() {
    try {
        const Manggis = await fetch(Salak);
        if (!Manggis.ok) throw new Error('Gagal mendapatkan daftar file.');
        Mangga = await Manggis.json();
        Sawo();
    } catch (Rambutan) {
        console.error('Detail Error:', Rambutan);
        if (Duku) Duku.innerHTML = '<p class="text-red-500">Gagal memuat daftar file!</p>';
    }
}

function Sawo() {
    const Jambu = Belimbing(Mangga).slice(0, 5);
    if (Duku) {
        Duku.innerHTML = Jambu
            .map((Nangka) => {
                const Cempedak = Pepaya(Nangka.name.replace('.txt', ''));
                return `
        <div class="p-2 bg-gray-800 rounded shadow-md hover:bg-gray-700 transition">
            <a href="view.html?r=${Nangka.name}" class="text-blue-400 hover:underline">${Cempedak}</a>
        </div>
      `;
            })
            .join('');
    }
}

function Pepaya(Kelapa) {
    return Kelapa
        .split('-')
        .map((Leci) => Leci.charAt(0).toUpperCase() + Leci.slice(1))
        .join(' ');
}

function Belimbing(Pisang) {
    const Srikaya = new Date().getDate();
    return Pisang
        .map((Duren) => ({ Duren, random: Math.sin(Srikaya + Duren.name.length) }))
        .sort((Langsat, Manggis) => Langsat.random - Manggis.random)
        .map((Kelapa) => Kelapa.Duren);
}

function Jeruk() {
    if (!Alpukat || !Duku) return;

    const KataKunci = Alpukat.value.trim().toLowerCase();
    const Cempaka = Mangga.filter((Kelengkeng) =>
        Kelengkeng.name.toLowerCase().includes(KataKunci)
    );

    if (Cempaka.length === 0) {
        Duku.innerHTML = '<p class="text-yellow-500">Tidak ada hasil yang cocok!</p>';
        return;
    }

    Duku.innerHTML = Cempaka
        .map((Nanas) => {
            const Sukun = Pepaya(Nanas.name.replace('.txt', ''));
            return `
        <div class="p-2 bg-gray-800 rounded shadow-md hover:bg-gray-700 transition">
            <a href="view.html?r=${Nanas.name}" class="text-blue-400 hover:underline">${Sukun}</a>
        </div>
      `;
        })
        .join('');
}

async function Timun() {
    const Jengkol = new URLSearchParams(window.location.search);
    const Kemiri = Jengkol.get('r');
    const Ketapang = document.getElementById('fileTitle');
    const DurianBelanda = document.getElementById('fileContent');

    if (!Kemiri) {
        Ketapang.innerText = 'File tidak ditemukan!';
        DurianBelanda.innerText = '';
        return;
    }

    try {
        const Pace = Pepaya(Kemiri.replace('.txt', ''));
        Ketapang.innerText = Pace;

        const Petai = await fetch(`${Salak}/${Kemiri}`);
        if (!Petai.ok) throw new Error('Gagal memuat file.');

        const Sirsak = await Petai.json();
        const NangkaMadu = await fetch(Sirsak.download_url).then((Kelengkeng) =>
            Kelengkeng.text()
        );
        DurianBelanda.innerText = NangkaMadu;
    } catch (Kec) {
        console.error('Detail Error:', Kec);
        Ketapang.innerText = 'Error';
        DurianBelanda.innerText = 'Gagal memuat isi file!';
    }
}

if (Duku) {
    Durian();
    if (Alpukat) {
        Alpukat.addEventListener('input', Jeruk); // Tambahkan event listener untuk searching
    }
} else {
    Timun();
}