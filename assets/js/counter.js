// Add this inside your existing DOMContentLoaded listener
const counter = document.getElementById('project-counter');
const target = parseInt(counter.getAttribute('data-target'));

const startCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let count = 0;
            const speed = 2000 / target; // Adjust 2000 to make it faster/slower

            const updateCount = () => {
                if (count < target) {
                    count++;
                    counter.innerText = count;
                    setTimeout(updateCount, speed);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(entry.target); // Only run once
        }
    });
};

const observer = new IntersectionObserver(startCounter, { threshold: 0.5 });
observer.observe(counter);