async function loadClients() {
    const clientGrid = document.getElementById('client-grid');
    
    try {
        const response = await fetch('assets/clients.json'); 
        const clients = await response.json();

        clientGrid.innerHTML = clients.map(client => {
            return `
                <div class="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-teal-500/30 transition-all duration-500 flex flex-col items-center text-center w-full max-w-[280px]">
                    
                    <div class="h-12 w-full flex items-center justify-center mb-4">
                        <img src="${client.logo}" alt="${client.name}" 
                            class="max-h-8 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                    </div>

                    <h3 class="text-[11px] font-black text-gray-900 uppercase tracking-wider mb-2">
                        ${client.name}
                    </h3>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Error loading client data:", error);
        clientGrid.innerHTML = `<p class="text-gray-400 p-12 text-center col-span-full">Technical portfolio is currently synchronizing...</p>`;
    }
}
loadClients();