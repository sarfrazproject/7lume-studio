document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Only target forms that go to Web3Forms
        if (form.action.includes('web3forms.com')) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault(); // This is what stops the redirect!
                
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                
                btn.innerText = "Sending...";
                btn.disabled = true;

                const formData = new FormData(form);
                const object = Object.fromEntries(formData);
                const json = JSON.stringify(object);

                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: json
                    });

                    const result = await response.json();
                    
                    if (response.status === 200) {
                        alert("Success! 7LumeStudio has received your details.");
                        form.reset();
                    } else {
                        alert("Error: " + result.message);
                    }
                } catch (error) {
                    alert("Submission failed. Please check your connection.");
                } finally {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            });
        }
    });
});