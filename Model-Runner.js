let model, webcam, predictionCallback;

// This function sets up the model trained in Teachable Machine.
// it takes in the URL to the model, and a function to be run
// each time the model makes a new prediction.
export async function setupModel(URL, predictionCB) {
    //store the prediction callback function
    predictionCallback = predictionCB;
    // the model.json file stores a reference to the trained model
    const modelURL = `${URL}model.json`;
    // the metatadata.json file contains the text labels of your model and additional information
    const metadataURL = `${URL}metadata.json`;

    // Load the model using the tmImage library
    model = await window.tmImage.load(modelURL, metadataURL);

    // this function from the tmImage library returns a video element that
    // shows a video feed from the webcam
    webcam = new window.tmImage.Webcam(200, 200, true); //width, height, flipped
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    // add the video element to the page
    document.getElementById('webcam-wrapper').appendChild(webcam.canvas);

    // kick off the model prediction loop
    window.requestAnimationFrame(loop);
}

// This function will run forever in a loop
async function loop() {
    // update the webcam frame
    webcam.update();
    // make a prediction using the model
    await predict();
    // then call loop again
    window.requestAnimationFrame(loop);
}

// This function uses the model we loaded to make a prediction on the webcam data
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    // Call the prediction callback function now that we have new prediction data
    predictionCallback(prediction);
}
