let count = 1;

let currentFood = {};

let cart = [];



function openHome() {

    hideAll();

    document.getElementById("home-screen")
        .classList.add("active");
}



function openDetails(name, price, image) {

    hideAll();

    document.getElementById("details-screen")
        .classList.add("active");

    document.getElementById("foodName")
        .innerText = name;

    document.getElementById("foodPrice")
        .innerText = price;

    document.getElementById("foodImage")
        .src = image;

    currentFood = {
        name,
        price,
        image
    };

    count = 1;

    document.getElementById("quantity")
        .innerText = count;
}



function hideAll() {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });
}



function goHome() {

    hideAll();

    document.getElementById("home-screen")
        .classList.add("active");
}



function openCart() {

    hideAll();

    document.getElementById("cart-screen")
        .classList.add("active");

    renderCart();
}



function openProfile() {

    hideAll();

    document.getElementById("profile-screen")
        .classList.add("active");
}



function increase() {

    count++;

    document.getElementById("quantity")
        .innerText = count;
}



function decrease() {

    if (count > 1) {

        count--;

        document.getElementById("quantity")
            .innerText = count;
    }
}



/* ADD TO CART */

function addToCart() {

    let food = {

        name: currentFood.name,

        price: parseFloat(currentFood.price.replace("$", "")),

        image: currentFood.image,

        quantity: count
    };

    cart.push(food);

    openCart();
}



/* RENDER CART */

function renderCart() {

    let cartContainer =
        document.getElementById("cart-container");

    let totalPrice = 0;

    cartContainer.innerHTML = "";



    cart.forEach((item, index) => {

        totalPrice += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p>$${item.price}</p>

                <div class="qty-buttons">

                    <button onclick="decreaseQty(${index})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

            </div>

        </div>

        `;
    });

    document.getElementById("total-price")
        .innerText = "$" + totalPrice.toFixed(2);
}



/* INCREASE CART QTY */

function increaseQty(index) {

    cart[index].quantity++;

    renderCart();
}



/* DECREASE CART QTY */

function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    renderCart();
}



/* SUCCESS */

function placeOrder() {

    hideAll();

    document.getElementById("success-screen")
        .classList.add("active");

    cart = [];
}

/* FILTER FOOD */

function filterFood(category) {

    let foods =
        document.querySelectorAll(".food-card");

    foods.forEach(food => {

        if (category === "all") {

            food.style.display = "block";

        } else {

            if (food.classList.contains(category)) {

                food.style.display = "block";

            } else {

                food.style.display = "none";
            }
        }
    });
}



/* SEARCH FOOD */

function searchFood() {

    let input =
        document.getElementById("searchInput")
            .value
            .toLowerCase();

    let foods =
        document.querySelectorAll(".food-card");

    foods.forEach(food => {

        let foodName =
            food.getAttribute("data-name")
                .toLowerCase();

        if (foodName.includes(input)) {

            food.style.display = "block";

        } else {

            food.style.display = "none";
        }
    });
}


/* ================= SPLASH SCREEN ================= */

window.onload = () => {

    setTimeout(() => {

        // Hide splash screen

        document.getElementById("splash-screen")
            .classList.remove("active");

        // Show login screen

        document.getElementById("login-screen")
            .classList.add("active");

    }, 3000);

};

/* ================= AUTH ================= */

function openSignup() {

    hideAll();

    document.getElementById("signup-screen")
        .classList.add("active");
}


function openLogin() {

    hideAll();

    document.getElementById("login-screen")
        .classList.add("active");
}



/* LOGIN */

function loginUser() {

    let email =
        document.getElementById("login-email").value;

    let password =
        document.getElementById("login-password").value;

    let error =
        document.getElementById("login-error");



    if (email === "" || password === "") {

        error.innerText =
            "Please fill all fields";

        return;
    }



    if (!email.includes("@")) {

        error.innerText =
            "Invalid email";

        return;
    }



    if (password.length < 6) {

        error.innerText =
            "Password must be 6 characters";

        return;
    }



    error.innerText = "";

    openHome();
}



/* SIGNUP */

function signupUser() {

    let name =
        document.getElementById("signup-name").value;

    let email =
        document.getElementById("signup-email").value;

    let password =
        document.getElementById("signup-password").value;

    let error =
        document.getElementById("signup-error");



    if (name === "" || email === "" || password === "") {

        error.innerText =
            "Please fill all fields";

        return;
    }



    if (!email.includes("@")) {

        error.innerText =
            "Invalid email";

        return;
    }



    if (password.length < 6) {

        error.innerText =
            "Password must be 6 characters";

        return;
    }



    error.innerText = "";

    alert("Account Created Successfully");

    openLogin();
}



/* SHOW/HIDE PASSWORD */

function togglePassword(id) {

    let input =
        document.getElementById(id);

    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";
    }
}