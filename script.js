// Global Variables
let currentQuestion = 0;
let currentSubtes = '';
let userAnswers = [];
let questions = [];
let timerInterval;
let timeLeft = 1800; // 30 minutes in seconds

// Bank Soal
const questionBank = {
    pu: [ // Penalaran Umum
        {
            question: "Semua mahasiswa rajin belajar. Budi adalah mahasiswa. Kesimpulan yang tepat adalah...",
            options: [
                "Budi rajin belajar",
                "Budi tidak rajin belajar",
                "Budi mungkin rajin belajar",
                "Tidak dapat disimpulkan"
            ],
            correct: 0
        },
        {
            question: "Jika hari ini hujan, maka jalanan basah. Jalanan basah. Kesimpulan yang tepat adalah...",
            options: [
                "Hari ini pasti hujan",
                "Hari ini mungkin hujan",
                "Hari ini tidak hujan",
                "Tidak dapat disimpulkan dengan pasti"
            ],
            correct: 3
        },
        {
            question: "Pola: 2, 6, 12, 20, 30, ... Angka selanjutnya adalah?",
            options: ["40", "42", "44", "46"],
            correct: 1
        },
        {
            question: "Analogi: DOKTER : RUMAH SAKIT = GURU : ?",
            options: ["Buku", "Sekolah", "Siswa", "Mengajar"],
            correct: 1
        },
        {
            question: "Semua burung memiliki sayap. Sebagian hewan yang memiliki sayap dapat terbang. Kesimpulan yang paling tepat adalah...",
            options: [
                "Semua burung dapat terbang",
                "Sebagian burung dapat terbang",
                "Tidak ada burung yang dapat terbang",
                "Semua hewan bersayap adalah burung"
            ],
            correct: 1
        },
        {
            question: "Jika A > B dan B > C, maka...",
            options: [
                "A < C",
                "A = C",
                "A > C",
                "Tidak dapat ditentukan"
            ],
            correct: 2
        },
        {
            question: "Pola: Z, Y, X, W, ... Huruf selanjutnya adalah?",
            options: ["U", "V", "T", "S"],
            correct: 1
        },
        {
            question: "Tidak ada politisi yang jujur. Sebagian pengusaha adalah politisi. Kesimpulan yang tepat adalah...",
            options: [
                "Semua pengusaha tidak jujur",
                "Sebagian pengusaha tidak jujur",
                "Tidak ada pengusaha yang jujur",
                "Semua politisi adalah pengusaha"
            ],
            correct: 1
        },
        {
            question: "Pola: 1, 1, 2, 3, 5, 8, ... Angka selanjutnya adalah?",
            options: ["11", "12", "13", "14"],
            correct: 2
        },
        {
            question: "Analogi: AWAL : AKHIR = PAGI : ?",
            options: ["Siang", "Sore", "Malam", "Petang"],
            correct: 2
        },
        {
            question: "Semua kucing adalah mamalia. Sebagian mamalia hidup di air. Kesimpulan yang tepat adalah...",
            options: [
                "Semua kucing hidup di air",
                "Sebagian kucing hidup di air",
                "Tidak semua kucing hidup di air",
                "Tidak ada kucing yang hidup di air"
            ],
            correct: 3
        },
        {
            question: "Jika P maka Q. Tidak Q. Kesimpulan yang tepat adalah...",
            options: [
                "P benar",
                "Tidak P",
                "P mungkin benar",
                "Tidak dapat disimpulkan"
            ],
            correct: 1
        },
        {
            question: "Pola: 100, 95, 85, 70, 50, ... Angka selanjutnya adalah?",
            options: ["25", "30", "35", "40"],
            correct: 0
        },
        {
            question: "Analogi: API : PANAS = ES : ?",
            options: ["Air", "Dingin", "Putih", "Padat"],
            correct: 1
        },
        {
            question: "Beberapa siswa pandai matematika. Semua yang pandai matematika suka fisika. Kesimpulan yang tepat adalah...",
            options: [
                "Semua siswa suka fisika",
                "Beberapa siswa suka fisika",
                "Tidak ada siswa yang suka fisika",
                "Semua yang suka fisika pandai matematika"
            ],
            correct: 1
        },
        {
            question: "Jika X = 2Y dan Y = 3Z, maka X dalam Z adalah...",
            options: ["6Z", "5Z", "3Z", "2Z"],
            correct: 0
        },
        {
            question: "Pola: AZ, BY, CX, DW, ... Pasangan selanjutnya adalah?",
            options: ["EV", "EU", "FV", "FU"],
            correct: 0
        },
        {
            question: "Tidak ada siswa yang malas lulus ujian. Sebagian siswa kelas A lulus ujian. Kesimpulan yang tepat adalah...",
            options: [
                "Semua siswa kelas A tidak malas",
                "Sebagian siswa kelas A tidak malas",
                "Tidak ada siswa kelas A yang malas",
                "Semua siswa yang lulus tidak malas"
            ],
            correct: 1
        },
        {
            question: "Analogi: GELAP : TERANG = SEDIH : ?",
            options: ["Menangis", "Gembira", "Tertawa", "Senang"],
            correct: 1
        },
        {
            question: "Pola: 3, 9, 27, 81, ... Angka selanjutnya adalah?",
            options: ["162", "243", "324", "405"],
            correct: 1
        }
    ],
    pk: [ // Pengetahuan Kuantitatif
        {
            question: "Hasil dari 15% dari 200 adalah...",
            options: ["25", "30", "35", "40"],
            correct: 1
        },
        {
            question: "Jika x + 5 = 12, maka x = ?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Luas persegi dengan sisi 8 cm adalah...",
            options: ["32 cm²", "64 cm²", "128 cm²", "256 cm²"],
            correct: 1
        },
        {
            question: "Rata-rata dari 4, 6, 8, 10, 12 adalah...",
            options: ["6", "8", "10", "12"],
            correct: 1
        },
        {
            question: "Jika 2x - 3 = 7, maka x = ?",
            options: ["3", "4", "5", "6"],
            correct: 2
        },
        {
            question: "Keliling lingkaran dengan diameter 14 cm (π = 22/7) adalah...",
            options: ["44 cm", "88 cm", "154 cm", "308 cm"],
            correct: 0
        },
        {
            question: "Hasil dari (3 + 2) × 4 - 6 ÷ 2 = ?",
            options: ["14", "17", "20", "23"],
            correct: 1
        },
        {
            question: "Perbandingan umur Ani dan Budi adalah 3:4. Jika umur Ani 15 tahun, umur Budi adalah...",
            options: ["18 tahun", "20 tahun", "21 tahun", "24 tahun"],
            correct: 1
        },
        {
            question: "Volume kubus dengan rusuk 5 cm adalah...",
            options: ["25 cm³", "50 cm³", "75 cm³", "125 cm³"],
            correct: 3
        },
        {
            question: "Jika 3x + 2y = 13 dan x = 3, maka y = ?",
            options: ["1", "2", "3", "4"],
            correct: 1
        },
        {
            question: "Luas segitiga dengan alas 10 cm dan tinggi 6 cm adalah...",
            options: ["30 cm²", "60 cm²", "120 cm²", "180 cm²"],
            correct: 0
        },
        {
            question: "25% dari 80 ditambah 15 = ?",
            options: ["30", "35", "40", "45"],
            correct: 1
        },
        {
            question: "Jika x² = 64, maka x = ?",
            options: ["±6", "±7", "±8", "±9"],
            correct: 2
        },
        {
            question: "Diketahui 1 lusin = 12 buah. Berapa buah dalam 3,5 lusin?",
            options: ["36", "40", "42", "48"],
            correct: 2
        },
        {
            question: "Hasil dari √144 + √81 = ?",
            options: ["15", "17", "19", "21"],
            correct: 3
        },
        {
            question: "Jika (x-3)² = 16, maka x = ?",
            options: ["1 atau 7", "1 atau -7", "-1 atau 7", "-1 atau -7"],
            correct: 2
        },
        {
            question: "Harga barang setelah diskon 20% adalah Rp 80.000. Harga awal barang adalah...",
            options: ["Rp 96.000", "Rp 100.000", "Rp 104.000", "Rp 120.000"],
            correct: 1
        },
        {
            question: "Jumlah sudut dalam segi enam adalah...",
            options: ["540°", "720°", "900°", "1080°"],
            correct: 1
        },
        {
            question: "Jika log 2 = 0,301, maka log 8 = ?",
            options: ["0,602", "0,903", "1,204", "2,408"],
            correct: 1
        },
        {
            question: "Peluang muncul mata dadu genap saat melempar satu dadu adalah...",
            options: ["1/6", "1/3", "1/2", "2/3"],
            correct: 2
        }
    ],
    lbi: [ // Literasi Bahasa Indonesia
        {
            question: "Kata yang tepat untuk melengkapi kalimat: 'Pemerintah akan ... kebijakan baru untuk mengatasi kemiskinan' adalah...",
            options: ["menerapkan", "menetapkan", "menerapan", "menetapan"],
            correct: 0
        },
        {
            question: "Ide pokok paragraf adalah gagasan utama yang ...",
            options: [
                "terdapat di awal paragraf",
                "terdapat di akhir paragraf",
                "mendasari keseluruhan paragraf",
                "terdapat di tengah paragraf"
            ],
            correct: 2
        },
        {
            question: "Penulisan kata yang benar adalah...",
            options: ["aktifitas", "aktipitas", "aktivitas", "aktiptas"],
            correct: 2
        },
        {
            question: "Kalimat yang menggunakan kata baku adalah...",
            options: [
                "Dia merasa heran dengan kejadian itu",
                "Dia merasa kaget dengan kejadian itu",
                "Dia kaget banget sama kejadian itu",
                "Dia terkejut banget ama kejadian itu"
            ],
            correct: 0
        },
        {
            question: "Antonim dari kata 'optimis' adalah...",
            options: ["Realistis", "Pesimis", "Positif", "Negatif"],
            correct: 1
        },
        {
            question: "Penulisan tanda baca yang benar adalah...",
            options: [
                "Dia berkata 'saya tidak akan menyerah'.",
                "Dia berkata, 'Saya tidak akan menyerah'.",
                "Dia berkata: 'Saya tidak akan menyerah.'",
                "Dia berkata, 'saya tidak akan menyerah.'"
            ],
            correct: 2
        },
        {
            question: "Sinonim dari kata 'komprehensif' adalah...",
            options: ["Sederhana", "Menyeluruh", "Terbatas", "Khusus"],
            correct: 1
        },
        {
            question: "Kalimat yang efektif adalah...",
            options: [
                "Saya sudah pernah ke sana sebelumnya",
                "Saya sudah ke sana sebelumnya",
                "Saya pernah ke sana",
                "Saya sudah pernah ke sana"
            ],
            correct: 2
        },
        {
            question: "Imbuhan yang tepat untuk kata 'tulis' agar bermakna 'sedang menulis' adalah...",
            options: ["di-", "ber-", "me-", "ter-"],
            correct: 2
        },
        {
            question: "Kata majemuk yang penulisannya benar adalah...",
            options: ["Rumahsakit", "Rumah sakit", "Rumah-sakit", "RumahSakit"],
            correct: 1
        },
        {
            question: "Jenis kalimat 'Tutuplah pintu itu!' adalah kalimat...",
            options: ["Berita", "Tanya", "Perintah", "Seru"],
            correct: 2
        },
        {
            question: "Penulisan angka yang benar dalam kalimat adalah...",
            options: [
                "Dia membeli 5 buah apel",
                "Dia membeli lima buah apel",
                "Dia membeli V buah apel",
                "Semua benar"
            ],
            correct: 1
        },
        {
            question: "Makna kata 'deduksi' adalah...",
            options: [
                "Penarikan kesimpulan dari umum ke khusus",
                "Penarikan kesimpulan dari khusus ke umum",
                "Pembuktian dengan contoh",
                "Penjelasan detail"
            ],
            correct: 0
        },
        {
            question: "Kata yang mengalami perubahan makna peyorasi adalah...",
            options: ["Bapak", "Wanita", "Perempuan", "Nyonya"],
            correct: 1
        },
        {
            question: "Kalimat yang mengandung majas hiperbola adalah...",
            options: [
                "Suaranya keras seperti petir",
                "Suaranya menggelegar",
                "Suaranya membelah langit",
                "Suaranya sangat keras"
            ],
            correct: 2
        },
        {
            question: "Penulisan kata serapan yang benar dari 'technique' adalah...",
            options: ["teknik", "tehnik", "tekhnik", "tekniq"],
            correct: 0
        },
        {
            question: "Jenis paragraf berdasarkan letak kalimat utama di awal adalah...",
            options: ["Induktif", "Deduktif", "Campuran", "Naratif"],
            correct: 1
        },
        {
            question: "Kata yang bermakna konotasi positif adalah...",
            options: ["Melarat", "Miskin", "Sederhana", "Melarat"],
            correct: 2
        },
        {
            question: "Kata penghubung yang menyatakan pertentangan adalah...",
            options: ["dan", "tetapi", "lalu", "kemudian"],
            correct: 1
        },
        {
            question: "Makna kata 'empiris' adalah...",
            options: [
                "Berdasarkan teori",
                "Berdasarkan pengalaman",
                "Berdasarkan logika",
                "Berdasarkan asumsi"
            ],
            correct: 1
        }
    ]
};

// Detail Subtes
const subtesDetails = {
    pu: {
        title: "Penalaran Umum",
        description: "Subtes ini mengukur kemampuan berpikir logis dan penalaran dalam berbagai konteks.",
        materi: [
            "Penalaran Deduktif - Menarik kesimpulan dari pernyataan umum ke khusus",
            "Penalaran Induktif - Menarik kesimpulan dari kasus khusus ke umum",
            "Analogi - Mencari hubungan kesamaan antar konsep",
            "Silogisme - Penarikan kesimpulan dari dua premis",
            "Pola dan Deret - Mencari pola dalam urutan angka atau huruf"
        ],
        tips: [
            "Baca soal dengan teliti",
            "Identifikasi jenis penalaran yang diminta",
            "Jangan terburu-buru dalam menjawab",
            "Eliminasi jawaban yang jelas salah"
        ]
    },
    pk: {
        title: "Pengetahuan Kuantitatif",
        description: "Subtes ini mengukur kemampuan matematis dasar dan pemecahan masalah kuantitatif.",
        materi: [
            "Operasi Aljabar - Penjumlahan, pengurangan, perkalian, pembagian",
            "Persamaan dan Pertidaksamaan Linear",
            "Perbandingan, Rasio, dan Proporsi",
            "Geometri - Luas dan keliling bangun datar",
            "Statistika Dasar - Rata-rata, median, modus",
            "Peluang Sederhana"
        ],
        tips: [
            "Kuasai rumus-rumus dasar",
            "Latihan soal secara rutin",
            "Gunakan strategi eliminasi jawaban",
            "Perhatikan satuan dalam soal"
        ]
    },
    ppu: {
        title: "Pengetahuan dan Pemahaman Umum",
        description: "Subtes ini mengukur wawasan kebangsaan, pengetahuan umum, dan pemahaman kontekstual.",
        materi: [
            "Sejarah Indonesia",
            "Pancasila dan UUD 1945",
            "Geografi Indonesia",
            "Ekonomi dan Sosial",
            "Kebudayaan Indonesia"
        ],
        tips: [
            "Banyak membaca berita terkini",
            "Pahami konteks Indonesia",
            "Pelajari dasar-dasar ketatanegaraan",
            "Ikuti perkembangan isu nasional"
        ]
    },
    mbm: {
        title: "Memahami Bacaan dan Menulis",
        description: "Subtes ini mengukur kemampuan memahami teks dan menulis dengan baik dan benar.",
        materi: [
            "Membaca cepat dan pemahaman",
            "Mengidentifikasi ide pokok",
            "Menganalisis struktur teks",
            "Menulis efektif",
            "PUEBI dan Ejaan"
        ],
        tips: [
            "Latihan membaca berbagai jenis teks",
            "Pahami struktur paragraf",
            "Kuasai kaidah bahasa Indonesia",
            "Tingkatkan kosakata"
        ]
    },
    lbi: {
        title: "Literasi Bahasa Indonesia",
        description: "Subtes ini mengukur kemampuan membaca dan memahami teks dalam Bahasa Indonesia.",
        materi: [
            "Pemahaman bacaan",
            "Kosakata dan makna kata",
            "Struktur kalimat",
            "Ejaan dan tanda baca",
            "Jenis-jenis teks"
        ],
        tips: [
            "Baca dengan cermat",
            "Pahami konteks bacaan",
            "Perhatikan kata kunci",
            "Latihan soal UTBK tahun sebelumnya"
        ]
    },
    lbing: {
        title: "Literasi Bahasa Inggris",
        description: "Subtes ini mengukur kemampuan membaca dan memahami teks dalam Bahasa Inggris.",
        materi: [
            "Reading comprehension",
            "Vocabulary",
            "Grammar",
            "Text types",
            "Inference and conclusion"
        ],
        tips: [
            "Tingkatkan kemampuan vocabulary",
            "Latihan reading comprehension",
            "Pahami struktur kalimat bahasa Inggris",
            "Sering membaca teks bahasa Inggris"
        ]
    },
    pm: {
        title: "Penalaran Matematika",
        description: "Subtes ini mengukur kemampuan penalaran matematis tingkat tinggi.",
        materi: [
            "Logika matematika",
            "Pemecahan masalah kompleks",
            "Penalaran kuantitatif lanjutan",
            "Pola dan fungsi",
            "Aplikasi matematika"
        ],
        tips: [
            "Kuasai konsep matematika dasar",
            "Latihan soal HOTS",
            "Pahami pola dan hubungan",
            "Jangan terpaku pada rumus hafalan"
        ]
    }
};

// Show Subtes Detail Modal
function showSubtesDetail(subtesId) {
    const detail = subtesDetails[subtesId];
    const modal = new bootstrap.Modal(document.getElementById('subtesModal'));
    
    document.getElementById('subtesModalTitle').textContent = detail.title;
    
    let materiHTML = '<h6>Materi yang Diujikan:</h6><ul class="mb-3">';
    detail.materi.forEach(item => {
        materiHTML += `<li>${item}</li>`;
    });
    materiHTML += '</ul>';
    
    let tipsHTML = '<h6>Tips Mengerjakan:</h6><ul>';
    detail.tips.forEach(tip => {
        tipsHTML += `<li>${tip}</li>`;
    });
    tipsHTML += '</ul>';
    
    document.getElementById('subtesModalBody').innerHTML = `
        <p>${detail.description}</p>
        ${materiHTML}
        ${tipsHTML}
    `;
    
    modal.show();
}

// Show Materi Detail
function showMateriDetail(subtesId) {
    showSubtesDetail(subtesId);
}

// Start CBT
function startCBT(subtesType) {
    currentSubtes = subtesType;
    currentQuestion = 0;
    userAnswers = [];
    
    // Load questions based on subtes
    if (questionBank[subtesType]) {
        questions = questionBank[subtesType];
    } else {
        questions = questionBank.pu; // Default to PU
    }
    
    // Initialize user answers array
    for (let i = 0; i < questions.length; i++) {
        userAnswers.push(null);
    }
    
    // Hide menu and show interface
    document.getElementById('cbtMenu').classList.add('d-none');
    document.getElementById('cbtInterface').classList.remove('d-none');
    document.getElementById('cbtResult').classList.add('d-none');
    
    // Set title
    const titles = {
        pu: 'Penalaran Umum',
        pk: 'Pengetahuan Kuantitatif',
        lbi: 'Literasi Bahasa Indonesia'
    };
    document.getElementById('cbtTitle').textContent = `Latihan CBT - ${titles[subtesType] || 'UTBK'}`;
    
    // Start timer
    timeLeft = 1800; // 30 minutes
    startTimer();
    
    // Load first question
    loadQuestion();
    updateNavigator();
}

// Start Timer
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endCBT();
        }
    }, 1000);
}

// Update Timer Display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Change color when time is running out
    if (timeLeft <= 300) { // 5 minutes
        document.getElementById('timer').classList.remove('bg-light', 'text-dark');
        document.getElementById('timer').classList.add('bg-danger', 'text-white');
    }
}

// Load Question
function loadQuestion() {
    const q = questions[currentQuestion];
    
    let optionsHTML = '';
    q.options.forEach((option, index) => {
        const checked = userAnswers[currentQuestion] === index ? 'checked' : '';
        const selectedClass = userAnswers[currentQuestion] === index ? 'selected' : '';
        optionsHTML += `
            <label class="answer-option ${selectedClass}" onclick="selectAnswer(${index})">
                <input type="radio" name="answer" value="${index}" ${checked}>
                <span>${String.fromCharCode(65 + index)}. ${option}</span>
            </label>
        `;
    });
    
    document.getElementById('questionContainer').innerHTML = `
        <div class="question-number">Soal ${currentQuestion + 1} dari ${questions.length}</div>
        <div class="question-text">${q.question}</div>
        <div class="options-container">${optionsHTML}</div>
    `;
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').textContent = 
        currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya';
}

// Select Answer
function selectAnswer(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    
    // Update visual
    const options = document.querySelectorAll('.answer-option');
    options.forEach((opt, idx) => {
        if (idx === optionIndex) {
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
        } else {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        }
    });
    
    updateNavigator();
}

// Next Question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        updateNavigator();
        // Pindahkan scroll ke awal CBT Interface
        window.scrollTo(0, document.getElementById('cbtInterface').offsetTop - 70);
    } else {
        // End test
        console.log('Mencapai konfirmasi selesai');
        if (confirm('Anda yakin ingin mengakhiri tes?')) {
            endCBT();
        }
    }
}

// Previous Question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        updateNavigator();
        // Pindahkan scroll ke awal CBT Interface
        window.scrollTo(0, document.getElementById('cbtInterface').offsetTop - 70);
    }
}

// Go to Question
function goToQuestion(index) {
    currentQuestion = index;
    loadQuestion();
    updateNavigator();
    // Pindahkan scroll ke awal CBT Interface
    window.scrollTo(0, document.getElementById('cbtInterface').offsetTop - 70);
}

// Update Navigator
function updateNavigator() {
    let navHTML = '';
    
    for (let i = 0; i < questions.length; i++) {
        let classes = 'nav-badge';
        
        if (i === currentQuestion) {
            classes += ' current';
        } else if (userAnswers[i] !== null) {
            classes += ' answered';
        }
        
        navHTML += `<span class="${classes}" onclick="goToQuestion(${i})">${i + 1}</span>`;
    }
    
    document.getElementById('questionNav').innerHTML = navHTML;
}

// End CBT
function endCBT() {
    clearInterval(timerInterval);
    
    // Calculate score
    let benar = 0;
    let salah = 0;
    let kosong = 0;
    
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === null) {
            kosong++;
        } else if (userAnswers[i] === questions[i].correct) {
            benar++;
        } else {
            salah++;
        }
    }
    
    const nilai = Math.round((benar / questions.length) * 100);
    
    // Show result
    document.getElementById('cbtInterface').classList.add('d-none');
    document.getElementById('cbtResult').classList.remove('d-none');
    
    document.getElementById('scoreBenar').textContent = benar;
    document.getElementById('scoreSalah').textContent = salah;
    document.getElementById('scoreKosong').textContent = kosong;
    document.getElementById('nilaiAkhir').textContent = nilai;
}

// Back to CBT Menu
function backToCBTMenu() {
    document.getElementById('cbtResult').classList.add('d-none');
    document.getElementById('cbtMenu').classList.remove('d-none');
    
    // Reset
    currentQuestion = 0;
    userAnswers = [];
    questions = [];
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Prevent default form submission
document.addEventListener('DOMContentLoaded', () => {
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Keyboard navigation for CBT
document.addEventListener('keydown', (e) => {
    // Only work when CBT interface is active
    if (!document.getElementById('cbtInterface').classList.contains('d-none')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevQuestion();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextQuestion();
        } else if (e.key >= '1' && e.key <= '5') {
            e.preventDefault();
            const optionIndex = parseInt(e.key) - 1;
            if (optionIndex < questions[currentQuestion].options.length) {
                selectAnswer(optionIndex);
            }
        }
    }
});

// Console welcome message
console.log('%cUTBK Center', 'color: #0d6efd; font-size: 24px; font-weight: bold;');
console.log('%cSelamat belajar! Semangat untuk UTBK 2025! 🎓', 'color: #198754; font-size: 14px;');