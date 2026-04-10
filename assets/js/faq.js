async function loadFAQs() {
    const container = document.getElementById('faq-container');
    
    try {
        const response = await fetch('assets/faq.json');
        const faqs = await response.json();

        container.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item group border border-gray-100 rounded-2xl p-6 hover:border-teal-500/30 transition-all duration-300 cursor-pointer bg-gray-50/30">
                <div class="flex justify-between items-center" onclick="toggleFAQ(${index})">
                    <h4 class="font-bold text-gray-900 pr-8">${faq.question}</h4>
                    <span id="icon-${index}" class="text-teal-500 font-light text-2xl transition-transform duration-300">+</span>
                </div>
                <div id="answer-${index}" class="hidden mt-4 text-gray-500 leading-relaxed text-sm border-t border-gray-100 pt-4">
                    ${faq.answer}
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("FAQ Sync Error:", error);
        container.innerHTML = `<p class="text-center text-red-400">Unable to load inquiries. Please contact support.</p>`;
    }
}

function toggleFAQ(index) {
    const answer = document.getElementById(`answer-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    
    // Toggle hidden class
    const isHidden = answer.classList.contains('hidden');
    
    // Close all other FAQs first for a clean accordion look
    document.querySelectorAll('[id^="answer-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="icon-"]').forEach(el => el.style.transform = 'rotate(0deg)');

    if (isHidden) {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(45deg)'; // Changes + to x
    }
}

loadFAQs();