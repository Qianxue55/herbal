// filter.js

document.addEventListener("DOMContentLoaded", function() {
    // Get all the plant options buttons
    const plantOptions = document.querySelectorAll(".plant-option");

    // Add click event listener to each button
    plantOptions.forEach(function(button) {
        button.addEventListener("click", function() {
            // Remove 'active' class from all buttons
            plantOptions.forEach(function(btn) {
                btn.classList.remove("active");
            });

            // Add 'active' class to the clicked button
            button.classList.add("active");

            // Get the class name of the clicked button
            const filterClassName = button.textContent.toLowerCase();

            // Get all featured cards
            const featuredCards = document.querySelectorAll(".featured-card");

            // Loop through each featured card
            featuredCards.forEach(function(card) {
                if (filterClassName === "all") {
                    // Show all cards for "All" filter
                    card.style.display = "block";
                } else {
                    // Check if the card contains the selected class name
                    const cardClassName = card.classList.contains(filterClassName);
                    if (filterClassName === "new arrival") {
                        const isNewArrival = card.classList.contains("new-arrival");
                        if (isNewArrival) {
                            card.style.display = "block";
                        } else {
                            card.style.display = "none";
                        }
                    } else if (filterClassName === "popular") {
                        const isPopular = card.classList.contains("popular");
                        if (isPopular) {
                            card.style.display = "block";
                        } else {
                            card.style.display = "none";
                        }
                    } else {
                        if (cardClassName) {
                            card.style.display = "block"; // Show the card
                        } else {
                            card.style.display = "none"; // Hide the card
                        }
                    }
                }
            });

            // Add 'active' class to "All", "New Arrival", and "Popular" buttons
            if (filterClassName === "all" || filterClassName === "new arrival" || filterClassName === "popular") {
                button.classList.add("active");
            }
        });
    });
});
