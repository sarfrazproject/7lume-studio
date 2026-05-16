// Add this inside your existing DOMContentLoaded listener

const startCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counterEl = entry.target;
            const target = parseInt(counterEl.getAttribute('data-target'));
            let count = 0;
            
            // Adjust 2000 (2 seconds) to change total animation duration
            const totalDuration = 2000; 
            const speed = totalDuration / target; 

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
            observer.unobserve(counterEl); // Stop observing once animated
        }
    });
};

const observer = new IntersectionObserver(startCounter, { threshold: 0.5 });

// Target both counters specifically by their IDs
const experienceCounter = document.getElementById('experience-counter');
const projectCounter = document.getElementById('project-counter');
const clientCounter = document.getElementById('client-counter');

if (experienceCounter) observer.observe(experienceCounter);
if (projectCounter) observer.observe(projectCounter);
if (clientCounter) observer.observe(clientCounter);