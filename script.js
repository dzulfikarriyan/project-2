document.addEventListener('DOMContentLoaded', function() {
    const bukaUndanganButton = document.getElementById('bukaUndangan');
    const pembuka = document.getElementById('pembuka');
    const undangan = document.getElementById('undangan');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const bottomNav = document.getElementById('bottom-nav');

    // Mouse tracking effect
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const elements = document.querySelectorAll('#pembuka h1, #pembuka h2, #pembuka p');
        elements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Particle effect on button hover
    bukaUndanganButton.addEventListener('mouseenter', function() {
        createParticles();
    });

    function createParticles() {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                animation: particle 1s ease-out forwards;
            `;
            
            const rect = bukaUndanganButton.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    bukaUndanganButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // Add fade out effect
        pembuka.style.transition = 'all 0.8s ease';
        pembuka.style.opacity = '0';
        pembuka.style.transform = 'scale(0.9)';

        // Redirect after animation
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 800);
    });

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

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 