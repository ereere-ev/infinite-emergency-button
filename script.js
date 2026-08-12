let pressStart;
let isLongPress = false;
let pressCount = 0;
let blinkTimer = null;
let isPressing = false;   // ← スマホの誤キャンセル対策

const pictureBox1 = document.getElementById("pictureBox1");
const labelCount = document.getElementById("labelCount");
const sound = document.getElementById("sound");

// 点滅（赤）
function BlinkTimer_Tick() {
    pictureBox1.style.filter =
        pictureBox1.style.filter ? "" : "drop-shadow(0 0 20px red)";
}

// 押した瞬間
function handlePressStart() {
    isPressing = true;   // ← スマホ対策
    pressStart = Date.now();
    isLongPress = false;

    sound.currentTime = 0;
    sound.play();
    sound.loop = true;

    blinkTimer = setInterval(BlinkTimer_Tick, 300);
}

// 離した瞬間
function handlePressEnd() {
    if (!isPressing) return;  // ← スマホの誤キャンセルを無視

    isPressing = false;

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

// pointerdown
pictureBox1.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    handlePressStart();
});

// pointerup
pictureBox1.addEventListener("pointerup", (e) => {
    e.preventDefault();
    handlePressEnd();
});

// pointercancel（スマホで誤発火するので無視）
pictureBox1.addEventListener("pointercancel", (e) => {
    e.preventDefault();
    // handlePressEnd(); ← 呼ばない！
});

// touchend（iPhone Safari）
pictureBox1.addEventListener("touchend", (e) => {
    e.preventDefault();
    handlePressEnd();
});

// touchcancel（スマホで誤発火するので無視）
pictureBox1.addEventListener("touchcancel", (e) => {
    e.preventDefault();
    // handlePressEnd(); ← 呼ばない！
});

// スマホの画像長押しメニューを完全無効化
pictureBox1.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
