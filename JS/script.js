// Full JavaScript code

// References to elements
const canvas = document.getElementById("mapCanvas");
const context = canvas.getContext("2d");
const layerNameInput = document.getElementById("layerNameInput");
const layerHrefInput = document.getElementById("layerHrefInput"); // New input for the href
const saveLayerButton = document.getElementById("saveLayerButton");
const coordsOutput = document.getElementById("coordsOutput");
const layerLog = document.getElementById("layerLog");
const notification = document.getElementById("notification");
const imageUpload = document.getElementById("imageUpload");

let currentCoordinates = [];
let layers = [];
let mapImage = new Image();
let colorIndex = 0;
const colors = ["red", "blue", "green", "orange", "purple", "brown"];

mapImage.src = "IMG/CENTCOM AOR.png";
mapImage.onload = () => drawImageOnCanvas(mapImage);

function adjustCanvasSize(width, height) {
    canvas.width = width;
    canvas.height = height;
}

function drawImageOnCanvas(image) {
    adjustCanvasSize(image.naturalWidth, image.naturalHeight);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    redrawAllMarkers();
}

imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            mapImage = new Image();
            mapImage.onload = () => {
                drawImageOnCanvas(mapImage);
                currentCoordinates = [];
                layers = [];
                coordsOutput.value = '';
                layerLog.innerHTML = '<h2>Layers Log</h2>';
            };
            mapImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    currentCoordinates.push({ x, y });
    updateCoordinatesOutput();

    context.fillStyle = colors[colorIndex % colors.length];
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.fill();
});

function updateCoordinatesOutput() {
    const coordsText = currentCoordinates.map(coord => `${coord.x},${coord.y}`).join(", ");
    coordsOutput.value = coordsText;
}

saveLayerButton.addEventListener("click", saveLayer);
function saveLayer() {
    const layerName = layerNameInput.value.trim();
    const layerHref = layerHrefInput.value.trim() || "#";
    if (!layerName || currentCoordinates.length === 0) {
        showNotification("Please enter a layer name and add coordinates.");
        return;
    }

    layers.push({
        name: layerName,
        href: layerHref,
        coordinates: [...currentCoordinates],
        color: colors[colorIndex % colors.length]
    });

    updateLayerLog();
    currentCoordinates = [];
    layerNameInput.value = '';
    layerHrefInput.value = '';
    coordsOutput.value = '';
    colorIndex++;
    showNotification("Layer saved successfully!");
}

/**
 * Generates the full HTML <area> code for a specific layer and copies it to the clipboard.
 * @param {number} index - The index of the layer in the layers array.
 */
function copyLayerCode(index) {
    const layer = layers[index];
    const coordsText = layer.coordinates.map(coord => `${coord.x},${coord.y}`).join(", ");
    const layerId = `region-${layer.name.replace(/\s+/g, '-').toLowerCase()}`;

    const areaCode = `<area shape="poly" coords="${coordsText}" href="${layer.href}" alt="${layer.name}" target="_blank" id="${layerId}">`;

    navigator.clipboard.writeText(areaCode)
        .then(() => showNotification("HTML <area> code copied to clipboard!"))
        .catch(err => console.error("Failed to copy code:", err));
}

function updateLayerLog() {
    layerLog.innerHTML = '<h2>Layers Log</h2>';
    layers.forEach((layer, index) => {
        const layerDiv = document.createElement("div");
        layerDiv.className = "layer-item";

        const layerName = document.createElement("div");
        layerName.className = "layer-name";
        layerName.textContent = `Layer: ${layer.name} (Color: ${layer.color})`;

        const layerButtons = document.createElement("div");
        layerButtons.className = "layer-buttons";

        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy Coordinates";
        copyButton.onclick = () => copyLayerCoordinates(index);

        const copyCodeButton = document.createElement("button");
        copyCodeButton.textContent = "Copy Code";
        copyCodeButton.onclick = () => copyLayerCode(index);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit Layer";
        editButton.onclick = () => editLayer(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Layer";
        deleteButton.onclick = () => deleteLayer(index);

        layerButtons.append(copyButton, copyCodeButton, editButton, deleteButton);
        layerDiv.append(layerName, layerButtons);
        layerLog.appendChild(layerDiv);
    });
}

function copyLayerCoordinates(index) {
    const coordsText = layers[index].coordinates.map(coord => `${coord.x},${coord.y}`).join(", ");
    navigator.clipboard.writeText(coordsText)
        .then(() => showNotification("Coordinates copied to clipboard!"))
        .catch(err => console.error("Failed to copy coordinates:", err));
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 3000);
}
