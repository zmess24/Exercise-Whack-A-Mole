// Check to make sure JS is loaded.
console.log("JS loaded");

/**
|--------------------------------------------------
| Pseudocode
|--------------------------------------------------
*/

// 1. Timer should start at 30 seconds.
// 2. One the timer is clicked, the time should decrement every second and disaply on the page.
// 3. The mole should appear in a random hole every .5 seconds.
// 4. If the user picked the right hole, the users score should increment plus 1.
// 5. When the timer reaches zero, an alert should appear on the screen with the users score.
// 6. The games global state variables should be reset.

/**
|--------------------------------------------------
| Tecnologies students will need...
|--------------------------------------------------
*/

// 1. setTimeout vs setInterval functions.
// 2. JS event listeners for 'click' & 'DOMContentLoaded'. 
// 3. Using 'Math' to generate a random number.
// 4. OPTIONAL: String Literals.
// 5. We probably will want to find a way prevent a user from the breaking the game by clicking on the start button multiple times.

/**
|--------------------------------------------------
| Whack-A-Mole Game
|--------------------------------------------------
*/

// Event listener to fire game once the DOM is loaded.
document.addEventListener("DOMContentLoaded", function() {

    // Global Variables
    const holes = document.getElementsByClassName('hole');
    const button = document.getElementById('start-button');
    const timer = document.getElementById('timer');
    const score = document.getElementById('score');
    const mole = document.getElementById('mole');
    let time = 30;
    let scoreCount = 0;
    
    // Functions
    function pickRandomHole() {
        let randomHole = holes[Math.floor(Math.random() * holes.length)];
        randomHole.append(mole);
    };

    function incrementScore() {
        scoreCount++;
        score.innerHTML = `${scoreCount} points`;
    }

    function startGame () {

        // Disable the button;
        button.setAttribute('disabled', true);

        // Show the mole;
        mole.style.display = "initial";

        // Pick a random hole for the mole to appear in every .5 seconds.
        const moleTimer = setInterval(pickRandomHole, 700)

        const countDown = setInterval(function () {
            if (time > 0) {
                // If the time is greater than 0, decrease by one and display the time remaining.
                time--;
                timer.innerHTML = `${time} seconds`;
            } else {
                // If the time is less than 0, clear the timer and change timer text to 'Game Over'
                clearInterval(countDown);
                clearInterval(moleTimer);

                alert(`Game Over! Your score was ${score.innerHTML}`)

                // Reset Game Variables
                timer.innerText = `Ready`;
                mole.style.display = "none";
                button.removeAttribute('disabled');
                time = 30;
                scoreCount = 0;
                timer.innerText = "Ready";
                score.innerText = `${scoreCount} points`;
            }
        }, 1000);
    }

    // Add 'click' event listener for the mole.
    mole.addEventListener("click", incrementScore);
    button.addEventListener('click', startGame);

});