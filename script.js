/*
=========================================================
EXPLORE INDIA TOURISM
FINAL FRONTEND JAVASCRIPT
=========================================================
No email confirmation code.
No SMTP.
Login is compulsory before booking.
Bookings are stored in browser localStorage.
Payment page is a college-project demo UI.
=========================================================
*/

const PACKAGES = {
    goa: [
        ["Goa Beach Escape - 4 Days / 3 Nights", 12000],
        ["Goa Adventure Tour - 5 Days / 4 Nights", 15000]
    ],
    kashmir: [
        ["Kashmir Paradise - 5 Days / 4 Nights", 18000],
        ["Kashmir Snow Adventure - 6 Days / 5 Nights", 22000]
    ],
    kerala: [
        ["Kerala Backwaters - 4 Days / 3 Nights", 14000],
        ["Kerala Nature Tour - 5 Days / 4 Nights", 17000]
    ],
    rajasthan: [
        ["Royal Rajasthan - 5 Days / 4 Nights", 16000],
        ["Rajasthan Desert Tour - 6 Days / 5 Nights", 20000]
    ],
    hyderabad: [
        ["Hyderabad Heritage Tour - 3 Days / 2 Nights", 9000],
        ["Hyderabad Food & Culture Tour - 4 Days / 3 Nights", 11000]
    ],
    manali: [
        ["Manali Mountain Escape - 5 Days / 4 Nights", 17000],
        ["Manali Adventure Tour - 6 Days / 5 Nights", 21000]
    ]
};

const DESTINATIONS = {
    goa: {
        name: "Goa",
        tag: "🏖️ BEACH PARADISE",
        image: "images/goa.jpg",
        short: "Sun, beaches and unforgettable experiences.",
        description: "Goa is perfect for travelers who love beaches, sunsets, water sports and coastal food.",
        places: ["Baga Beach", "Calangute Beach", "Anjuna Beach", "Dudhsagar Falls"],
        activities: ["🌊 Water Sports", "🏖️ Beach Walk", "🌅 Sunset View", "🍤 Seafood"],
        bestTime: "November – February",
        famousFor: "Beaches & Seafood",
        travelType: "Beach & Adventure"
    },

    kashmir: {
        name: "Kashmir",
        tag: "🏔️ PARADISE ON EARTH",
        image: "images/kashmir.jpg",
        short: "Snowy mountains, lakes and peaceful valleys.",
        description: "Explore beautiful mountains, peaceful valleys, lakes and memorable nature experiences.",
        places: ["Dal Lake", "Gulmarg", "Pahalgam", "Sonamarg"],
        activities: ["🚣 Shikara Ride", "❄️ Snow Experience", "🏔️ Mountain View", "🌲 Valley Walk"],
        bestTime: "March – October",
        famousFor: "Mountains & Lakes",
        travelType: "Nature & Adventure"
    },

    kerala: {
        name: "Kerala",
        tag: "🌴 GOD'S OWN COUNTRY",
        image: "images/kerala.jpg",
        short: "Backwaters, greenery and peaceful nature.",
        description: "Enjoy beautiful backwaters, lush landscapes, hill stations and relaxing surroundings.",
        places: ["Munnar", "Alleppey", "Kochi", "Thekkady"],
        activities: ["🚤 Houseboat", "🌴 Backwater Cruise", "🌿 Nature Walk", "⛰️ Hill Station"],
        bestTime: "October – March",
        famousFor: "Backwaters & Nature",
        travelType: "Nature & Relaxation"
    },

    rajasthan: {
        name: "Rajasthan",
        tag: "🏰 ROYAL HERITAGE",
        image: "images/rajasthan.jpg",
        short: "Forts, palaces, deserts and colourful culture.",
        description: "Discover magnificent forts, royal palaces, desert landscapes and vibrant culture.",
        places: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"],
        activities: ["🐪 Desert Safari", "🏰 Fort Visit", "🎭 Cultural Show", "🛍️ Local Shopping"],
        bestTime: "October – March",
        famousFor: "Forts & Palaces",
        travelType: "Heritage & Culture"
    },

    hyderabad: {
        name: "Hyderabad",
        tag: "🕌 CITY OF HERITAGE",
        image: "images/hyderabad.jpg",
        short: "History, architecture and famous local food.",
        description: "Explore historic monuments, traditional culture, shopping and famous Hyderabad cuisine.",
        places: ["Charminar", "Golconda Fort", "Hussain Sagar", "Salar Jung Museum"],
        activities: ["🕌 Heritage Tour", "📸 Sightseeing", "🍛 Food Tour", "🛍️ Shopping"],
        bestTime: "October – February",
        famousFor: "Heritage & Biryani",
        travelType: "History & Food"
    },

    manali: {
        name: "Manali",
        tag: "❄️ MOUNTAIN ADVENTURE",
        image: "images/manali.jpg",
        short: "Snow, mountains, valleys and adventure.",
        description: "Enjoy scenic valleys, mountain views, snow experiences and outdoor activities.",
        places: ["Solang Valley", "Rohtang Pass", "Old Manali", "Hadimba Temple"],
        activities: ["❄️ Snow Activities", "🏔️ Mountain Trek", "🚵 Adventure", "📸 Valley View"],
        bestTime: "October – June",
        famousFor: "Snow & Mountains",
        travelType: "Adventure & Nature"
    }
};


/* ======================================================
   LOGIN
====================================================== */

function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

function loginUser() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (savedEmail && savedPassword) {
        if (email !== savedEmail || password !== savedPassword) {
            alert("Incorrect email or password.");
            return false;
        }
    } else {
        /*
        First login demo:
        If the user has no registered account, save the entered
        login details so the project can continue.
        */
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        if (!localStorage.getItem("userName")) {
            localStorage.setItem("userName", email.split("@")[0]);
        }
    }

    localStorage.setItem("loggedIn", "true");

    alert("Login successful! ✈️");
    window.location.href = "index.html";

    return false;
}

function registerUser() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    if (password.length < 4) {
        alert("Password must contain at least 4 characters.");
        return false;
    }

    if (password !== confirm) {
        alert("Passwords do not match.");
        return false;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userPassword", password);
    localStorage.setItem("loggedIn", "true");

    alert("Account created successfully! ✈️");
    window.location.href = "index.html";

    return false;
}

function logoutUser() {
    localStorage.setItem("loggedIn", "false");
    window.location.href = "index.html";
}


/* ======================================================
   BOOKING LOGIN CHECK
====================================================== */

function requireLoginForBooking() {
    if (!isLoggedIn()) {
        openLogin();
        return;
    }

    window.location.href = "index.html#destinations";
}


/* ======================================================
   PROFILE
====================================================== */

function toggleProfile() {
    if (!isLoggedIn()) {
        openLogin();
        return;
    }

    document.getElementById("profilePanel").classList.toggle("show");
    document.getElementById("profileBackdrop").classList.toggle("show");
    loadProfile();
}

function loadProfile() {
    const name =
        localStorage.getItem("userName") || "User";

    const email =
        localStorage.getItem("userEmail") || "-";

    const phone =
        localStorage.getItem("userPhone") || "-";

    document.getElementById("profileName").textContent = name;
    document.getElementById("profileEmail").textContent = "📧 " + email;
    document.getElementById("profilePhone").textContent = "📱 " + phone;
    document.getElementById("navName").textContent = name;

    const photo =
        localStorage.getItem("profilePhoto");

    if (photo) {
        document.getElementById("profileImage").src = photo;
    }

    const bookings =
        JSON.parse(localStorage.getItem("bookings") || "[]");

    document.getElementById("bookingCount").textContent =
        bookings.length;

    const history =
        document.getElementById("historyList");

    if (!bookings.length) {
        history.innerHTML =
            '<p class="muted">No bookings yet.</p>';
        return;
    }

    history.innerHTML = bookings
        .slice()
        .reverse()
        .slice(0, 5)
        .map(function (booking) {
            return `
                <div class="history-item">
                    <strong>${booking.destination}</strong>
                    <span>${booking.date}</span>
                </div>
            `;
        })
        .join("");
}

function openEditProfile() {
    document.getElementById("editName").value =
        localStorage.getItem("userName") || "";

    document.getElementById("editPhone").value =
        localStorage.getItem("userPhone") || "";

    document.getElementById("editPhoto").value =
        localStorage.getItem("profilePhoto") || "";

    document.getElementById("editModal").classList.remove("hidden");
}

function closeEditProfile() {
    document.getElementById("editModal").classList.add("hidden");
}

function saveProfile() {
    const name =
        document.getElementById("editName").value.trim();

    const phone =
        document.getElementById("editPhone").value.trim();

    const photo =
        document.getElementById("editPhoto").value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userPhone", phone);

    if (photo) {
        localStorage.setItem("profilePhoto", photo);
    }

    closeEditProfile();
    loadProfile();

    alert("Profile updated successfully.");
}


/* ======================================================
   LOGIN MODAL
====================================================== */

function openLogin() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.remove("hidden");
    }
}

function closeLogin() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


/* ======================================================
   DESTINATION EXPLORE
====================================================== */

function exploreDestination(key) {
    window.location.href =
        "destination.html?place=" + encodeURIComponent(key);
}

function bookCurrentDestination() {
    if (!isLoggedIn()) {
        openLogin();
        return;
    }

    const key =
        new URLSearchParams(window.location.search).get("place");

    if (!key || !DESTINATIONS[key]) {
        alert("Destination not found.");
        return;
    }

    window.location.href =
        "booking.html?place=" + encodeURIComponent(key);
}


/* ======================================================
   DESTINATION PAGE
====================================================== */

function loadDestinationPage() {
    const key =
        new URLSearchParams(window.location.search).get("place");

    const data = DESTINATIONS[key];

    if (!data) {
        return;
    }

    const image =
        document.getElementById("detailImage");

    image.src = data.image;
    image.alt = data.name;

    image.onerror = function () {
        this.src =
            "images/" + key + "-placeholder.svg";
    };

    document.getElementById("detailTag").textContent =
        data.tag;

    document.getElementById("detailName").textContent =
        data.name;

    document.getElementById("detailShort").textContent =
        data.short;

    document.getElementById("detailTitle").textContent =
        "Experience " + data.name;

    document.getElementById("detailDescription").textContent =
        data.description;

    document.getElementById("bookName").textContent =
        data.name;

    document.getElementById("places").innerHTML =
        data.places.map(function (place) {
            return "<p>📍 " + place + "</p>";
        }).join("");

    document.getElementById("activities").innerHTML =
        data.activities.map(function (activity) {
            return "<p>" + activity + "</p>";
        }).join("");

    document.getElementById("bestTime").textContent =
        data.bestTime;

    document.getElementById("famousFor").textContent =
        data.famousFor;

    document.getElementById("travelType").textContent =
        data.travelType;
}


/* ======================================================
   BOOKING PAGE
====================================================== */

function loadBookingPage() {
    if (!isLoggedIn()) {
        alert("Please login first to book a trip.");
        window.location.href = "login.html";
        return;
    }

    const key =
        new URLSearchParams(window.location.search).get("place");

    const data = DESTINATIONS[key];

    if (!data) {
        alert("Please select a destination first.");
        window.location.href = "index.html#destinations";
        return;
    }

    document.getElementById("bookingImage").src =
        data.image;

    document.getElementById("bookingImage").onerror =
        function () {
            this.src =
                "images/" + key + "-placeholder.svg";
        };

    document.getElementById("bookingDestinationName").textContent =
        data.name;

    document.getElementById("bookingDestinationText").textContent =
        data.short;

    document.getElementById("bookingName").value =
        localStorage.getItem("userName") || "";

    document.getElementById("bookingEmail").value =
        localStorage.getItem("userEmail") || "";

    document.getElementById("bookingPhone").value =
        localStorage.getItem("userPhone") || "";

    const packageSelect =
        document.getElementById("tourPackage");

    packageSelect.innerHTML = "";

    PACKAGES[key].forEach(function (item) {

        const option =
            document.createElement("option");

        option.value = item[0];
        option.textContent =
            item[0] +
            " — ₹" +
            item[1].toLocaleString("en-IN");

        option.dataset.price = item[1];

        packageSelect.appendChild(option);
    });

    updateBookingAmount();

    document.getElementById("travelDate").min =
        new Date().toISOString().split("T")[0];
}

function updateBookingAmount() {
    const select =
        document.getElementById("tourPackage");

    const travelers =
        Number(
            document.getElementById("travelers").value || 1
        );

    const option =
        select.options[select.selectedIndex];

    const price =
        Number(option ? option.dataset.price : 0);

    const total =
        price * travelers;

    document.getElementById("bookingAmount").textContent =
        "₹" + total.toLocaleString("en-IN");
}

function saveBooking() {
    if (!isLoggedIn()) {
        alert("Please login first.");
        window.location.href = "login.html";
        return false;
    }

    const name =
        document.getElementById("bookingName").value.trim();

    const email =
        document.getElementById("bookingEmail").value.trim();

    const phone =
        document.getElementById("bookingPhone").value.trim();

    const date =
        document.getElementById("travelDate").value;

    const travelers =
        Number(document.getElementById("travelers").value);

    const packageSelect =
        document.getElementById("tourPackage");

    const key =
        new URLSearchParams(window.location.search).get("place");

    if (!name || !email || !phone || !date) {
        alert("Please fill all required details.");
        return false;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    const selected =
        packageSelect.options[packageSelect.selectedIndex];

    const price =
        Number(selected.dataset.price);

    const amount =
        price * travelers;

    const booking = {
        id: "BK" + Date.now(),
        destination: DESTINATIONS[key].name,
        destinationKey: key,
        package: selected.value,
        date: date,
        travelers: travelers,
        amount: amount,
        name: name,
        email: email,
        phone: phone,
        specialRequest:
            document.getElementById("specialRequest").value,
        status: "Payment Pending"
    };

    localStorage.setItem(
        "currentBooking",
        JSON.stringify(booking)
    );

    window.location.href = "payment.html";

    return false;
}


/* ======================================================
   PAYMENT
====================================================== */

function loadPaymentPage() {
    const booking =
        JSON.parse(
            localStorage.getItem("currentBooking") || "null"
        );

    if (!booking) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("payDestination").textContent =
        booking.destination;

    document.getElementById("payPackage").textContent =
        booking.package;

    document.getElementById("payTravelers").textContent =
        booking.travelers;

    const amount =
        "₹" + booking.amount.toLocaleString("en-IN");

    document.getElementById("payAmount").textContent =
        amount;

    document.getElementById("qrAmount").textContent =
        amount;
}

function selectPayment(type, button) {

    document.querySelectorAll(".payment-tabs button")
        .forEach(function (item) {
            item.classList.remove("active");
        });

    button.classList.add("active");

    document.getElementById("upiBox")
        .classList.toggle("hidden", type !== "upi");

    document.getElementById("qrBox")
        .classList.toggle("hidden", type !== "qr");

    document.getElementById("cardBox")
        .classList.toggle("hidden", type !== "card");
}

function demoPayment(method) {
    const booking =
        JSON.parse(
            localStorage.getItem("currentBooking") || "null"
        );

    if (!booking) {
        alert("Booking details not found.");
        return;
    }

    if (method === "UPI") {
        const upi =
            document.getElementById("upiId").value.trim();

        if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+$/.test(upi)) {
            alert("Please enter a valid UPI ID.");
            return;
        }
    }

    if (method === "Card") {
        const card =
            document.getElementById("cardNumber").value.trim();

        if (card.length < 12) {
            alert("Please enter valid card details.");
            return;
        }
    }

    /*
    This is a college-project demo payment.
    It does not claim a real bank transaction.
    */
    booking.status = "Payment Completed";
    booking.paymentMethod = method;

    const history =
        JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );

    history.push(booking);

    localStorage.setItem(
        "bookings",
        JSON.stringify(history)
    );

    localStorage.removeItem("currentBooking");

    window.location.href = "confirmation.html";
}


/* ======================================================
   CONFIRMATION
====================================================== */

function loadConfirmationPage() {

    const history =
        JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );

    const booking =
        history[history.length - 1];

    if (!booking) {
        return;
    }

    document.getElementById("cName").textContent =
        booking.name;

    document.getElementById("cEmail").textContent =
        booking.email;

    document.getElementById("cPhone").textContent =
        booking.phone;

    document.getElementById("cDestination").textContent =
        booking.destination;

    document.getElementById("cPackage").textContent =
        booking.package;

    document.getElementById("cDate").textContent =
        booking.date;

    document.getElementById("cTravelers").textContent =
        booking.travelers;

    document.getElementById("cAmount").textContent =
        "₹" + booking.amount.toLocaleString("en-IN");
}


/* ======================================================
   PAGE INITIALIZATION
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const intro =
        document.getElementById("introScreen");

    const loader =
        document.getElementById("loader");

    const app =
        document.getElementById("app");

    if (intro && loader && app) {

        setTimeout(function () {
            intro.style.display = "none";
        }, 3300);

        setTimeout(function () {
            loader.style.opacity = "0";

            setTimeout(function () {
                loader.style.display = "none";
                app.classList.remove("hidden");
                loadProfile();
            }, 600);

        }, 3900);
    }

    if (document.getElementById("detailName")) {
        loadDestinationPage();
    }

    if (document.getElementById("bookingDestinationName")) {
        loadBookingPage();

        document.getElementById("tourPackage")
            .addEventListener("change", updateBookingAmount);

        document.getElementById("travelers")
            .addEventListener("input", updateBookingAmount);
    }

    if (document.getElementById("payDestination")) {
        loadPaymentPage();
    }

    if (document.getElementById("cName")) {
        loadConfirmationPage();
    }
});
