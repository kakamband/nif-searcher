const BuildLottie = {
    error: '/assets/error.json',
    success: '/assets/success.json',
    download: '/assets/download.json',
    build(type) {
        const element = document.querySelector('div.axios-results div.lottie');

        lottie.loadAnimation({
            container: element, // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: this[type] // the path to the animation json
        }).setSpeed(1);
    }
}