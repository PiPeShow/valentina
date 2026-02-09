const texts = [
    "Pasaba por aquí para preguntarte si...",
    "Sabías que cada día me enamoro más de ti?",
    "Y que eres lo más bonito que me ha pasado?",
    "Entonces mi duda es...",
    "Quieres ser mi 14 de Febrero?"
];

let step = 0;
const textEl = document.getElementById("text");
const btns = document.getElementById("buttons");
const card = document.getElementById("card");
const clickSound = document.getElementById("clickSound");
const magicSound = document.getElementById("magicSound");
const bgMusic = document.getElementById("bgMusic");

// Inicializar texto inicial
textEl.innerText = texts[0];
step = 1; // Ya mostramos el primer texto

// Función para iniciar música de fondo
function startBackgroundMusic() {
    if (!bgMusic) return;
    
    bgMusic.volume = 0.3;
    bgMusic.loop = true;
    
    const startMusic = () => {
        bgMusic.play().catch(e => {
            console.log("Música bloqueada:", e);
        });
        document.removeEventListener('click', startMusic);
        document.removeEventListener('touchstart', startMusic);
    };
    
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });
}

// Pantalla OFF/ON mejorado
function flicker() {
    document.body.classList.add("screen-off");
    setTimeout(() => {
        document.body.classList.remove("screen-off");
        createHearts(5);
    }, 250);
}

// Sonidos
function playSound(audioElement, volume = 0.5) {
    if (!audioElement) return;
    audioElement.currentTime = 0;
    audioElement.volume = volume;
    audioElement.play().catch(e => console.log("Sonido bloqueado:", e));
}

// Avanzar paso
function nextStep() {
    if (step >= texts.length) return;
    
    playSound(clickSound, 0.3);
    flicker();
    
    setTimeout(() => {
        textEl.style.opacity = 0;
        setTimeout(() => {
            textEl.innerText = texts[step];
            textEl.style.opacity = 1;
            step++;
            
            if (step === texts.length) {
                setTimeout(showButtons, 800);
            }
        }, 200);
    }, 260);
}

// Mostrar botones con estilo
function showButtons() {
    playSound(magicSound, 0.4);
    
    btns.innerHTML = `
        <button class="yes" onclick="acceptLove()">Siiii!</button>
        <button class="no" 
                onmouseover="escapeButton(this)"
                ontouchstart="escapeButton(this)"
                onclick="escapeButton(this)">
            No
        </button>
    `;
    
    const buttons = btns.querySelectorAll('button');
    buttons.forEach((btn, i) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(30px)';
        setTimeout(() => {
            btn.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, i * 200);
    });
}

// Botón que escapa mejorado
function escapeButton(btn) {
    if (btn.parentElement !== document.body) {
        const rect = btn.getBoundingClientRect();
        document.body.appendChild(btn);
        btn.style.left = rect.left + "px";
        btn.style.top = rect.top + "px";
    }

    btn.style.position = "fixed";

    const maxX = document.documentElement.clientWidth - btn.offsetWidth - 10;
    const maxY = document.documentElement.clientHeight - btn.offsetHeight - 10;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btn.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.5)";
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
    btn.style.zIndex = "9999";

    const messages = [
        "Nooooo!",
        "Qué haces?",
        "Creo que te equivocaste...",
        "...",
        "JAJAJAJAJAJA no",
        "No, no es una opción válida."
    ];
    btn.innerText = messages[Math.floor(Math.random() * messages.length)];

    playSound(clickSound, 0.2);
}

// ACEPTAR
function acceptLove() {
    playSound(magicSound, 0.7);
    flicker();
    
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff5e78', '#ffb8c6', '#ff357f', '#ff8fab']
        });
    }
    
    card.classList.add("love");
    textEl.innerHTML = "YIJAAAAAAA<br><br>Te amo con todo mi corazón, mi niña bonita<br><br><small>Nos vemos este finde❤️</small>";
    
    btns.innerHTML = '';
    
    if (typeof confetti === 'function') {
        setTimeout(() => confetti({
            particleCount: 300,
            angle: 60,
            spread: 80,
            origin: { x: 0 },
            colors: ['#ff5e78', '#ffb8c6']
        }), 300);
        
        setTimeout(() => confetti({
            particleCount: 300,
            angle: 120,
            spread: 80,
            origin: { x: 1 },
            colors: ['#ff357f', '#ff8fab']
        }), 600);
    }
    
    for(let i = 0; i < 80; i++) {
        setTimeout(() => createHearts(2), i * 100);
    }
    
    createSpecialHearts(3);
}

// Crear corazones normales
function createHearts(count = 1) {
    for(let i = 0; i < count; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "💖";
        
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 15 + "px";
        
        const duration = Math.random() * 4 + 3;
        heart.style.animation = `floatUp ${duration}s linear forwards`;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }
}

// Corazones especiales gigantes - ERROR CORREGIDO AQUÍ
function createSpecialHearts(count) {
    const specialHearts = ["💘", "💝", "🕺", "🐺", "💃"];  // CORREGIDO
    
    for(let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.innerHTML = specialHearts[Math.floor(Math.random() * specialHearts.length)];
            
            heart.style.left = "50%";
            heart.style.top = "50%";
            heart.style.transform = "translate(-50%, -50%)";
            heart.style.fontSize = "80px";
            heart.style.opacity = "0.9";
            heart.style.zIndex = "5";
            heart.style.animation = `floatUp ${6}s ease-in-out forwards`;
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }, i * 500);
    }
}

// INICIALIZACIÓN - UNA SOLA VEZ
document.addEventListener('DOMContentLoaded', () => {
    startBackgroundMusic();
    
    setInterval(() => createHearts(1), 500);
    
    setTimeout(() => {
        const instructions = document.createElement("div");
        instructions.className = "instructions";
        instructions.innerText = "Toca la pantalla para continuar...";
        document.body.appendChild(instructions);
        
        setTimeout(() => {
            if (instructions.parentNode) {
                instructions.remove();
            }
        }, 3000);
    }, 1000);
});

// Evento para avanzar
const startEvent = "ontouchstart" in window ? "touchstart" : "click";
document.body.addEventListener(startEvent, (e) => {
    if (step < texts.length && !e.target.closest("button")) {
        nextStep();
    }
});
