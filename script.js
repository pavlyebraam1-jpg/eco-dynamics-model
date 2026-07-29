// Load Teachable Machine model
const URL = "./";

let model;

async function loadModel() {
    model = await tmImage.load(
        URL + "model.json",
        URL + "metadata.json"
    );
}

loadModel();

async function predict(image) {

    const prediction = await model.predict(image);

    let bestPrediction = prediction[0];

    for (let i = 1; i < prediction.length; i++) {
        if (prediction[i].probability > bestPrediction.probability) {
            bestPrediction = prediction[i];
        }
    }

    const material = bestPrediction.className;

    document.getElementById("materialType").innerText = material;

    const recyclableMaterials = [
        "Cardboard",
        "Paper",
        "Glass",
        "Aluminum",
        "Steel",
        "Plastic Bottle",
        "Plastic Container"
    ];

    if (recyclableMaterials.includes(material)) {

        document.getElementById("resultImage").src = "final recyclable screen.png";

        document.getElementById("recyclingCategory").innerText = "Recyclable";

    } else {

        document.getElementById("resultImage").src = "final non recyclable screen.png";

        document.getElementById("recyclingCategory").innerText = "Non-Recyclable";

    }
}
