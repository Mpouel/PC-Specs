const ul = document.querySelector("ul");

async function getSpecs() {
    const specs = [];

    // Données navigateur
    specs.push({
        "User Agent": navigator.userAgent,
        "Platform": navigator.platform,
        "CPU Threads": navigator.hardwareConcurrency + " cores",
        "RAM (approx)": navigator.deviceMemory + " GB"
    });

    try {
        const response = await fetch('https://ipinfo.io/json?token=f7eff1da59344c');
        const data = await response.json();
        const code = data.country;

        const r = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const d = await r.json();
        const name = d[0]?.name?.common || code;
        const flagUrl = d[0]?.flags?.svg || d[0]?.flags?.png;

        specs.push({
            "IP": data.ip,
            "City": data.city,
            "Region": data.region,
            "Country code": code,
            "Country name": name
        });

        // Affichage du drapeau
        if (flagUrl) {
            const img = document.createElement("img");
            img.src = flagUrl;
            img.alt = `Flag of ${name}`;
            img.style.width = "80px";
            img.style.marginTop = "10px";
            ul.appendChild(img);
        }

    } catch (error) {
        console.error("Erreur lors de la récupération de l'IP ou du drapeau :", error);
    }

    // Affichage des infos
    specs.forEach(group => {
        for (const [key, value] of Object.entries(group)) {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            ul.appendChild(li);
        }
    });
}

getSpecs();
