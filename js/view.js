// Get modal and close button
const productModal = document.getElementById("product-modal");
const closeModal = document.querySelector(".close-modal");

// Function to open and populate modal
function openProductModal(productData) {
    // Parse the product data (as it's a JSON string in data-product)
    const product = JSON.parse(productData);

    // Find modal elements
    const modalImage = productModal.querySelector(".modal-image img");
    const modalName = productModal.querySelector("h2");
    const modalDescription = productModal.querySelector(".product-description");

    // Set the modal content with product details
    modalImage.src = product.image;
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;

    // Show the modal
    productModal.style.display = "block";
}

// Event listener to close the modal
closeModal.addEventListener("click", () => {
    productModal.style.display = "none";
});

// Add event listeners to product cards
document.querySelectorAll(".featured-card .view-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
        // Get the parent card and its product data
        const parentCard = e.currentTarget.closest(".featured-card");
        const productData = parentCard.getAttribute("data-product");

        // Open and populate the modal
        openProductModal(productData);
    });
});
