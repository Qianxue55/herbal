document.addEventListener("DOMContentLoaded", function() {
  // Function to add a cart item to the cart container
  function addCartItem(name, price, imageSrc) {
    var cartItemsContainer = document.getElementById('cart-items-container');
    var existingCartItem = document.querySelector(`.cart-box[data-name="${name}"]`);

    if (existingCartItem) {
      var quantitySpan = existingCartItem.querySelector('.quantity');
      var quantity = parseInt(quantitySpan.textContent) + 1;
      quantitySpan.textContent = quantity;
      updateCartItemTotal(existingCartItem);
    } else {
      var cartItem = document.createElement('div');
      cartItem.classList.add('cart-box');
      cartItem.dataset.name = name;

      var numericPrice = parseFloat(price.replace('$', ''));

      cartItem.innerHTML = `
        <img src="${imageSrc}" alt="">
        <div class="txt">
          <h3 class="name">${name}</h3>
          <span class="price" data-price="${numericPrice}">${price}</span>
        </div>
        <div class="quantity-controls">
          <button class="quantity-minus">-</button>
          <span class="quantity">1</span>
          <button class="quantity-plus">+</button>
        </div>
        <i class="fa-solid fa-trash-can remove-icon"></i>
      `;

      cartItemsContainer.appendChild(cartItem);

      updateCartItemTotal(cartItem); // Update cart item total
      updateCartTotalPrice(); // Update total cart price
      updateCartItemCount(); // Update cart item count

      // Add event listeners to quantity controls
      var quantitySpan = cartItem.querySelector('.quantity');
      var quantityPlus = cartItem.querySelector('.quantity-plus');
      var quantityMinus = cartItem.querySelector('.quantity-minus');

      quantityPlus.addEventListener('click', function() {
        quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
        updateCartItemTotal(cartItem);
      });

      quantityMinus.addEventListener('click', function() {
        if (parseInt(quantitySpan.textContent) > 1) {
          quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
          updateCartItemTotal(cartItem);
        }
      });

      saveCartToLocalStorage(); // Save cart to local storage
    }
  }

  // Function to update the total price of a cart item
  function updateCartItemTotal(cartItem) {
    var price = parseFloat(cartItem.querySelector('.price').dataset.price);
    var quantity = parseInt(cartItem.querySelector('.quantity').textContent);
    var total = price * quantity;
    cartItem.querySelector('.price').textContent = '$' + total.toFixed(2);

    updateCartTotalPrice();
    saveCartToLocalStorage(); // Save cart to local storage when quantity changes
  }

  // Function to update the cart item count
  function updateCartItemCount() {
    var cartItemCount = document.querySelectorAll('.cart-box').length;
    var cartItemCountElement = document.querySelector('.item');
    cartItemCountElement.textContent = cartItemCount;
  }

  // Function to update the cart total price
  function updateCartTotalPrice() {
    var cartTotalPriceElement = document.getElementById('cart-total-price');
    var cartItems = document.querySelectorAll('.cart-box');

    var total = 0;
    cartItems.forEach(function(item) {
      var price = parseFloat(item.querySelector('.price').dataset.price);
      var quantity = parseInt(item.querySelector('.quantity').textContent);
      total += price * quantity;
    });

    cartTotalPriceElement.textContent = '$' + total.toFixed(2);

    saveCartToLocalStorage(); // Save cart to local storage when total price changes
  }

  // Function to save cart data to local storage
  function saveCartToLocalStorage() {
    var cartItems = document.querySelectorAll('.cart-box');
    var cartData = [];

    cartItems.forEach(function(cartItem) {
      var name = cartItem.dataset.name;
      var price = parseFloat(cartItem.querySelector('.price').dataset.price);
      var quantity = parseInt(cartItem.querySelector('.quantity').textContent);
      var imageSrc = cartItem.querySelector('img').src;

      cartData.push({
        name,
        price,
        quantity,
        imageSrc
      });
    });

    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  // Function to load cart data from local storage
  function loadCartFromLocalStorage() {
    var cartData = JSON.parse(localStorage.getItem("cartData"));

    if (cartData) {
      cartData.forEach(function(item) {
        addCartItem(item.name, '$' + item.price, item.imageSrc);
        var existingCartItem = document.querySelector(`.cart-box[data-name="${item.name}"]`);
        existingCartItem.querySelector('.quantity').textContent = item.quantity; // Set correct quantity
        updateCartItemTotal(existingCartItem); // Update cart item total
      });

      updateCartTotalPrice();
      updateCartItemCount(); // Update cart item count after loading data
    }
  }

  // Load cart data from local storage
  // Load cart data from local storage when the page is loaded
  loadCartFromLocalStorage();

  // Event listener to remove a cart item
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-icon')) {
      var cartItem = event.target.parentElement;
      cartItem.remove();

      updateCartTotalPrice(); // Update total price after removing item
      updateCartItemCount(); // Update cart item count after removing item
      saveCartToLocalStorage(); // Save updated cart to local storage
    }
  });

  // Event listener for adding items to the cart
  var addToCartButtons = document.querySelectorAll('.featured-card .cart-icon');
  addToCartButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
      var itemName = button.parentElement.parentElement.querySelector('.f-image-content p').textContent;
      var itemPrice = button.parentElement.parentElement.querySelector('.price').textContent;
      var imageSrc = button.parentElement.parentElement.querySelector('.feature-image img').src;
      addCartItem(itemName, itemPrice, imageSrc);
      updateCartItemCount(); // Update cart item count
    });
  });

  // Event listener for clicking the cart icon
  var cartIcon = document.getElementById('cartIcon');
  cartIcon.addEventListener('click', function() {
    document.querySelector('.shopping-cart').classList.toggle('open');
  });
});