/* =========================
   ELEMENTS
========================= */

const screen1 =
    document.getElementById("screen1");

const screen2 =
    document.getElementById("screen2");

const screen3 =
    document.getElementById("screen3");

const screen4 =
    document.getElementById("screen4");

const screen5 =
    document.getElementById("screen5");

const screen6 =
    document.getElementById("screen6");


const nameInput =
    document.getElementById("nameInput");

const continueButton =
    document.getElementById("continueButton");

const screen2Button =
    document.getElementById("screen2Button");

const screen3Button =
    document.getElementById("screen3Button");

const screen4Button =
    document.getElementById("screen4Button");

const screen5Button =
    document.getElementById("screen5Button");


const welcomeText =
    document.getElementById("welcomeText");

const finalName =
    document.getElementById("finalName");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const appearSound =
    document.getElementById("appearSound");

const currentDate =
    document.getElementById("currentDate");


/* =========================
   CONTROL FLAGS
========================= */

let fireworksStarted = false;

let confettiStarted = false;


/* =========================
   USER NAME
========================= */

let userName = "";


/* =========================
   CURRENT DATE
========================= */

if (currentDate) {

    const today =
        new Date();

    currentDate.textContent =
        today.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );
}


/* =========================
   REVEAL SCREEN CONTENT
========================= */

function revealScreen(screen) {

    if (!screen) return;

    const items =
        screen.querySelectorAll(
            ".reveal-item"
        );

    items.forEach(

        function (item) {

            item.classList.remove(
                "show"
            );

        }

    );

    items.forEach(

        function (item) {

            const delay =
                Number(
                    item.dataset.delay
                );

            setTimeout(

                function () {

                    item.classList.add(
                        "show"
                    );

                    if (appearSound) {

                        appearSound.currentTime =
                            0;

                        appearSound.play()
                            .catch(
                                function () {}
                            );
                    }

                },

                delay

            );

        }

    );

}


/* =========================
   SCREEN TRANSITION
========================= */

function goToScreen(

    currentScreen,
    nextScreen

) {

    if (!currentScreen) return;

    if (!nextScreen) return;


    currentScreen.classList.add(
        "screen-exit"
    );


    setTimeout(

        function () {

            currentScreen.classList.remove(
                "active"
            );

            currentScreen.classList.remove(
                "screen-exit"
            );


            nextScreen.classList.add(
                "active"
            );

            nextScreen.classList.add(
                "screen-enter"
            );


            revealScreen(
                nextScreen
            );


            setTimeout(

                function () {

                    nextScreen.classList.remove(
                        "screen-enter"
                    );

                },

                1000

            );


            if (
                nextScreen === screen6
            ) {

                startFinalReveal();

            }

        },

        750

    );

}


/* =========================
   SCREEN 1 START
========================= */

revealScreen(
    screen1
);


/* =========================
   SCREEN 1 → SCREEN 2
========================= */

if (continueButton) {

    continueButton.addEventListener(

        "click",

        function () {

            const name =
                nameInput.value.trim();


            if (name === "") {

                nameInput.focus();

                nameInput.placeholder =
                    "Please enter your name";

                return;

            }


            /* SAVE USER NAME */

            userName =
                name;


            welcomeText.textContent =
                "SO, " + name;


            finalName.textContent =
                name;


            goToScreen(
                screen1,
                screen2
            );


            if (

                backgroundMusic &&

                backgroundMusic.paused

            ) {

                backgroundMusic.volume =
                    0.25;


                backgroundMusic.play()
                    .catch(
                        function () {}
                    );

            }

        }

    );

}


/* =========================
   SCREEN 2 → SCREEN 3
========================= */

if (screen2Button) {

    screen2Button.addEventListener(

        "click",

        function () {

            goToScreen(
                screen2,
                screen3
            );

        }

    );

}


/* =========================
   SCREEN 3 → SCREEN 4
========================= */

if (screen3Button) {

    screen3Button.addEventListener(

        "click",

        function () {

            goToScreen(
                screen3,
                screen4
            );

        }

    );

}


/* =========================
   SCREEN 4 → SCREEN 5
========================= */

if (screen4Button) {

    screen4Button.addEventListener(

        "click",

        function () {

            goToScreen(
                screen4,
                screen5
            );

        }

    );

}


/* =========================
   SCREEN 5 → SCREEN 6
========================= */

if (screen5Button) {

    screen5Button.addEventListener(

        "click",

        function () {

            goToScreen(
                screen5,
                screen6
            );

        }

    );

}


/* =====================================================
   FINAL REVEAL
===================================================== */

function startFinalReveal() {

    const mysteryPhase =
        document.getElementById(
            "mysteryPhase"
        );


    const celebrationPhase =
        document.getElementById(
            "celebrationPhase"
        );


    if (!screen6) return;


    if (mysteryPhase) {

        mysteryPhase.classList.add(
            "active"
        );

    }


    setTimeout(

        function () {

            if (celebrationPhase) {

                screen6.classList.add(
                    "celebrate"
                );


                /*
                   START FIREWORKS
                   AND CONFETTI
                */

                setTimeout(

                    function () {

                        startFireworks();

                        startConfetti();

                    },

                    300

                );


                /*
                   SHOW ABOUT BUTTON
                */

                setTimeout(

                    function () {

                        const aboutBtn =
                            document.getElementById(
                                "aboutBtn"
                            );


                        if (aboutBtn) {

                            aboutBtn.classList.add(
                                "show"
                            );

                        }

                    },

                    8300

                );

            }

        },

        15000

    );

}


/* =====================================================
   REALISTIC ROCKET FIREWORKS
===================================================== */

function startFireworks() {


    if (fireworksStarted) return;

    fireworksStarted = true;


    const container =
        document.querySelector(
            ".fireworks-container"
        );


    if (!container) return;


    const colors = [

        "#ff3b3b",
        "#ffd93d",
        "#00e5ff",
        "#ff4ecd",
        "#7cff00",
        "#a66cff",
        "#ff8c42"

    ];


    function createFirework() {


        const rocket =
            document.createElement(
                "div"
            );


        rocket.className =
            "firework-rocket";


        const color =
            colors[
                Math.floor(
                    Math.random()
                    *
                    colors.length
                )
            ];


        const startX =
            Math.random()
            *
            100;


        const startY =
            105;


        const endX =
            Math.random()
            *
            90
            +
            5;


        const endY =
            Math.random()
            *
            45
            +
            8;


        rocket.style.left =
            startX + "%";


        rocket.style.top =
            startY + "%";


        rocket.style.setProperty(

            "--rocket-color",

            color

        );


        container.appendChild(
            rocket
        );


        const moveX =
            (
                endX
                -
                startX
            )
            *
            window.innerWidth
            /
            100;


        const moveY =
            (
                endY
                -
                startY
            )
            *
            window.innerHeight
            /
            100;


        const rocketAnimation =
            rocket.animate(

                [

                    {

                        transform:
                            "translate(-50%, 0)"

                    },

                    {

                        transform:

                            `translate(

                                ${moveX}px,

                                ${moveY}px

                            )`

                    }

                ],

                {

                    duration:

                        700
                        +
                        Math.random()
                        *
                        500,

                    easing:

                        "cubic-bezier(.2,.8,.3,1)",

                    fill:

                        "forwards"

                }

            );


        rocketAnimation.finished.then(

            function () {


                const explosion =
                    document.createElement(
                        "div"
                    );


                explosion.className =
                    "real-firework";


                explosion.style.left =
                    endX + "%";


                explosion.style.top =
                    endY + "%";


                explosion.style.setProperty(

                    "--firework-color",

                    color

                );


                const sparkCount =
                    55;


                for (

                    let i = 0;

                    i < sparkCount;

                    i++

                ) {


                    const spark =
                        document.createElement(
                            "span"
                        );


                    const angle =

                        (
                            Math.PI
                            *
                            2
                            *
                            i
                        )
                        /
                        sparkCount;


                    const distance =

                        90
                        +
                        Math.random()
                        *
                        170;


                    const x =
                        Math.cos(angle)
                        *
                        distance;


                    const y =
                        Math.sin(angle)
                        *
                        distance;


                    spark.style.setProperty(

                        "--x",

                        x + "px"

                    );


                    spark.style.setProperty(

                        "--y",

                        y + "px"

                    );


                    spark.style.background =
                        color;


                    spark.style.boxShadow =

                        `
                        0 0 8px ${color},
                        0 0 18px ${color}
                        `;


                    explosion.appendChild(
                        spark
                    );

                }


                container.appendChild(
                    explosion
                );


                rocket.remove();


                setTimeout(

                    function () {

                        explosion.remove();

                    },

                    2200

                );

            }

        );

    }


    /*
       INITIAL ROCKETS
    */

    for (

        let i = 0;

        i < 5;

        i++

    ) {

        setTimeout(

            createFirework,

            i * 450

        );

    }


    /*
       CONTINUOUS ROCKETS
    */

    setInterval(

        createFirework,

        200

    );

}


/* =====================================================
   CONTINUOUS CONFETTI
===================================================== */

function startConfetti() {

    if (confettiStarted) return;

    confettiStarted = true;


    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.id =
        "confetti";


    canvas.style.position =
        "fixed";


    canvas.style.left =
        "0";


    canvas.style.top =
        "0";


    canvas.style.width =
        "100%";


    canvas.style.height =
        "100%";


    canvas.style.pointerEvents =
        "none";


    canvas.style.zIndex =
        "9999";


    document.body.appendChild(
        canvas
    );


    const ctx = canvas.getContext("2d", {
    alpha: true,
    desynchronized: true
});


    function resize() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resize();


    window.addEventListener(
        "resize",
        resize
    );


    const colors = [

        "#ff595e",
        "#ffca3a",
        "#8ac926",
        "#1982c4",
        "#6a4c93",
        "#ffffff",
        "#ff99c8"

    ];


    const confetti =
        [];


    for (

        let i = 0;

        i < 240;

        i++

    ) {

        confetti.push({

            x:
                Math.random()
                *
                canvas.width,

           y: -(Math.random() * canvas.height),
            w:
                8
                +
                Math.random()
                *
                8,

            h:
                4
                +
                Math.random()
                *
                4,

            speed:
                1
                +
                Math.random()
                *
                2,

            angle:
                Math.random()
                *
                360,

            rotate:
                Math.random()
                *
                4
                +
                2,

            color:
                colors[
                    Math.floor(
                        Math.random()
                        *
                        colors.length
                    )
                ]

        });

    }

let lastTime = 0;


function animate(time = 0) {

    const delta = (time - lastTime) / 16.67;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(function (c) {

        c.y += c.speed * delta;
        c.angle += c.rotate * delta;

        if (c.y > canvas.height + 20) {

            c.y = -20;
            c.x = Math.random() * canvas.width;

        }

        ctx.save();

        ctx.translate(c.x, c.y);

        ctx.rotate(c.angle * Math.PI / 180);

        ctx.fillStyle = c.color;

        ctx.fillRect(
            -c.w / 2,
            -c.h / 2,
            c.w,
            c.h
        );

        ctx.restore();

    });

    requestAnimationFrame(animate);

}
   animate();

}


/* =====================================================
   ABOUT / FEEDBACK POPUP
===================================================== */

window.addEventListener(

    "DOMContentLoaded",

    function () {


        const aboutBtn =
            document.getElementById(
                "aboutBtn"
            );


        const aboutOverlay =
            document.getElementById(
                "aboutOverlay"
            );


        const closeAbout =
            document.getElementById(
                "closeAbout"
            );


        if (

            aboutBtn
            &&
            aboutOverlay
            &&
            closeAbout

        ) {


            aboutBtn.addEventListener(

                "click",

                function () {

                    aboutOverlay.classList.add(
                        "show"
                    );

                }

            );


            closeAbout.addEventListener(

                "click",

                function () {

                    aboutOverlay.classList.remove(
                        "show"
                    );

                }

            );

        }


        /* ===========================
           PREMIUM STAR RATING
        =========================== */

        const stars =
            document.querySelectorAll(
                ".stars span"
            );


        const starsContainer =
            document.querySelector(
                ".stars"
            );


        let selectedRating =
            0;


        function updateStars(
            rating
        ) {


            stars.forEach(

                function (star) {


                    const value =
                        Number(
                            star.dataset.rating
                        );


                    if (

                        value
                        <=
                        rating

                    ) {

                        star.classList.add(
                            "active"
                        );

                    }

                    else {

                        star.classList.remove(
                            "active"
                        );

                    }

                }

            );

        }


        stars.forEach(

            function (star) {


                star.addEventListener(

                    "mouseenter",

                    function () {

                        updateStars(

                            Number(
                                star.dataset.rating
                            )

                        );

                    }

                );


                star.addEventListener(

                    "click",

                    function () {

                        selectedRating =
                            Number(
                                star.dataset.rating
                            );


                        updateStars(
                            selectedRating
                        );

                    }

                );

            }

        );


        if (starsContainer) {

            starsContainer.addEventListener(

                "mouseleave",

                function () {

                    updateStars(
                        selectedRating
                    );

                }

            );

        }

    }

);


/* =========================
   EMAILJS INITIALIZATION
========================= */

if (

    typeof emailjs
    !==
    "undefined"

) {

    emailjs.init({

        publicKey:
            "RsxrowgbVN97v98jA"

    });

}


const sendFeedback =
    document.getElementById(
        "sendFeedback"
    );


if (sendFeedback) {


    sendFeedback.addEventListener(

        "click",

        function () {


            const rating =
                document.querySelectorAll(

                    ".stars span.active"

                ).length;


            const feedback =
                document.querySelector(
                    "textarea"
                )
                .value
                .trim();


            if (

                rating
                ===
                0

            ) {

                alert(
                    "Please select a rating ⭐"
                );


                return;

            }


            if (

                feedback
                ===
                ""

            ) {

                alert(
                    "Please write your feedback 💬"
                );


                return;

            }


            sendFeedback.disabled =
                true;


            sendFeedback.textContent =
                "Sending...";


            const currentDateTime =
                new Date()
                    .toLocaleString(

                        "en-IN",

                        {

                            dateStyle:
                                "full",

                            timeStyle:
                                "short"

                        }

                    );


            const templateParams = {


                /*
                   USER ENTERED NAME
                */

                name:
                    userName,


                rating:
                    rating
                    +
                    " / 5",


                feedback:
                    feedback,


                website:
                    "A Harshil Verse Experience",


                time:
                    currentDateTime

            };


            console.log(
                "SEND BUTTON CLICKED"
            );


            console.log(
                "EmailJS:",
                typeof emailjs
            );


            console.log(
                "Params:",
                templateParams
            );


            emailjs.send(

                "service_psinhnt",

                "template_bfadleu",

                templateParams

            )


            .then(

                function () {


                    alert(
                        "Thank you for your feedback! ✨"
                    );


                    document.querySelector(
                        "textarea"
                    ).value =
                        "";


                    document
                        .querySelectorAll(
                            ".stars span"
                        )
                        .forEach(

                            function (star) {

                                star.classList
                                    .remove(
                                        "active"
                                    );

                            }

                        );


                    sendFeedback.disabled =
                        false;


                    sendFeedback.textContent =
                        "Submit";

                }

            )


            .catch(

                function (error) {


                    console.error(

                        "EmailJS Error:",

                        error

                    );


                    alert(

                        "Something went wrong. Please try again."

                    );


                    sendFeedback.disabled =
                        false;


                    sendFeedback.textContent =
                        "Submit";

                }

            );

        }

    );

}
