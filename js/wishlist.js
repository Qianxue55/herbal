// Retrieve wishlist from local storage or initialize as an empty array
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Function to add product to wishlist
function addToWishlist(product) {
    // Check if the product is already in the wishlist
    const exists = wishlist.find(item => item.id === product.id);
    
    if (!exists) {
        wishlist.push(product); // Add the product if it's not in the wishlist
        localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Save to local storage
        alert("Added to wishlist");
    } else {
        alert("Already in wishlist");
    }
}

// Add event listeners to wishlist icons on the product cards
document.querySelectorAll(".save-icon").forEach((icon, index) => {
    icon.addEventListener("click", () => {
        // Product information to add to the wishlist
        const product = {
            id: `featured-card-${index}`,
            image: icon.parentElement.parentElement.querySelector(".feature-image img").src,
            name: icon.parentElement.parentElement.querySelector(".f-image-content p").textContent,
            price: icon.parentElement.parentElement.querySelector(".f-image-content .price").textContent,
        };
        
        addToWishlist(product); // Add to wishlist
    });
});
