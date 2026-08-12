let pressStart;
let isLongPress = false;
let pressCount = 0;
let blinkTimer = null;

const pictureBox1 = document.getElementById("pictureBox1");
const labelCount = document.getElementById("labelCount");
const sound = document.getElementById("sound");

// 点滅（赤）
function BlinkTimer_Tick() {
    pictureBox1.style.filter =
        pictureBox1.style.filter ? "" : "drop-shadow(0 0 20px red)";
}

// 押した瞬間（Windows版の MouseDown と同じ）
function handlePressStart() {
    pressStart = Date.now();
    isLongPress = false;

    sound.currentTime = 0;
    sound.play();
    sound.loop = true;

    blinkTimer = setInterval(BlinkTimer_Tick, 300);
}

// 離した瞬間（Windows版の MouseUp と同じ）
function handlePressEnd() {
    const duration = Date.now() - pressStart;

    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;

    clearInterval(blinkTimer);
    pictureBox1.style.filter = "";

    if (duration >= 500) {
        isLongPress = true;
        pressCount++;
        labelCount.innerText = `押した回数：${pressCount}`;
    } else {
        pressCount++;
        labelCount.innerText = `押した回数：${pressCount}`;
    }
}

/* PC・Android・iPhone 全対応 */

// pointerdown（押した瞬間）
pictureBox1.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    handlePressStart();
});

// pointerup（離した瞬間）
pictureBox1.addEventListener("pointerup", (e) => {
    e.preventDefault();
    handlePressEnd();
});

// pointercancel（スライド離し・画面外）
pictureBox1.addEventListener("pointercancel", (e) => {
    e.preventDefault();
    handlePressEnd();
});

// iPhone Safari の補強（touchend / touchcancel）
pictureBox1.addEventListener("touchend", (e) => {
    e.preventDefault();
    handlePressEnd();
});

pictureBox1.addEventListener("touchcancel", (e) => {
    e.preventDefault();
    handlePressEnd();
});
