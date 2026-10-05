/* assets/js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navClose = document.getElementById('navClose');
    const mainNav = document.getElementById('mainNav');
    const navOverlay = document.getElementById('navOverlay');

    function setMenu(open) {
        mainNav.classList.toggle('open', open);
        navOverlay.classList.toggle('open', open);
        document.body.classList.toggle('nav-locked', open);
        hamburger.setAttribute('aria-expanded', open);
    }

    if (hamburger && navClose && navOverlay && mainNav) {
        hamburger.addEventListener('click', () => setMenu(true));
        navClose.addEventListener('click', () => setMenu(false));
        navOverlay.addEventListener('click', () => setMenu(false));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) setMenu(false);
        });
    }

    // 2. Header background on scroll
    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // 3. Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-in'));
    }

    // 4. Affiliate Link Click Tracking
    // Format: <a href="..." data-affiliate="true" data-product-id="..." data-merchant="..." data-placement="...">
    document.body.addEventListener('click', (e) => {
        const affiliateLink = e.target.closest('a[data-affiliate="true"]');
        if (affiliateLink) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'affiliate_click',
                product_id: affiliateLink.getAttribute('data-product-id') || 'unknown',
                merchant: affiliateLink.getAttribute('data-merchant') || 'unknown',
                placement: affiliateLink.getAttribute('data-placement') || 'unknown',
                url: affiliateLink.href
            });
        }
    });

    // 5. Newsletter Validation
    const nlForm = document.getElementById('newsletterForm');
    if (nlForm) {
        nlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('nlEmail');
            const msg = nlForm.querySelector('.form-msg');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email.value || !emailRegex.test(email.value)) {
                email.classList.add('error');
                email.classList.remove('success');
                msg.textContent = 'Please enter a valid email address.';
                msg.className = 'form-msg error';
            } else {
                email.classList.remove('error');
                email.classList.add('success');
                msg.textContent = 'Subscribed successfully!';
                msg.className = 'form-msg success';
                nlForm.reset();
                setTimeout(() => { email.classList.remove('success'); msg.textContent = ''; }, 3000);
            }
        });
    }

    // Back to top
    const toTop = document.createElement('button');
    toTop.type = 'button';
    toTop.className = 'back-to-top';
    toTop.setAttribute('aria-label', 'Back to top');
    toTop.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(toTop);

    const toggleToTop = () => toTop.classList.toggle('is-visible', window.scrollY > 600);
    toggleToTop();
    window.addEventListener('scroll', toggleToTop, { passive: true });
    toTop.addEventListener('click', () => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
});
