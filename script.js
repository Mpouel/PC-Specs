const ul = document.querySelector("ul");

// Création d'une fonction asynchrone
async function getSpecs() {
    const specs = [];

    // Données navigateur
    specs.push({
        "User Agent": navigator.userAgent,
        "Platform": navigator.platform,
        "CPU Threads": navigator.hardwareConcurrency + " cores",
        "RAM (approx)": navigator.deviceMemory + " GB"
    });

    // Données IP
    try {
        const response = await fetch('https://ipinfo.io/json?token=f7eff1da59344c');
        const data = await response.json();
        specs.push({
            "IP": data.ip,
            "Ville": data.city,
            "Région": data.region,
            "Pays": data.country
        });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'IP :", error);
    }

    // Affichage dans le HTML
    specs.forEach(group => {
        for (const [key, value] of Object.entries(group)) {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            ul.appendChild(li);
        }
    });
}

// Appel de la fonction
getSpecs();
