// Fix spacing between Chinese text and math symbols when using Songti fonts
(function() {
    'use strict';
    
    function addSpacingBeforeMath() {
        // Find all math elements - both span.math and MathJax mjx-container
        const mathElements = document.querySelectorAll('span.math, .math, mjx-container');
        
        mathElements.forEach(function(mathEl) {
            // Check all previous siblings to see if there's a Chinese character before the math
            let prev = mathEl.previousSibling;
            let hasChineseBefore = false;
            let lastCharBeforeMath = '';
            let prevTextNode = null;
            
            // First, remove any space characters immediately before the math element
            // This prevents text justification from stretching those spaces
            if (prev && prev.nodeType === 3) { // Text node
                const text = prev.textContent || '';
                // Remove trailing spaces after Chinese characters before math
                const newText = text.replace(/([\u4e00-\u9fff，。！？；：])\s+$/g, '$1');
                if (newText !== text) {
                    prev.textContent = newText;
                }
                prevTextNode = prev;
                // Check if last character is Chinese
                const trimmed = newText.trim();
                if (trimmed.length > 0 && /[\u4e00-\u9fff]/.test(trimmed[trimmed.length - 1])) {
                    hasChineseBefore = true;
                    lastCharBeforeMath = trimmed[trimmed.length - 1];
                }
            }
            
            // Check all previous siblings (text nodes and elements)
            if (!hasChineseBefore) {
                while (prev) {
                    let text = '';
                    if (prev.nodeType === 3) { // Text node
                        text = prev.textContent || '';
                    } else if (prev.nodeType === 1) { // Element node
                        // For elements, get the last text content
                        text = prev.textContent || '';
                    }
                    
                    // Check if this sibling contains Chinese characters
                    if (text) {
                        // Get the last character before the math
                        const trimmed = text.trim();
                        if (trimmed.length > 0) {
                            lastCharBeforeMath = trimmed[trimmed.length - 1];
                        }
                        if (/[\u4e00-\u9fff]/.test(text)) {
                            hasChineseBefore = true;
                            break;
                        }
                    }
                    
                    prev = prev.previousSibling;
                }
            }
            
            // Check if the last character immediately before math is Chinese
            if (lastCharBeforeMath && /[\u4e00-\u9fff]/.test(lastCharBeforeMath)) {
                hasChineseBefore = true;
            }
            
            // Use minimal padding to prevent overlap without adding large spacing
            // Only add tiny spacing if Chinese character detected, otherwise no spacing
            if (hasChineseBefore) {
                mathEl.style.marginLeft = '0';
                mathEl.style.paddingLeft = '0.03em'; // Very minimal spacing just to prevent overlap
                mathEl.style.marginRight = '0';
                mathEl.style.paddingRight = '0';
            } else {
                mathEl.style.marginLeft = '0';
                mathEl.style.paddingLeft = '0';
                mathEl.style.marginRight = '0';
                mathEl.style.paddingRight = '0';
            }
            
            // Also check parent for word-spacing
            if (mathEl.parentElement) {
                mathEl.parentElement.style.wordSpacing = '0px';
            }
        });
        
        // Note: We no longer remove spaces from HTML as we want to add spacing
        // The CSS and inline styles above handle spacing properly
    }
    
    // Run immediately if DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addSpacingBeforeMath);
    } else {
        addSpacingBeforeMath();
    }
    
    // Run after delays for dynamically loaded content (MathJax, etc.)
    setTimeout(addSpacingBeforeMath, 100);
    setTimeout(addSpacingBeforeMath, 500);
    setTimeout(addSpacingBeforeMath, 1000);
    setTimeout(addSpacingBeforeMath, 2000);
    
    // Also run after MathJax finishes (if present)
    // Support both MathJax 2 and MathJax 3
    if (window.MathJax) {
        if (window.MathJax.Hub && window.MathJax.Hub.Queue) {
            // MathJax 2.x
            MathJax.Hub.Queue(function() {
                addSpacingBeforeMath();
            });
        } else if (window.MathJax.startup && window.MathJax.startup.promise) {
            // MathJax 3.x
            MathJax.startup.promise.then(function() {
                addSpacingBeforeMath();
            }).catch(function() {
                // If promise fails, just run after a delay
                setTimeout(addSpacingBeforeMath, 2000);
            });
        }
    }
    
    // Also listen for MathJax rendering events
    if (window.MathJax && window.MathJax.startup && window.MathJax.startup.document) {
        window.MathJax.startup.document.state().then(function() {
            addSpacingBeforeMath();
        });
    }
})();

