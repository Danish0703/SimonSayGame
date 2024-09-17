document.addEventListener("DOMContentLoaded", function() {
    let h2 = document.querySelector("h2");
    let score = document.querySelector("#score");
    let resetButton = document.querySelector("#reset");

    let gameSeq = [];
    let userSeq = [];
    let btns = ["green", "red", "yellow", "purple"]; // Updated to include 'purple'

    let started = false;
    let level = 0;

    document.addEventListener("keypress", function() {
        if (!started) {
            console.log("Game started");
            started = true;
            userSeq = [];
            level = 0;
            gameSeq = [];
            levelup();
        }
    });

    // Flash effect for the game sequence
    function gameFlash(btn) {
        btn.classList.add("flash");
        setTimeout(function() {
            btn.classList.remove("flash");
        }, 250);
    }

    // Flash effect for user input
    function userFlash(btn) {
        btn.classList.add("flash");
        setTimeout(function() {
            btn.classList.remove("flash");
        }, 250);
    }

    // Level up function to move to the next sequence
    function levelup() {
        userSeq = [];
        level++;
        h2.innerText = `Level ${level}`;
        score.innerText = `Score: ${level - 1}`; // Update score
        
        // Random button selection for game sequence
        let randIdx = Math.floor(Math.random() * 4);
        let randColor = btns[randIdx];
        let btn = document.querySelector(`.${randColor}`);

        gameSeq.push(randColor);
        console.log("Game sequence:", gameSeq);
        
        // Flash each button in the sequence
        setTimeout(() => gameFlash(btn), 500);
    }

    // Check user's answer to see if it matches the game sequence
    function checkAns(idx) {
        if (!started) {
            return;
        }
        
        if (userSeq[idx] === gameSeq[idx]) {
            if (userSeq.length === gameSeq.length) {
                setTimeout(() => levelup(), 1000); // Move to the next level after a delay
            }
        } else {
            // Display game over message
            h2.innerText = "Game Over! Press any key to restart"; 
            console.log("Game Over: Sequences do not match!");
            
            // Delay the reset so the game over message is visible for 2 seconds
            setTimeout(() => resetGame(), 2000);
        }
    }

    // Handle user button press
    function btnPress() {
        let btn = this;
        userFlash(btn);

        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);

        console.log("User sequence:", userSeq);
        checkAns(userSeq.length - 1);
    }

    // Add click event listeners for each button
    let allbtns = document.querySelectorAll(".btn");
    for (let btn of allbtns) {
        btn.addEventListener("click", btnPress);
    }

    // Reset the game
    function resetGame() {
        gameSeq = [];
        userSeq = [];
        started = false;
        level = 0;
        h2.innerText = "Press any key to start"; // Reset message after delay
        score.innerText = "Score: 0"; // Reset score
    }

    // Add reset button functionality if the resetButton variable is defined
    if (resetButton) {
        resetButton.addEventListener("click", resetGame);
    }
});