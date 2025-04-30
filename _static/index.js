// Add keyboard support for dropdown menus
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButtons = document.querySelectorAll('.dropbtn');
    
    dropdownButtons.forEach(button => {
        // Handle Enter and Space key presses
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(this);
            }
        });
        
        // Handle click events
        button.addEventListener('click', function() {
            toggleDropdown(this);
        });
    });
    
    // Close dropdowns when Escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn')) {
            closeAllDropdowns();
        }
    });
    
    // Toggle dropdown function
    function toggleDropdown(button) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        closeAllDropdowns();
        
        if (!isExpanded) {
            button.setAttribute('aria-expanded', 'true');
            const dropdownContent = button.nextElementSibling;
            dropdownContent.style.display = 'block';
        }
    }
    
    // Close all dropdowns
    function closeAllDropdowns() {
        dropdownButtons.forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
            const dropdownContent = btn.nextElementSibling;
            dropdownContent.style.display = 'none';
        });
    }
});

// Search functionality
window.addEventListener('DOMContentLoaded', (event) => {
    // Create search input and container
    const searchContainer = document.getElementById('nav-search-container');
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = "frontpage-search";
    searchInput.placeholder = 'Search...';
    searchInput.className = 'pagefind-ui__search-input';
    searchContainer.appendChild(searchInput);
    
    // Create clear button
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.className = 'search-clear-button';
    clearButton.innerHTML = '<i class="fas fa-times"></i>';
    clearButton.style.display = 'none';
    searchContainer.appendChild(clearButton);
    
    // Show/hide clear button based on input content
    searchInput.addEventListener('input', () => {
        clearButton.style.display = searchInput.value.length > 0 ? 'flex' : 'none';
    });
    
    // Clear search when button is clicked
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        clearButton.style.display = 'none';
        instance.triggerSearch('');
        resultsContainer.style.display = 'none';
        searchInput.focus(); // Re-focus the search box after clearing
    });
    
    // Create search results container
    const resultsContainer = document.getElementById('nav-search-results');
    
    // Initialize PagefindModularUI
    const instance = new PagefindModularUI.Instance({
        showSubResults: true,
        showImages: false,
        resetStyles: true,
        ranking: {
            pageLength: 0.0,
            termSaturation: 1.6,
            termFrequency: 0.4,
            termSimilarity: 6.0
        }
    });
    
    // Add input component
    instance.add(new PagefindModularUI.Input({
        inputElement: "#frontpage-search"
    }));
    
    // Add results component
    instance.add(new PagefindModularUI.ResultList({
        containerElement: "#nav-search-results"
    }));
    
    // Show/hide results
    instance.on("results", (results) => {
        if (results.results.length) {
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    });
});
