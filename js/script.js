const texts = [
    "Hola Valentina 💕",
    "¿Sabías que cada día me enamoro más de ti?",
    "Eres lo más bonito que me ha pasado...",
    "¿Quieres ser mi San Valentín? 💌"
];

let step = 0;
const textEl = document.getElementById("text");
const btns = document.getElementById("buttons");
const card = document.getElementById("card");
const clickSound = document.getElementById("clickSound");
const magicSound = document.getElementById("magicSound");

// Pantalla OFF/ON mejorado
function flicker() {
    document.body.classList.add("screen-off");
    setTimeout(() => {
        document.body.classList.remove("screen-off");
        createHearts(5); // Pequeña lluvia al "encender"
    }, 250);
}

// Sonidos
function playSound(audioElement, volume = 0.5) {
    audioElement.currentTime = 0;
    audioElement.volume = volume;
    audioElement.play().catch(e => console.log("Auto-play bloqueado:", e));
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
        <button class="yes" onclick="acceptLove()">¡Claro que sí! 💖</button>
        <button class="no" 
                onmouseover="escapeButton(this)"
                ontouchstart="escapeButton(this)"
                onclick="escapeButton(this)">
            Tal vez... 😅
        </button>
    `;
    
    // Animación de entrada de botones
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
    const maxX = window.innerWidth - btn.offsetWidth;
    const maxY = window.innerHeight - btn.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btn.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.5)';
    btn.style.position = 'fixed';
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
    btn.style.zIndex = '1000';
    
    // Cambiar texto para divertir
    const messages = ["¡Ay no!", "Atrapame 😜", "Ups...", "Aquí no!", "¿En serio?", "😹"];
    btn.innerText = messages[Math.floor(Math.random() * messages.length)];
    
    playSound(clickSound, 0.2);
}

// ACEPTAR
function acceptLove() {
    playSound(magicSound, 0.7);
    flicker();
    
    // Confeti CANVAS-CONFETTI
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5e78', '#ffb8c6', '#ff357f', '#ff8fab']
    });
    
    // Efecto en la tarjeta
    card.classList.add("love");
    textEl.innerHTML = "¡Sabía que dirías que sí! 🥹<br><br>Te amo con todo mi corazón, mi niña preciosa 💕<br><br><small>Nos vemos el 14 de febrero ❤️✨</small>";
    
    // Limpiar botones
    btns.innerHTML = '';
    
    // Explosión MEGA de corazones
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
    
    // Lluvia continua
    for(let i = 0; i < 80; i++) {
        setTimeout(() => createHearts(2), i * 100);
    }
    
    // Corazones gigantes especiales
    createSpecialHearts(3);
}

// Crear corazones normales
function createHearts(count = 1) {
    for(let i = 0; i < count; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "💖";
        
        // Posición aleatoria
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 15 + "px";
        
        // Animación personalizada
        const duration = Math.random() * 4 + 3;
        heart.style.animation = `floatUp ${duration}s linear forwards`;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }
}

// Corazones especiales gigantes
function createSpecialHearts(count) {
    const specialHearts = ["💘", "💝", "💖", "💗", "💓"];
    
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

// Lluvia inicial de corazones
setInterval(() => createHearts(1), 400);

// Click para avanzar
document.body.addEventListener("click", (e) => {
    if (step < texts.length && !e.target.closest("button")) {
        nextStep();
    }
});

// Toque para móviles
document.body.addEventListener("touchstart", (e) => {
    if (step < texts.length && !e.target.closest("button")) {
        nextStep();
    }
});

// Instrucción inicial
setTimeout(() => {
    const instructions = document.createElement("div");
    instructions.className = "instructions";
    instructions.innerText = "Haz clic o toca la pantalla para continuar...";
    document.body.appendChild(instructions);
}, 1000);
