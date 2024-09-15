(function() {
    var sP = false;

    try {
        var o = Object.defineProperty({}, 'passive', {
            get: function() { sP = true; }
        });
        window.addEventListener("test", null, o);
    } catch (e) {}

    var yS = 0, pD = false;

    function pTR(e) {
        if (pD && e.cancelable) {
            e.preventDefault();
        }
    }

    document.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            yS = e.touches[0].clientY;
            pD = window.pageYOffset === 0;
        }
    }, sP ? { passive: true } : false);

    document.addEventListener('touchmove', function(e) {
        var cY = e.touches[0].clientY;
        if (pD && cY > yS) {
            pTR(e);
        }
    }, sP ? { passive: false } : false);

    document.addEventListener('touchend', function() {
        pD = false;
    });
})();
