// Theme/Color Mode Management
(function() {
    try {
        const setColorMode = function(mode) {
            const prefersDark = "(prefers-color-scheme: dark)";
            const systemMode = window.matchMedia(prefersDark).matches ? "dark" : "light";
            const resolvedMode = mode === "system" ? systemMode : mode;
            const root = document.documentElement;
            const body = document.body;
            const lightClass = "chakra-ui-light";
            const darkClass = "chakra-ui-dark";
            const isDark = resolvedMode === "dark";
            
            body.classList.add(isDark ? darkClass : lightClass);
            body.classList.remove(isDark ? lightClass : darkClass);
            root.style.colorScheme = resolvedMode;
            root.dataset.theme = resolvedMode;
            
            return resolvedMode;
        };
        
        const defaultMode = "light";
        const storageKey = "chakra-ui-color-mode";
        const storedMode = localStorage.getItem(storageKey);
        
        if (storedMode) {
            setColorMode(storedMode);
        } else {
            localStorage.setItem(storageKey, setColorMode(defaultMode));
        }
    } catch (e) {
        console.error("Color mode initialization error:", e);
    }
})();

// Mobile Menu Toggle - Working version
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.chakra-menu__menu-button');
    const menuWrapper = document.querySelector('.css-r6z5ec');
    const menuList = document.querySelector('.chakra-menu__menu-list');
    
    if (menuButton && menuWrapper && menuList) {
        // Toggle menu on button click
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isShown = menuList.classList.contains('show');
            
            if (isShown) {
                menuWrapper.classList.remove('show');
                menuList.classList.remove('show');
                menuButton.setAttribute('aria-expanded', 'false');
            } else {
                menuWrapper.classList.add('show');
                menuList.classList.add('show');
                menuButton.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuWrapper.contains(e.target) && !menuButton.contains(e.target)) {
                menuWrapper.classList.remove('show');
                menuList.classList.remove('show');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on any link inside the menu
        const menuLinks = menuList.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuWrapper.classList.remove('show');
                menuList.classList.remove('show');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
});