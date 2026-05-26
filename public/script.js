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



async function openCart() {

    hideAll();

    document.getElementById("cart-screen")
        .classList.add("active");

    const user =
        JSON.parse(localStorage.getItem("user"));

    try {

        const response = await fetch(
            `http://localhost:5000/api/cart/${user.id}`
        );

        cart = await response.json();

        renderCart();

    } catch (err) {

        console.error(err);

        alert("Failed to load cart");
    }
}



function openProfile() {

    hideAll();

    document.getElementById("profile-screen")
        .classList.add("active");

    loadProfile();
    loadOrderCount();
    loadOrderHistory();
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

async function addToCart() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const cartItem = {

        userId: user.id,

        foodName: currentFood.name,

        price: parseFloat(
            currentFood.price.replace("$", "")
        ),

        image: currentFood.image,

        quantity: count
    };

    await fetch(
        "http://localhost:5000/api/cart/add",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(cartItem)
        }
    );

    alert("Added To Cart");

    openCart();
}


/* RENDER CART */

function renderCart() {

    let cartContainer =
        document.getElementById("cart-container");

    let totalPrice = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p style="
                text-align:center;
                color:white;
                margin-top:50px;
            ">
                Your cart is empty
            </p>
        `;

        document.getElementById("total-price")
            .innerText = "$0.00";

        return;
    }

    cart.forEach((item, index) => {

        totalPrice += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.foodName}">

            <div class="cart-details">

                <h3>${item.foodName}</h3>

                <p>$${item.price}</p>

                <div class="qty-buttons">

                        <button onclick="decreaseQty(${index})">-</button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQty(${index})">+</button>

                </div>

                <button
                        class="remove-btn"
                        onclick="removeFromCart('${item._id}')">

                        Remove

                </button>

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

async function placeOrder() {

    const phone =
        document.getElementById("customer-phone").value;

    const address =
        document.getElementById("customer-address").value;

    if (!phone || !address) {

        alert("Please enter phone number and address");

        return;
    }

    if (cart.length === 0) {

        alert("Cart is Empty");

        return;
    }

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const orderData = {

        userId: user.id,

        userName: user.name,

        userEmail: user.email,

        phone: phone,

        address: address,

        items: cart,

        totalPrice: cart.reduce(
            (total, item) =>
                total + (item.price * item.quantity),
            0
        )
    };

    try {

        /* SAVE ORDER */

        const response = await fetch(
            "http://localhost:5000/api/order/place",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(orderData)
            }
        );

        const data = await response.json();

        console.log("Order Response:", data);

        /* CLEAR CART FROM MONGODB */

        const clearResponse = await fetch(
            `http://localhost:5000/api/cart/clear/${user.id}`,
            {
                method: "DELETE"
            }
        );

        const clearData =
            await clearResponse.json();

        console.log(
            "Cart Clear Response:",
            clearData
        );

        /* CLEAR LOCAL CART */

        cart = [];

        renderCart();

        alert("Order Placed Successfully");

        hideAll();

        document
            .getElementById("success-screen")
            .classList.add("active");

    } catch (err) {

        console.error(err);

        alert("Order Failed");
    }
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

async function loginUser() {

    let email =
        document.getElementById("login-email").value;

    let password =
        document.getElementById("login-password").value;

    let error =
        document.getElementById("login-error");

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            error.innerText = data.message;

            alert(data.message);

            return;
        }

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        error.innerText = "";

        alert("Login Successful");

        loadFoods();
        openHome();


    }
    catch (err) {

        console.error(err);

        error.innerText = "Server Error";

        alert("Server Error");
    }
}


/* SIGNUP */

async function signupUser() {

    //   alert("Signup button clicked");


    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    let error = document.getElementById("signup-error");

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        // console.log("Response:", data);

        if (!response.ok) {

            error.innerText = data.message;
            return;
        }

        error.innerText = "";

        alert("Account Created Successfully");

        document.getElementById("signup-name").value = "";
        document.getElementById("signup-email").value = "";
        document.getElementById("signup-password").value = "";

        openLogin();

    } catch (err) {

        console.error(err);

        error.innerText = "Server Error";
    }
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

async function removeFromCart(cartId) {

    try {

        await fetch(
            `http://localhost:5000/api/cart/${cartId}`,
            {
                method: "DELETE"
            }
        );

        openCart();

    } catch (err) {

        console.error(err);

        alert("Failed to remove item");
    }
}

async function loadFoods() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/foods"
            );

        const foods =
            await response.json();

        loadCategories();

        const container =
            document.getElementById(
                "food-container"
            );

        container.innerHTML = "";

        foods.forEach(food => {

            container.innerHTML += `

            <div class="food-card ${food.category.toLowerCase()}"

            data-name="${food.name}"

            onclick="openDetails(
                '${food.name}',
                '$${food.price}',
                '${food.image}'
            )">

                <img src="${food.image}">

                <h3>${food.name}</h3>

                <p>$${food.price}</p>

            </div>

            `;
        });

    } catch (err) {

        console.error(err);
    }
}

async function loadCategories() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/foods/categories"
            );

        const categories =
            await response.json();

        const container =
            document.getElementById(
                "category-container"
            );

        container.innerHTML = "";

        container.innerHTML += `
            <button onclick="filterFood('all')">
                All
            </button>
        `;

        categories.forEach(category => {

            container.innerHTML += `
                <button
                onclick="filterFood('${category.toLowerCase()}')">

                    ${category}

                </button>
            `;
        });

    } catch (err) {

        console.error(err);
    }
}

loadCategories();

window.onload = () => {

    setTimeout(() => {

        document.getElementById("splash-screen")
            .classList.remove("active");

        const user = localStorage.getItem("user");

        if (user) {

            openHome();
            loadFoods();

        } else {

            document.getElementById("login-screen")
                .classList.add("active");
        }

    }, 3000);

};



async function loadProfile() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/auth/profile/${user.id}`
            );

        const profile =
            await response.json();

        document.getElementById(
            "profile-name"
        ).innerText = profile.name;

        document.getElementById(
            "profile-email"
        ).innerText = profile.email;

    } catch (err) {

        console.error(err);
    }
}

async function loadOrderCount() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/order/${user.id}`
            );

        const orders =
            await response.json();

        document.getElementById("order-count")
            .innerText = orders.length;

    } catch (err) {

        console.error(err);
    }
}


async function loadOrderHistory() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/order/${user.id}`
            );

        const orders =
            await response.json();

        const container =
            document.getElementById(
                "history-container"
            );

        container.innerHTML = "";

        if (orders.length === 0) {

            container.innerHTML =
                "<p style='color:white'>No Orders Yet</p>";

            return;
        }

        orders.reverse().forEach(order => {

            let foods = "";

            order.items.forEach(item => {

                foods += `
                    <div class="food-line">
                        🍔 ${item.foodName} × ${item.quantity}
                    </div>
                    `;
            });

            container.innerHTML += `

            <div class="order-card">

                <h4>
                    Order #${order._id.slice(-5)}
                </h4>

                ${foods}

                <p>
                    Total: $${Number(order.totalPrice).toFixed(2)}
                </p>

                <p>
                    Status:
                    ${order.status}
                </p>

            </div>

            `;
        });

    } catch (err) {

        console.error(err);
    }
}

function openOrderHistory() {

    hideAll();

    document.getElementById(
        "history-screen"
    ).classList.add("active");

    loadOrderHistory();
}

function openCheckout() {

    hideAll();

    document.getElementById("checkout-screen")
        .classList.add("active");

    const user =
        JSON.parse(localStorage.getItem("user"));

    document.getElementById("customer-name").value =
        user.name || "";

    document.getElementById("customer-phone").value = "";
}