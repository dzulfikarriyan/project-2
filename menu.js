document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Play background music when page loads
    backgroundMusic.play();

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('#bottom-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 70; // a bit of offset
            let sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('#bottom-nav a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('#bottom-nav a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }

    const ucapanForm = document.getElementById('ucapanForm');
    const namaPengirim = document.getElementById('namaPengirim');
    const isiUcapan = document.getElementById('isiUcapan');
    const daftarUcapan = document.getElementById('daftarUcapan');

    ucapanForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nama = namaPengirim.value;
        const ucapan = isiUcapan.value;

        if (nama.trim() === '' || ucapan.trim() === '') {
            alert('Nama dan ucapan tidak boleh kosong!');
            return;
        }

        const ucapanBaru = document.createElement('div');
        ucapanBaru.classList.add('ucapan-item');
        ucapanBaru.innerHTML = `
            <h4>${nama}</h4>
            <p>${ucapan}</p>
        `;

        daftarUcapan.appendChild(ucapanBaru);

        // Clear the form
        namaPengirim.value = '';
        isiUcapan.value = '';
    });
}); 