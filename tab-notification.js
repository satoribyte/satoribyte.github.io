let originalTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Come Back!";
    document.body.style.backgroundColor = "#ffcccb";
    let audio = new Audio('./alert.wav');
    audio.play();
});

window.addEventListener("focus", () => {
    document.title = originalTitle;
    document.body.style.backgroundColor = "#ffffff";
});

setInterval(() => {
    if (document.hidden) {
        document.title = document.title === "Come Back!" ? "👀 Come Back!" : "Come Back!";
    }
}, 1000);