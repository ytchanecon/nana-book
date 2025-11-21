// Fix duplicate THEBE_JS_URL declaration error
// Wrap in immediate execution to catch errors globally
(function() {
    'use strict';
    // Suppress duplicate const declaration errors for THEBE_JS_URL
    window.addEventListener('error', function(e) {
        if (e.message && e.message.includes('THEBE_JS_URL') && e.message.includes('already been declared')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);
    
    // Also try to catch during script evaluation
    const originalError = window.onerror;
    window.onerror = function(msg, url, line, col, error) {
        if (msg && typeof msg === 'string' && msg.includes('THEBE_JS_URL') && msg.includes('already been declared')) {
            return true; // Suppress the error
        }
        if (originalError) {
            return originalError.apply(this, arguments);
        }
        return false;
    };
})();

// Add colorful themes for each lecture
document.addEventListener('DOMContentLoaded', function() {
    // Check page title for lecture number
    const pageTitle = document.title;
    
    // Map Chinese numbers to digits
    const chineseToDigit = {
        '一': '1',
        '二': '2',
        '三': '3',
        '四': '4',
        '五': '5',
        '六': '6',
        '七': '7',
        '八': '8'
    };
    
    // Try to find lecture number in title (e.g., "第一讲" or "第1讲")
    const chineseMatch = pageTitle.match(/第([一二三四五六七八])讲/);
    const digitMatch = pageTitle.match(/第(\d)讲/);
    
    let lectureNumber = null;
    
    if (chineseMatch && chineseToDigit[chineseMatch[1]]) {
        lectureNumber = chineseToDigit[chineseMatch[1]];
    } else if (digitMatch) {
        lectureNumber = digitMatch[1];
    }
    
    if (lectureNumber && document.body) {
        document.body.classList.add(`lecture-${lectureNumber}`);
        console.log('Applied lecture theme:', `lecture${lectureNumber}`);
        
        // Also apply colors directly to ensure they work
        const colors = {
            '1': '#2c5aa0',
            '2': '#2d8b57',
            '3': '#d97706',
            '4': '#7c3aed',
            '5': '#0d9488',
            '6': '#dc2626',
            '7': '#4338ca',
            '8': '#be185d'
        };
        
        const color = colors[lectureNumber];
        if (color) {
            // Apply color to all h1 and h2 elements
            document.querySelectorAll('h1, h2').forEach(heading => {
                heading.style.color = color;
                heading.style.borderBottomColor = color;
            });
            console.log('Applied color directly:', color);
        }
    } else {
        console.log('No lecture number found or body not ready');
    }
});
