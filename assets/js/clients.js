async function loadClients() {
    const clientGrid = document.getElementById('client-grid');
    if (!clientGrid) return;

    try {
        const response = await fetch('assets/clients.json');
        if (!response.ok) throw new Error('Failed to load clients: ' + response.status);
        const clients = await response.json();

        if (!clients.length) {
            clientGrid.innerHTML = '<p class="text-gray-400 p-12 text-center col-span-full">No client data available.</p>';
            return;
        }

        clientGrid.innerHTML = clients.map(client => `
            <div class="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-teal-500/30 transition-all duration-500 flex items-center justify-center w-full">
                <img
                    src="${client.logo}"
                    alt="${client.name}"
                    loading="lazy"
                    class="max-h-10 w-auto transition-all duration-500 transform group-hover:scale-110"
                >
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading client data:', error);
        clientGrid.innerHTML = '<p class="text-gray-400 p-12 text-center col-span-full">Technical portfolio is currently synchronizing…</p>';
    }
}

loadClients();