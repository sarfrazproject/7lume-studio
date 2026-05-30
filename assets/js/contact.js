document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('form').forEach(form => {
        // Only handle forms that submit to Web3Forms
        if (!form.action.includes('web3forms.com')) return;

        // Create a reusable status message element beneath the form
        const statusMsg = document.createElement('p');
        statusMsg.className = 'mt-4 text-sm font-medium hidden';
        form.parentNode.insertBefore(statusMsg, form.nextSibling);

        const showStatus = (message, isSuccess) => {
            statusMsg.textContent = message;
            statusMsg.className = `mt-4 text-sm font-medium ${isSuccess ? 'text-teal-600' : 'text-red-500'}`;
            statusMsg.classList.remove('hidden');
            // Auto-hide after 6 seconds
            setTimeout(() => statusMsg.classList.add('hidden'), 6000);
        };

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const btn          = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText  = 'Sending…';
            btn.disabled   = true;
            statusMsg.classList.add('hidden');

            const formData = new FormData(form);
            const json     = JSON.stringify(Object.fromEntries(formData));

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept':       'application/json'
                    },
                    body: json
                });

                const result = await response.json();

                if (response.ok) {
                    showStatus('✓ Message received — we\'ll be in touch within 24 hours.', true);
                    form.reset();
                } else {
                    showStatus('Error: ' + (result.message || 'Submission failed.'), false);
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showStatus('Submission failed. Please check your connection and try again.', false);
            } finally {
                btn.innerText = originalText;
                btn.disabled  = false;
            }
        });
    });

});