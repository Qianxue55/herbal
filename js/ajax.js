document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser's default method

    // Get form data
    var formData = new FormData(this);

    // Send Ajax request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbwskErut7UbXzg1zSuUHQNXX9mFV7KK1-BsOTeXvytSFjTrgNZIfPMpA_ySP_9yfWQEFQ/exec', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Handle success response
            alert('Message sent successfully!');
            window.location.reload()
            // You can do more here, like clear the form or show a success message
        } else {
            // Handle error response
            alert('Error sending message. Please try again later.');
            window.location.reload()
        }
    };
    xhr.onerror = function() {
        // Handle network errors
        alert('Error sending message. Please check your internet connection and try again.');
        window.location.reload()
    };
    xhr.send(formData);
});