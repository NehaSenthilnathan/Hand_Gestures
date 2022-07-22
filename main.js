Webcam.set({
    with:350,
    height:300,
    image_format: 'png',
    png_quality: '90'
})

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ab0gP6oOB/model.json', modelLoaded);

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if (error){
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = result[0].label;

        Talk = "";

        if (result[0].label == "Peace")
        {
            Talk = "Peace"
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
        }

        if (result[0].label == "Hi-Five")
        {
            Talk = "Give me a Five"
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9995;";
        }

        if (result[0].label == "Thumbs Up")
        {
            Talk = "Well Done"
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
        }

        if (result[0].label == "Super")
        {
            Talk = "Wow Super"
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
        }
     speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "Talk";
    var utterThis = newSpeechSynthesisUtterance (speak_data);
    synth.speak(utterThis);
}