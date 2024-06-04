(function () {
    const startTime = new Date()
    function showTime() {
        const loadTime = new Date() - startTime
        const footerLoadTime = document.getElementsByClassName("footer__load-time")[0]
        footerLoadTime.textContent = `Страница загружена за ${loadTime} мс`
        console.log(loadTime)
    }
    window.addEventListener("load", showTime)
})();

document.addEventListener("DOMContentLoaded", function () {


    const currentPagePath = window.location.pathname;

    const menuLinks = document.querySelectorAll('.header__menu-link');

    menuLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPagePath) {
            link.classList.add('active-page');
        }
    });

    const emojis = ['🐡', '🐠', '🐟', '🎣', '🛶', '🐬', '🐳', '🦞', '🦐', '🪱', '🪰', '🦟', '🎏'];
    const emoji = document.querySelector('.emoji');
    console.log(emoji)
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.textContent = randomEmoji;

    function changeEmoji() {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.textContent = randomEmoji;
    }

    emoji.addEventListener('mouseover', changeEmoji);
});

