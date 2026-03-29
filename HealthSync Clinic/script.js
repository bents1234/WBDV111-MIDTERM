const credentials = {
    user: "user@example.com",
    pass: "pass123"
};

function login() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if (email === credentials.user && pass === credentials.pass) {
        window.location.href = "book.html";
    } else {
        alert("Access Denied. Please use the example credentials provided.");
    }
}

function showAvailability() {
    document.getElementById('availModal').style.display = 'block';
}

function closeAvailability() {
    document.getElementById('availModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('availModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}