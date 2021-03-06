//https://teachablemachine.withgoogle.com/models/mZNU3AD2n/
var prediction1 = "";
var prediction2 = "";
Webcam.set({
  width: 350,
  height:300,
  image_format: 'png',
  png_quality:100
});
var camera = document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
  Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img src="+data_uri+" id='captured_image'>";
  });
}
console.log("ml5 version",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mZNU3AD2n/model.json',modelLoaded);
function modelLoaded(){
  console.log("model has been loaded");
}
function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "The first Prediction is "+ prediction1;
  speak_data_2 = "The second Prediction is "+ prediction2;
  var utter_this = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
  synth.speak(utter_this);
}
function check(){
    var img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error, result){
      if (error){
          console.error(error);
      }
      else{
          console.log(result);
      }
      document.getElementById("result_emotion_name").innerHTML = result[0].label;
      document.getElementById("result_emotion_name2").innerHTML = result[1].label;
      prediction1 = result[0].label;
      prediction2 = result[1].label;
      speak();
      if (result[0].label == "Happy")
      {
          document.getElementById("update_emoji").innerHTML = "&#128522;";
      }
      if (result[0].label == "Sad")
      {
          document.getElementById("update_emoji").innerHTML = "&#128532;";
      }
      if (result[0].label == "Scared")
      {
          document.getElementById("update_emoji").innerHTML = "&#128561;";
      }
      if (result[1].label == "Happy")
      {
          document.getElementById("update_emoji2").innerHTML = "&#128522;";
      }
      if (result[1].label == "Sad")
      {
          document.getElementById("update_emoji2").innerHTML = "&#128532;";
      }
      if (result[1].label == "Scared")
      {
          document.getElementById("update_emoji2").innerHTML = "&#128561;";
      }
}

