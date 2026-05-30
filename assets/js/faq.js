async function loadFAQs() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    try {
        const response = await fetch('assets/faq.json');
        if (!response.ok) throw new Error('Failed to load FAQs: ' + response.status);
        const faqs = await response.json();

        if (!faqs.length) {
            container.innerHTML = '<p class="text-center text-gray-400">No FAQs available at this time.</p>';
            return;
        }

        container.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item group border border-gray-100 rounded-2xl p-6 hover:border-teal-500/30 transition-all duration-300 cursor-pointer bg-gray-50/30">
                <div class="flex justify-between items-center" onclick="toggleFAQ(${index})">
                    <h4 class="font-bold text-gray-900 pr-8">${faq.question}</h4>
                    <span id="icon-${index}" class="text-teal-500 font-light text-2xl transition-transform duration-300 select-none">+</span>
                </div>
                <div id="answer-${index}" class="hidden mt-4 text-gray-500 leading-relaxed text-sm border-t border-gray-100 pt-4">
                    ${faq.answer}
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('FAQ Sync Error:', error);
        container.innerHTML = '<p class="text-center text-red-400">Unable to load FAQs. Please contact support.</p>';
    }
}

function toggleFAQ(index) {
    const answer = document.getElementById(`answer-${index}`);
    const icon   = document.getElementById(`icon-${index}`);
    if (!answer || !icon) return;

    const isHidden = answer.classList.contains('hidden');

    // Close all open FAQs (accordion behaviour)
    document.querySelectorAll('[id^="answer-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="icon-"]').forEach(el => {
        el.style.transform = 'rotate(0deg)';
        el.textContent = '+';
    });

    if (isHidden) {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(45deg)'; // + becomes ×
    }
}

loadFAQs();