function displayText() {
    // Get the value entered in the input field
    var text = document.getElementById('userInput').value;

    // Display the text in the paragraph
    document.getElementById('displayArea').innerText = "You entered: " + text;
}