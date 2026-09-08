/* =========================================================
   UDIT DIGITAL — CINEMATIC SOUND ENGINE
========================================================= */

const UDSound = (() => {

    let audioContext = null;
    let enabled = true;
    let lastScrollSound = 0;
    let lastMouseSound = 0;

    /* =========================================================
   GLOBAL UI SOUNDS
========================================================= */


/* NAVIGATION / BUTTON HOVER */

document.querySelectorAll(
    "a, button"
).forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {

            UDSound.hover();

        }
    );


    element.addEventListener(
        "click",
        () => {

            UDSound.click();

        }
    );

});


/* SKILLS */

document.querySelectorAll(
    "#skills .ud-skill-card"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            UDSound.blip();

        }
    );

});


/* SCROLL */

let previousScroll =
    window.scrollY;


window.addEventListener(
    "scroll",
    () => {

        const currentScroll =
            window.scrollY;

        if (
            Math.abs(
                currentScroll -
                previousScroll
            ) > 35
        ) {

            UDSound.scroll();

            previousScroll =
                currentScroll;

        }

    },
    {
        passive: true
    }
);


/* EXTERNAL / CTA LINKS */

document.querySelectorAll(
    ".project-navigation a, .contact-cta a, .social-links a, .connect"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            UDSound.confirm();

        }
    );

});


    /* -----------------------------------------------------
       CREATE AUDIO CONTEXT
    ----------------------------------------------------- */

    function init() {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

    }


    /* -----------------------------------------------------
       MASTER VOLUME
    ----------------------------------------------------- */

    function gain(volume = 0.08) {

        const node =
            audioContext.createGain();

        node.gain.value = volume;

        node.connect(
            audioContext.destination
        );

        return node;

    }


    /* -----------------------------------------------------
       UI CLICK
    ----------------------------------------------------- */

    function click() {

        if (!enabled) return;

        init();

        const oscillator =
            audioContext.createOscillator();

        const volume =
            gain(0.035);

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            520,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            180,
            audioContext.currentTime + 0.08
        );

        volume.gain.setValueAtTime(
            0.035,
            audioContext.currentTime
        );

        volume.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.08
        );

        oscillator.connect(volume);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.08
        );

    }


    /* -----------------------------------------------------
       HOVER
    ----------------------------------------------------- */

    function hover() {

        if (!enabled) return;

        init();

        const oscillator =
            audioContext.createOscillator();

        const volume =
            gain(0.012);

        oscillator.type = "triangle";

        oscillator.frequency.value =
            900;

        volume.gain.setValueAtTime(
            0.012,
            audioContext.currentTime
        );

        volume.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.045
        );

        oscillator.connect(volume);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.045
        );

    }


    /* -----------------------------------------------------
       SKILL / SELECTION BLIP
    ----------------------------------------------------- */

    function blip() {

        if (!enabled) return;

        init();

        const now =
            audioContext.currentTime;

        const oscillator =
            audioContext.createOscillator();

        const volume =
            gain(0.045);

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            420,
            now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            1100,
            now + 0.12
        );

        volume.gain.setValueAtTime(
            0.045,
            now
        );

        volume.gain.exponentialRampToValueAtTime(
            0.001,
            now + 0.14
        );

        oscillator.connect(volume);

        oscillator.start(now);

        oscillator.stop(
            now + 0.14
        );

    }


    /* -----------------------------------------------------
       PROJECT WHOOSH
    ----------------------------------------------------- */

    function whoosh() {

        if (!enabled) return;

        init();

        const now =
            audioContext.currentTime;

        const oscillator =
            audioContext.createOscillator();

        const volume =
            gain(0.035);

        oscillator.type = "sawtooth";

        oscillator.frequency.setValueAtTime(
            120,
            now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            900,
            now + 0.3
        );

        volume.gain.setValueAtTime(
            0.001,
            now
        );

        volume.gain.linearRampToValueAtTime(
            0.035,
            now + 0.12
        );

        volume.gain.exponentialRampToValueAtTime(
            0.001,
            now + 0.35
        );

        oscillator.connect(volume);

        oscillator.start(now);

        oscillator.stop(
            now + 0.35
        );

    }


    /* -----------------------------------------------------
       SCROLL SOUND
    ----------------------------------------------------- */

    function scroll() {

        if (!enabled) return;

        const now =
            performance.now();

        /* Prevent excessive sounds */

        if (
            now - lastScrollSound < 100
        ) {
            return;
        }

        lastScrollSound = now;

        init();

        const oscillator =
            audioContext.createOscillator();

        const volume =
            gain(0.008);

        oscillator.type = "sine";

        oscillator.frequency.value =
            180;

        volume.gain.setValueAtTime(
            0.008,
            audioContext.currentTime
        );

        volume.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.06
        );

        oscillator.connect(volume);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.06
        );

    }


    /* -----------------------------------------------------
       SUCCESS / CTA
    ----------------------------------------------------- */

    function confirm() {

        if (!enabled) return;

        init();

        const now =
            audioContext.currentTime;


        [600, 900, 1300].forEach(
            (frequency, index) => {

                const oscillator =
                    audioContext.createOscillator();

                const volume =
                    gain(0.025);

                oscillator.type =
                    "sine";

                oscillator.frequency.value =
                    frequency;

                volume.gain.setValueAtTime(
                    0.025,
                    now + index * 0.07
                );

                volume.gain.exponentialRampToValueAtTime(
                    0.001,
                    now + index * 0.07 + 0.12
                );

                oscillator.connect(volume);

                oscillator.start(
                    now + index * 0.07
                );

                oscillator.stop(
                    now + index * 0.07 + 0.12
                );

            }
        );

    }


    /* -----------------------------------------------------
       LOADER BOOT
    ----------------------------------------------------- */

    function boot() {

        if (!enabled) return;

        init();

        const now =
            audioContext.currentTime;


        [100, 180, 320, 540].forEach(
            (frequency, index) => {

                const oscillator =
                    audioContext.createOscillator();

                const volume =
                    gain(0.025);

                oscillator.type =
                    "sine";

                oscillator.frequency.value =
                    frequency;

                volume.gain.setValueAtTime(
                    0.001,
                    now + index * 0.15
                );

                volume.gain.linearRampToValueAtTime(
                    0.025,
                    now + index * 0.15 + 0.05
                );

                volume.gain.exponentialRampToValueAtTime(
                    0.001,
                    now + index * 0.15 + 0.3
                );

                oscillator.connect(volume);

                oscillator.start(
                    now + index * 0.15
                );

                oscillator.stop(
                    now + index * 0.15 + 0.3
                );

            }
        );

    }


    /* -----------------------------------------------------
       TOGGLE
    ----------------------------------------------------- */

    function toggle() {

        enabled = !enabled;

        if (enabled) {
            init();
            click();
        }

        return enabled;

    }


    return {
        click,
        hover,
        blip,
        whoosh,
        scroll,
        confirm,
        boot,
        toggle
    };

})();
/* =========================================================
   UDIT DIGITAL — PAGE LOADER
========================================================= */

(function () {

    const loader =
        document.getElementById("udLoader");

    const loaderBar =
        document.getElementById("udLoaderBar");

    const loaderPercent =
        document.getElementById("udLoaderPercent");

    const loaderText =
        document.getElementById("udLoaderText");

    const loaderFrame =
        document.getElementById("udLoaderFrame");


    if (!loader) return;


    let progress = 0;


    /* -----------------------------------------
       LOADING MESSAGES
    ----------------------------------------- */

    const messages = [
        "INITIALIZING DIGITAL ENVIRONMENT",
        "LOADING VISUAL SYSTEM",
        "PREPARING EXPERIENCE",
        "LOADING FRAME SEQUENCE",
        "CALIBRATING INTERFACE",
        "FINALIZING EXPERIENCE"
    ];


    /* -----------------------------------------
       UPDATE LOADER
    ----------------------------------------- */

    function updateLoader(value) {

        progress = Math.min(
            100,
            Math.max(0, value)
        );


        loaderBar.style.width =
            progress + "%";


        loaderPercent.textContent =
            String(Math.floor(progress))
                .padStart(2, "0") + "%";


        const index =
            Math.min(
                messages.length - 1,
                Math.floor(
                    progress /
                    (100 / messages.length)
                )
            );


        if (loaderText) {

            loaderText.textContent =
                messages[index];

        }


        if (loaderFrame) {

            if (progress < 30) {

                loaderFrame.textContent =
                    "PREPARING DIGITAL ENVIRONMENT";

            }

            else if (progress < 60) {

                loaderFrame.textContent =
                    "LOADING VISUAL SEQUENCE";

            }

            else if (progress < 85) {

                loaderFrame.textContent =
                    "CALIBRATING EXPERIENCE";

            }

            else {

                loaderFrame.textContent =
                    "SYSTEM READY";

            }

        }

    }


    /* -----------------------------------------
       SIMULATED INITIAL PROGRESS
    ----------------------------------------- */

    let currentProgress = 0;


    const progressTimer =
        setInterval(() => {

            if (currentProgress < 85) {

                currentProgress +=
                    Math.random() * 4;

                updateLoader(
                    Math.min(
                        currentProgress,
                        85
                    )
                );

            }

        }, 120);


    /* -----------------------------------------
       PAGE READY
    ----------------------------------------- */

    function finishLoader() {

        clearInterval(progressTimer);

        updateLoader(100);


        setTimeout(() => {

            loader.classList.add(
                "ud-loader-hidden"
            );


            document.body.classList.add(
                "ud-page-ready"
            );


            setTimeout(() => {

                loader.remove();

            }, 1000);

        }, 500);

    }


    /* -----------------------------------------
       WAIT FOR PAGE
    ----------------------------------------- */

    if (
        document.readyState ===
        "complete"
    ) {

        finishLoader();

    } else {

        window.addEventListener(
            "load",
            finishLoader,
            { once: true }
        );

    }


})();

/* =========================================================
   UDIT DIGITAL PORTFOLIO
   ULTRA SMOOTH 240 FRAME SCROLL ANIMATION
   ========================================================= */

const canvas = document.getElementById("frameCanvas");

if (!canvas) {
    throw new Error("Canvas #frameCanvas not found.");
}

const ctx = canvas.getContext("2d", {
    alpha: false,
    desynchronized: true
});


/* =========================================================
   SETTINGS
   ========================================================= */

const TOTAL_FRAMES = 240;

const FRAME_PATH = "frames/frame_";

/*
    1.00 = normal
    1.05 = subtle zoom
    1.08 = cinematic
*/

const ZOOM = 1.00;

/*
    Higher = follows scrolling faster
    Lower = more cinematic

    Recommended:
    0.10 - very cinematic
    0.14 - smooth
    0.18 - responsive
*/

const SMOOTHING = 0.14;


/*
    Controls how much the scroll
    is eased before reaching the frames.

    0.08 = very smooth
    0.12 = balanced
    0.18 = responsive
*/

const SCROLL_EASE = 0.12;


/* =========================================================
   VARIABLES
   ========================================================= */

const images = new Array(TOTAL_FRAMES);

let loadedFrames = 0;

let targetFrame = 0;
let currentFrame = 0;

let lastRenderedFrame = -1;

let canvasWidth = 0;
let canvasHeight = 0;

let animationStarted = false;

let scrollTicking = false;


/* =========================================================
   CANVAS SETUP
   ========================================================= */

function resizeCanvas() {

    const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth =
        window.innerWidth;

    canvasHeight =
        window.innerHeight;

    canvas.width =
        Math.round(canvasWidth * dpr);

    canvas.height =
        Math.round(canvasHeight * dpr);

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    /*
        Force current frame after resize
    */

    lastRenderedFrame = -1;

    renderFrame(
        Math.round(currentFrame),
        true
    );
}

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   LOAD FRAMES
   ========================================================= */

async function loadImages() {

    const promises = [];

    for (
        let i = 0;
        i < TOTAL_FRAMES;
        i++
    ) {

        const frameNumber =
            String(i + 1).padStart(4, "0");

        const img =
            new Image();

        img.decoding = "async";

        img.src =
            `${FRAME_PATH}${frameNumber}.png`;

        const promise =
            new Promise(resolve => {

                img.onload = async () => {

                    /*
                        Decode image before using it.
                        This reduces frame stutter.
                    */

                    try {

                        if (img.decode) {
                            await img.decode();
                        }

                    } catch (error) {
                        // Image already usable
                    }

                    images[i] = img;

                    loadedFrames++;

                    updateLoadingProgress();

                    resolve();
                };


                img.onerror = () => {

                    console.warn(
                        `Failed to load frame ${frameNumber}`
                    );

                    images[i] = null;

                    resolve();
                };
            });

        promises.push(promise);
    }

    await Promise.all(promises);
}


/* =========================================================
   LOADING PROGRESS
   ========================================================= */

function updateLoadingProgress() {

    const progress =
        Math.round(
            (loadedFrames / TOTAL_FRAMES) * 100
        );


    const loaderPercent =
        document.getElementById(
            "loaderPercent"
        );

    if (loaderPercent) {
        loaderPercent.textContent =
            `${progress}%`;
    }


    const loader =
        document.getElementById("loader");

    if (loader) {

        loader.style.setProperty(
            "--progress",
            `${progress}%`
        );
    }
}


/* =========================================================
   GET FRAME
   ========================================================= */

function getFrame(index) {

    index =
        Math.max(
            0,
            Math.min(
                TOTAL_FRAMES - 1,
                index
            )
        );


    if (images[index]) {
        return images[index];
    }


    /*
        Search nearby if frame missing
    */

    for (
        let distance = 1;
        distance < TOTAL_FRAMES;
        distance++
    ) {

        const before =
            index - distance;

        const after =
            index + distance;


        if (
            before >= 0 &&
            images[before]
        ) {
            return images[before];
        }


        if (
            after < TOTAL_FRAMES &&
            images[after]
        ) {
            return images[after];
        }
    }


    return null;
}


/* =========================================================
   RENDER FRAME
   ========================================================= */

function renderFrame(
    index,
    force = false
) {

    index =
        Math.round(index);


    index =
        Math.max(
            0,
            Math.min(
                TOTAL_FRAMES - 1,
                index
            )
        );


    /*
        Don't redraw same frame
    */

    if (
        index === lastRenderedFrame &&
        !force
    ) {
        return;
    }


    const img =
        getFrame(index);


    if (!img) {
        return;
    }


    const iw =
        img.naturalWidth;

    const ih =
        img.naturalHeight;


    if (!iw || !ih) {
        return;
    }


    /*
        COVER
    */

    const scale =
        Math.max(
            canvasWidth / iw,
            canvasHeight / ih
        );


    /*
        CINEMATIC ZOOM
    */

    const width =
        iw *
        scale *
        ZOOM;

    const height =
        ih *
        scale *
        ZOOM;


    /*
        CENTER
    */

    const x =
        (canvasWidth - width) / 2;

    const y =
        (canvasHeight - height) / 2;


    /*
        DRAW
    */

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    ctx.drawImage(
        img,
        x,
        y,
        width,
        height
    );


    lastRenderedFrame =
        index;
}


/* =========================================================
   SCROLL POSITION
   ========================================================= */

function getScrollProgress() {

    const section =
        document.querySelector(
            ".scroll-section"
        );


    if (!section) {
        return 0;
    }


    const rect =
        section.getBoundingClientRect();


    const scrollDistance =
        section.offsetHeight -
        window.innerHeight;


    if (scrollDistance <= 0) {
        return 0;
    }


    const scrollTop =
        Math.max(
            0,
            -rect.top
        );


    let progress =
        scrollTop /
        scrollDistance;


    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    return progress;
}


/* =========================================================
   SMOOTH SCROLL TARGET
   ========================================================= */

function calculateScroll() {

    const progress =
        getScrollProgress();


    /*
        Ease the scroll position.

        This makes the frame transition
        feel less mechanical.
    */

    const easedProgress =
        progress * progress *
        (3 - 2 * progress);


    targetFrame =
        easedProgress *
        (TOTAL_FRAMES - 1);
}


/* =========================================================
   SCROLL EVENT
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!scrollTicking) {

            requestAnimationFrame(() => {

                calculateScroll();

                updateActiveNavigation();

                scrollTicking = false;
            });

            scrollTicking = true;
        }

    },
    {
        passive: true
    }
);


/* =========================================================
   ULTRA SMOOTH FRAME LOOP
   ========================================================= */

function animationLoop() {

    /*
        Difference between desired
        frame and current frame
    */

    const difference =
        targetFrame -
        currentFrame;


    /*
        Smooth interpolation
    */

    currentFrame +=
        difference *
        SMOOTHING;


    /*
        Prevent tiny floating-point movement
    */

    if (
        Math.abs(difference) <
        0.001
    ) {

        currentFrame =
            targetFrame;
    }


    /*
        Render closest frame
    */

    const frame =
        Math.round(
            currentFrame
        );


    renderFrame(frame);


    requestAnimationFrame(
        animationLoop
    );
}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    const scrollPosition =
        window.scrollY +
        window.innerHeight *
        0.35;


    let currentSection =
        "home";


    sections.forEach(section => {

        const top =
            section.offsetTop;

        const bottom =
            top +
            section.offsetHeight;


        if (
            scrollPosition >= top &&
            scrollPosition < bottom
        ) {

            currentSection =
                section.id;
        }
    });


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        link.classList.toggle(
            "active",
            href ===
            `#${currentSection}`
        );
    });
}


/* =========================================================
   NAVIGATION
   ========================================================= */

document
    .querySelectorAll(
        ".nav-link, .logo, .connect"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    !href.startsWith("#")
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });


    /* =========================================================
   UDIT DIGITAL — CREDENTIAL WHEEL
========================================================= */

(function () {

    const wheel =
        document.getElementById("udDegreeWheel");

    const prev =
        document.getElementById("udWheelPrev");

    const next =
        document.getElementById("udWheelNext");

    if (!wheel) return;

    const cards =
        wheel.querySelectorAll(".ud-degree-card");

    const total = cards.length;

    let rotation = 0;

    const angle = 360 / total;

    function updateWheel() {

        cards.forEach((card, index) => {

            const cardRotation =
                index * angle + rotation;

            card.style.transform = `
                rotateY(${cardRotation}deg)
                translateZ(330px)
            `;

        });

        wheel.style.transform = `
            rotateY(${rotation}deg)
        `;

    }

    function rotate(direction) {

        rotation += direction * angle;

        UDSound?.whoosh?.();

        updateWheel();

    }

    prev?.addEventListener("click", () => {
        rotate(-1);
    });

    next?.addEventListener("click", () => {
        rotate(1);
    });


    /* MOUSE WHEEL */

    let wheelLocked = false;

    document
        .getElementById("credentials")
        ?.addEventListener("wheel", event => {

            if (Math.abs(event.deltaY) < 10)
                return;

            if (wheelLocked)
                return;

            wheelLocked = true;

            rotate(
                event.deltaY > 0 ? 1 : -1
            );

            setTimeout(() => {
                wheelLocked = false;
            }, 550);

        }, { passive: true });


    /* TOUCH */

    let touchStart = 0;

    wheel.addEventListener(
        "touchstart",
        event => {
            touchStart =
                event.touches[0].clientX;
        },
        { passive: true }
    );

    wheel.addEventListener(
        "touchend",
        event => {

            const touchEnd =
                event.changedTouches[0].clientX;

            const difference =
                touchEnd - touchStart;

            if (Math.abs(difference) < 40)
                return;

            rotate(
                difference < 0 ? 1 : -1
            );

        },
        { passive: true }
    );


    updateWheel();

})();
/* =========================================================
   CANVAS DRAG
   ========================================================= */

canvas.addEventListener(
    "dragstart",
    event => {
        event.preventDefault();
    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

async function init() {

    console.log(
        "Starting cinematic frame animation..."
    );


    /*
        Setup canvas
    */

    resizeCanvas();


    /*
        Initial scroll
    */

    calculateScroll();


    /*
        Load all 240 frames
    */

    await loadImages();


    console.log(
        `Frames loaded: ${loadedFrames}/${TOTAL_FRAMES}`
    );


    /*
        Calculate again after loading
    */

    calculateScroll();


    currentFrame =
        targetFrame;


    /*
        Render initial frame
    */

    renderFrame(
        Math.round(currentFrame),
        true
    );


    /*
        Start animation
    */

    if (!animationStarted) {

        animationStarted = true;

        requestAnimationFrame(
            animationLoop
        );
    }


    updateActiveNavigation();


    console.log(
        "✓ Ultra smooth animation ready"
    );
}
/* =========================================
   PROJECT SHOWCASE
========================================= */

const projectSlides =
    document.querySelectorAll(".project-slide");

const projectButtons =
    document.querySelectorAll(".project-nav");

const projectCurrent =
    document.getElementById("projectCurrent");

let currentProject = 0;

function showProject(index) {

    if (index < 0)
        index = projectSlides.length - 1;

    if (index >= projectSlides.length)
        index = 0;

    currentProject = index;


    projectSlides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === index
        );

    });


    projectButtons.forEach((button, i) => {

        button.classList.toggle(
            "active",
            i === index
        );

    });


    projectCurrent.textContent =
        String(index + 1).padStart(2, "0");
}


/* CLICK NAVIGATION */

projectButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const index =
            Number(button.dataset.project);

        showProject(index);

    });

});

const udDegrees = [
    {
        number: "01",
        type: "DEGREE",
        title: "BCA",
        description: "Bachelor of Computer Applications",
        detail: "COMPUTER APPLICATIONS",
        year: "2023 — 2026",
        pdf: "certificates/BCA-Degree.pdf"
    },

    {
        number: "02",
        type: "EDUCATION",
        title: "CLASS XII",
        description: "Senior Secondary Education",
        detail: "HIGHER SECONDARY",
        year: "2023",
        pdf: "certificates/12th-Marksheet.pdf"
    },

    {
        number: "03",
        type: "EDUCATION",
        title: "CLASS X",
        description: "Secondary Education",
        detail: "SECONDARY EDUCATION",
        year: "2021",
        pdf: "certificates/10th-Marksheet.pdf"
    }
];

/* =========================================
   WHEEL PROJECT NAVIGATION
========================================= */

let projectWheelLock = false;

document
    .querySelector(".projects-section")
    ?.addEventListener(
        "wheel",
        (event) => {

            if (projectWheelLock)
                return;

            if (
                Math.abs(event.deltaY) < 20
            )
                return;

            projectWheelLock = true;


            if (event.deltaY > 0) {

                showProject(
                    currentProject + 1
                );

            } else {

                showProject(
                    currentProject - 1
                );

            }


            setTimeout(() => {

                projectWheelLock = false;

            }, 800);

        },
        {
            passive: true
        }
    );
/* =========================================================
   UDIT PORTFOLIO — ISOLATED SKILLS SYSTEM
   This JS only works inside #skills
========================================================= */

const udSkillData = {

    web: {
        number: "01",
        category: "WEB DEVELOPMENT",

        tags: [
            "HTML5",
            "CSS3",
            "JAVASCRIPT",
            "RESPONSIVE DESIGN",
            "UI/UX",
            "WEB APPS"
        ],

        description:
            "Building modern, responsive and interactive digital experiences with a strong focus on visual design and usability."
    },


    programming: {
        number: "02",
        category: "PROGRAMMING",

        tags: [
            "C",
            "C++",
            "JAVA",
            "PYTHON",
            "OOP",
            "DATA STRUCTURES"
        ],

        description:
            "Strong programming fundamentals with experience across multiple languages and problem-solving approaches."
    },


    backend: {
        number: "03",
        category: "BACKEND & DATABASE",

        tags: [
            "DATABASE",
            "API",
            "BACKEND",
            "DATA MANAGEMENT",
            "SYSTEM DESIGN"
        ],

        description:
            "Designing structured systems, connecting databases and building the logic behind modern web applications."
    },


    ai: {
        number: "04",
        category: "AI & DATA",

        tags: [
            "ARTIFICIAL INTELLIGENCE",
            "NLP",
            "MACHINE LEARNING",
            "DATA ANALYSIS"
        ],

        description:
            "Exploring intelligent systems and data-driven applications that combine automation with modern web technology."
    },


    iot: {
        number: "05",
        category: "IoT & ROBOTICS",

        tags: [
            "ARDUINO",
            "RFID",
            "SENSORS",
            "ROBOTICS",
            "IoT",
            "AUTOMATION"
        ],

        description:
            "Connecting software with physical systems through sensors, microcontrollers, automation and robotics."
    }

};


/* =========================================================
   GET SKILLS SECTION
========================================================= */

const udSkillsSection =
    document.querySelector("#skills.ud-skills");


/* =========================================================
   GET SKILL BUTTONS
========================================================= */

const udSkillButtons =
    udSkillsSection
        ? udSkillsSection.querySelectorAll(".ud-skill-card")
        : [];


/* =========================================================
   GET DETAIL ELEMENTS
========================================================= */

const udDetailNumber =
    document.getElementById("udDetailNumber");

const udDetailCategory =
    document.getElementById("udDetailCategory");

const udSkillTags =
    document.getElementById("udSkillTags");

const udDetailDescription =
    document.getElementById("udDetailDescription");


/* =========================================================
   UPDATE SKILL
========================================================= */

function udUpdateSkill(skill) {

    const data = udSkillData[skill];

    if (!data) return;


    /* -----------------------------------------
       ACTIVE BUTTON
    ----------------------------------------- */

    udSkillButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.skill === skill
        );

    });


    /* -----------------------------------------
       NUMBER
    ----------------------------------------- */

    if (udDetailNumber) {

        udDetailNumber.textContent =
            data.number;

    }


    /* -----------------------------------------
       CATEGORY
    ----------------------------------------- */

    if (udDetailCategory) {

        udDetailCategory.textContent =
            data.category;

    }


    /* -----------------------------------------
       TAGS
    ----------------------------------------- */

    if (udSkillTags) {

        udSkillTags.innerHTML = "";

        data.tags.forEach(tag => {

            const element =
                document.createElement("span");

            element.textContent = tag;

            udSkillTags.appendChild(element);

        });

    }


    /* -----------------------------------------
       DESCRIPTION
    ----------------------------------------- */

    if (udDetailDescription) {

        udDetailDescription.textContent =
            data.description;

    }

}


/* =========================================================
   CLICK EVENTS
========================================================= */

udSkillButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const skill =
                button.dataset.skill;

            udUpdateSkill(skill);

        }
    );

});


/* =========================================================
   MOUSE FOLLOW EFFECT
========================================================= */

const udSkillsCore =
    udSkillsSection
        ? udSkillsSection.querySelector(".ud-skills-core")
        : null;


if (udSkillsSection && udSkillsCore) {

    udSkillsSection.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                udSkillsSection.getBoundingClientRect();


            const x =
                ((event.clientX - rect.left) /
                    rect.width) - 0.5;


            const y =
                ((event.clientY - rect.top) /
                    rect.height) - 0.5;


            udSkillsCore.style.transform = `
                translate(
                    ${x * 15}px,
                    ${y * 15}px
                )
            `;

        }
    );


    /* -----------------------------------------
       RESET ON MOUSE LEAVE
    ----------------------------------------- */

    udSkillsSection.addEventListener(
        "mouseleave",
        () => {

            udSkillsCore.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =========================================================
   DEFAULT SKILL
========================================================= */

udUpdateSkill("web");


showProject(0);


/* =========================================================
   START
   ========================================================= */

init();

