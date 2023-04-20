song="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;


function preload()
{
    song_peter_pan=loadSound("music.mp3");
    song_harry_porter=loadSound("music2.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
	poseNet.on("pose", gotPoses);
}

function stop()
{
   song.stop()
}

function modelLoaded()
{
	console.log("poseNet is initialized");

}

function draw()
{
    image(video,0,0,600,500);
	
	fill("#FF0000");
	stroke("#FF0000");

    song =  song_peter_pan.isPlaying();

     if(scoreleftWrist > 0.2)
     {
         circle(leftWristX, leftWristY, 20);
         
         song_harry_porter.stop();
         if(status == false)
            song_peter_pan.play();
            document.getElementById("song_name").innerHTML = "Peter Pan";
     }
     

     if(scorerightWrist > 0.2)
     {
         circle(rightWristX, rightWristY, 20);
       
         song_peter_pan.stop();
         if(status == false)
            song_harry_porter.play();
            document.getElementById("song_name").innerHTML = "Harry Porter";
     }

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
       
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
		console.log("scoreleftWrist = " + scoreleftWrist );        
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
		console.log("scorerightWrist = " + scorerightWrist );
    }
}

