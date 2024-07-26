document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("registrationForm").onsubmit = function(event) {
        event.preventDefault();
        if (validateForm()) {
            if (validateOTP()) {
                sendMail();
            } else {
                alert("Invalid OTP.");
            }
        }
    };

    window.sendOTP = function sendOTP() {
        var email = document.getElementById("email").value;
        if (email.trim() === '') {
            alert("Please enter your email address.");
            return;
        }

     
        var otp = Math.floor(100000 + Math.random() * 900000);
       
        sessionStorage.setItem('otp', otp);

        var templateParams = {
            to_email: email,
            otp: otp
        };

        emailjs.send("service_4x7589r", "template_s5v1m5u", templateParams)
            .then(function(response) {
                alert("OTP sent successfully to your email!");
                document.getElementById("otp-section").style.display = 'block'; 
            }, function(error) {
                alert("Failed to send OTP.");
            });
    }

    function validateForm() {
        var name = document.getElementById("name").value;
        var gender = document.getElementById("gender").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var dob = document.getElementById("dob").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (name.trim() === '' || gender === '' || email.trim() === '' || phone.trim() === '' ||
            dob === '' || username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            alert("Please fill in all fields.");
            return false;
        }

        var nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            alert("Name should only contain letters and spaces.");
            return false;
        }

        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            return false;
        }

        var phoneRegex = /^[789]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert("Phone number should be 10 digits and cannot start with 1, 2, 3, 4, 5, 6, or 0.");
            return false;
        }

        var dobDate = new Date(dob);
        var currentDate = new Date();
        if (dobDate >= currentDate) {
            alert("Date of birth must be in the past.");
            return false;
        }

        if (username.length < 5 || username.length > 20) {
            alert("Username must be between 5 to 20 characters long.");
            return false;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }

        return true;
    }

    function validateOTP() {
        var formOtp = document.getElementById("otp").value;
        var storedOtp = sessionStorage.getItem('otp');
        return formOtp == storedOtp;
    }

    function sendMail() {
        var params = {
            name: document.getElementById("name").value,
            gender: document.getElementById("gender").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            dob: document.getElementById("dob").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value,
        };

        var templateParams = {
            to_email: params.email,
            name: params.name,
            gender: params.gender,
            email: params.email,
            phone: params.phone,
            dob: params.dob,
            username: params.username,
            password: params.password,
            confirmPassword: params.confirmPassword,
        };

           
                alert("Registration Done Sucessfully");
           
    }
});
