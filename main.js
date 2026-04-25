function resize() {
    const baseWidth = 700;
    const baseHeight = 700;

    const scaleX = window.innerWidth / baseWidth;
    const scaleY = window.innerHeight / baseHeight;

    const scale = Math.min(scaleX, scaleY) * 0.8;

    const game = document.getElementById("game");

    game.style.transform = `scale(${scale})`;
    game.style.transformOrigin = "center center";
}

window.addEventListener("resize", resize);
resize();