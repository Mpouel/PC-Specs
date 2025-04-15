const ul = document.querySelector("ul");

const specs = {
    "User Agent": navigator.userAgent,
    "Platform": navigator.platform,
    "CPU Threads": navigator.hardwareConcurrency + " cores",
    "RAM (approx)": navigator.deviceMemory + " GB"
};

for (const [key, value] of Object.entries(specs)) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    ul.appendChild(li);
}
