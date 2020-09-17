
Sound = "";
leftWristX = 0;
rightWristX = 0;                  
leftWristY = 0;
rightWristY = 0;     
scoreleft = 0; 

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

    stroke(0 , 0 , 255);
    fill(0,  0 , 255);

    if(scoreleft > 0.2) {
        circle(leftWristX , leftWristY , 20);
        leftWristYNUMBER = Number(leftWristY);
        remove_decimal = floor(leftWristYNUMBER);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
        Sound.setVolume(volume);
    }
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
       scoreleft = results[0].pose.keypoints[9].score;

       console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);
       console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
       console.log("score = "+scoreleft);
    }
}