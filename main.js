
Sound = "";
leftWristX = 0;
rightWristX = 0;                  
leftWristY = 0;
rightWristY = 0;      

function preload() {
    Sound = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function draw() {
    image(video , 0 , 0 , 600 , 500);
}

function play() {
    Sound.play();
    Sound.setVolume(1);
    Sound.rate(1);
}

function modelLoaded() {
    console.log("poseNet is initialized");
}
function gotPoses(results) {
    if(results.length > 0) {
       console.log(results);

       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;

       console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);
       console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
    }
}