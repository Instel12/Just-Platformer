
function openMenu() {
    clearLevel();
    container.innerHTML = `
    <center>
        <h1>Just Platformer</h1>
        <div style="color:gray; margin-top:-20px;">This is just the engine, the actual levels will come later.</div>
        <div style="margin-top:30px;">
            <p><button onclick='startLevel("test")'>Test Level</button></p>
            <!-- <p style="margin-top:-10px;"><button onclick='startLevel("test")'>Level 1</button></p>
            <p style="margin-top:-10px;"><button onclick='startLevel("test")'>Level 2</button></p>
            <p style="margin-top:-10px;"><button onclick='startLevel("test")'>Level 3</button></p>
            <p style="margin-top:-10px;"><button onclick='startLevel("test")'>Level 4</button></p>
            <p style="margin-top:-10px;"><button onclick='startLevel("test")'>Level 5</button></p> -->
        </div>
    </center>
    `;
}