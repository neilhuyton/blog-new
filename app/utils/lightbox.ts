export const lightbox = () => {
    if (typeof document !== "undefined") {
        const element = document.querySelector<HTMLElement>('.trig');
        if (element) {
            element.addEventListener('click', function (e) {
                e.preventDefault();

                const large = element.querySelector('.lightbox');
                if (!large) return;

                if (large.classList.contains('open')) {
                    return large.classList.remove('open');
                }

                large.classList.add('open');
            })
        }
    }
}
