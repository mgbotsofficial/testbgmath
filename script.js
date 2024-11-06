let equation = '';

// Append to equation
function appendToEquation(value) {
    // Prevent multiple decimal points in a single number
    if (value === '.' && equation.match(/(\d*\.\d*|\d+)[^\d]*$/)) {
        // If the last part of the equation already has a decimal, don't add another
        const lastNumber = equation.match(/(\d*\.\d*|\d+)$/);
        if (lastNumber && lastNumber[0].includes('.')) return;
    }
    
    equation += value;
    document.getElementById('display').innerText = equation;
}

// Clear equation
function clearEquation() {
    equation = '';
    document.getElementById('display').innerText = 'Equation';
}

// Open modal
function openModal() {
    document.getElementById('modal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('variableInput').value = '';
}

// Insert variable into the equation, ensure no double curly braces
function insertVariable() {
    const variable = document.getElementById('variableInput').value;
    if (variable.startsWith('{') && variable.endsWith('}')) {
        equation += variable;
    } else {
        equation += `{${variable}}`;
    }
    document.getElementById('display').innerText = equation;
    closeModal();
}

// Create and display the solve equation variable
function createSolveEquation() {
    const solveEquationVariable = `{solve_equation[${equation}]}`;
    document.getElementById('popup-content').innerText = solveEquationVariable;
    document.getElementById('popup').style.display = 'block';
    clearEquation(); // Clear equation after generating
}

// Copy variable to clipboard
function copyToClipboard() {
    const content = document.getElementById('popup-content').innerText;
    navigator.clipboard.writeText(content).then(() => {
        alert("Copied to clipboard!");
    });
}

// Close popup
function closePopup(event) {
    event.stopPropagation(); // Prevents the click event from bubbling up to the popup
    document.getElementById("popup").style.display = "none"; // Closes the popup
}
