const container = document.getElementById("game");
const tiles = [];

const keys = {};
document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

let player = null;
let endTile = null;

let velocityY = 0;
let velocityX = 0;

let onGround = false;

function createRect(x, y, width, height, color) {
    const rect = document.createElement("div");
    rect.style.position = "absolute";
    rect.style.left = `${x}px`;
    rect.style.top = `${y}px`;
    rect.style.width = `${width}px`;
    rect.style.height = `${height}px`;
    rect.style.backgroundColor = color;

    container.appendChild(rect);
    const obj = {
        x,
        y,
        width,
        height,
        element: rect
    };

    tiles.push(obj);
    return obj;
}

function updateRect(obj) {
    obj.element.style.left = obj.x + "px";
    obj.element.style.top = obj.y + "px";
}

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function clearLevel() {
    container.innerHTML = "";
    tiles.length = 0;
    player = null;
    endTile = null;
    velocityX = 0;
    velocityY = 0;

    for (let key in keys) {
        keys[key] = false;
    }
}

function startLevel(level) {
    clearLevel();

    if (level === "test") {
        createRect(15, 15, 15, 350, "black");
        createRect(365, 15, 15, 350, "black");
        createRect(15, 15, 359, 15, "black");
        createRect(15, 350, 359, 15, "black");
        createRect(150, 300, 50, 15, "black");
        createRect(250, 250, 50, 15, "black");
        createRect(150, 200, 50, 15, "black");

        endTile = createRect(300, 200, 20, 20, "blue");
        player = createRect(50, 50, 20, 20, "red");
    }
    
    loop();
}

function generalCollision(tile) {
    if (tile === endTile) {
        clearLevel();
        openMenu();
        alert("You win");
        return true;
    }
    return false;
}

function loop() {
    if (!player) return;

    velocityX -= velocityX/4;
    if (keys["ArrowRight"] || keys["d"]) velocityX += 1;
    if (keys["ArrowLeft"] || keys["a"]) velocityX -= 1;

    velocityY += 0.3;

    player.x += velocityX;

    // horizontal collision
    for (let tile of tiles) {
        if (tile === player) continue;

        if (isColliding(player, tile)) {
            if (generalCollision(tile)) return;
            if (velocityX > 0) {
                player.x = tile.x - player.width;
            }
            else if (velocityX < 0) {
                player.x = tile.x + tile.width;
            }
        }
    }

    player.y += velocityY;

    onGround = false;

    // vertical collision
    for (let tile of tiles) {
        if (tile === player) continue;

        if (isColliding(player, tile)) {
            if (generalCollision(tile)) return;
            if (velocityY > 0) {
                player.y = tile.y - player.height;
                velocityY = -velocityY/4;
                onGround = true;
            }
            else if (velocityY < 0) {
                player.y = tile.y + tile.height;
                velocityY = 0;
            }
        }
    }

    if ((keys["ArrowUp"] || keys["w"] || keys[" "]) && onGround) {
        velocityY = -6;
    }

    updateRect(player);
    requestAnimationFrame(loop);
}