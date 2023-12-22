function toggleForm(formId) {
    const forms = document.querySelectorAll('.form-section');
    forms.forEach(form => {
        if (form.id === formId) {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
    });
}

async function signup(event) {
    event.preventDefault();

    const email = document.getElementById("s-email").value;
    const firstname = document.getElementById("s-firstname").value;
    const lastname = document.getElementById("s-lastname").value;
    const password = document.getElementById("s-password").value;
    const confirmpassword = document.getElementById("s-confirmpassword").value;

    // Check if password and confirm password match
    if (password !== confirmpassword) {
        alert("Passwords do not match.");
        return;
    }

    // Check if user with the same email already exists
    if (localStorage.getItem(email)) {
        alert("User with this email already exists.");
        return;
    }

    // Store user data in localStorage
    const userData = {
        firstname: firstname,
        lastname: lastname,
        password: password,
    };

    localStorage.setItem(email, JSON.stringify(userData));

    // Clear the registration form
    document.getElementById("s-email").value = "";
    document.getElementById("s-firstname").value = "";
    document.getElementById("s-lastname").value = "";
    document.getElementById("s-password").value = "";
    document.getElementById("s-confirmpassword").value = "";

    // Navigate to login form
    toggleForm('login-section');
}

async function login(event) {
    event.preventDefault();

    const email = document.getElementById("l-email").value;
    const password = document.getElementById("l-password").value;

    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem(email);

    if (!storedUserData) {
        alert("User not found. Please register.");
        return;
    }

    const userData = JSON.parse(storedUserData);

    if (userData.password === password) {
        alert("Login successful!");

        // Store the logged-in user's email
        localStorage.setItem("loggedInUser", email);

        // Navigate to contact creation form
        toggleForm('accountcreate-section');
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

async function createContact(event) {
    event.preventDefault();

    const email = document.getElementById("c-email").value;
    const firstname = document.getElementById("c-firstname").value;
    const lastname = document.getElementById("c-lastname").value;
    const address = document.getElementById("c-address").value;
    const contactno = document.getElementById("c-contactno").value;

    // Check if the user is logged in
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("User not logged in. Please login.");
        return;
    }

    // Check if the logged-in user matches the contact's email
    if (loggedInUser !== email) {
        alert("You can only create contacts for your own account.");
        return;
    }

    // Store contact data in localStorage
    const contactData = {
        firstname: firstname,
        lastname: lastname,
        address: address,
        contactno: contactno,
    };

    // Use the email as a key to store multiple contacts for the same user
    const userContacts = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    userContacts.push(contactData);
    localStorage.setItem(loggedInUser, JSON.stringify(userContacts));

    // Clear the contact creation form
    document.getElementById("c-email").value = "";
    document.getElementById("c-firstname").value = "";
    document.getElementById("c-lastname").value = "";
    document.getElementById("c-address").value = "";
    document.getElementById("c-contactno").value = "";

    alert("Contact added successfully!");
}
