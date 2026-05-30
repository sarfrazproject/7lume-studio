document.addEventListener('DOMContentLoaded', () => {

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counterEl   = entry.target;
            const target      = parseInt(counterEl.getAttribute('data-target'), 10);
            if (isNaN(target) || target <= 0) return;

            let count = 0;
            const totalDuration = 2000; // ms — adjust to taste
            const speed         = totalDuration / target;

            const updateCount = () => {
                if (count < target) {
                    count++;
                    counterEl.innerText = count;
                    setTimeout(updateCount, speed);
                } else {
                    counterEl.innerText = target;
                }
            };

            updateCount();
            observer.unobserve(counterEl);
        });
    };

    const observer = new IntersectionObserver(startCounter, { threshold: 0.5 });

    ['experience-counter', 'project-counter', 'client-counter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

});