async function loadClients() {
    const clientGrid = document.getElementById('client-grid');
    
    try {
        const response = await fetch('assets/clients.json'); 
        const clients = await response.json();

        clientGrid.innerHTML = clients.map(client => {
            return `
                <div class="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-teal-500/30 transition-all duration-500 flex items-center justify-center w-full">
                    <div class="flex items-center justify-center">
                        <img src="${client.logo}" alt="${client.name}" 
                            class="max-h-10 w-auto transition-all duration-500 transform group-hover:scale-110">
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Error loading client data:", error);
        clientGrid.innerHTML = `<p class="text-gray-400 p-12 text-center col-span-full">Technical portfolio is currently synchronizing...</p>`;
    }
}
loadClients();