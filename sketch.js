let video;
let bodyPose;
let poses = [];
let connections;

function preload() {
  // use Thunder model for better accuracy
  bodyPose = ml5.bodyPose("MoveNet", { modelType: "SinglePose.Thunder" });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton(); // get skeleton structure
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  image(video, 0, 0);

  for (let i = 0; i < poses.length; i++) {
    let keypoints = poses[i].keypoints;

    // draw keypoints
    for (let kp of keypoints) {
      fill(0, 255, 0);
      noStroke();
      ellipse(kp.x, kp.y, 8, 8);
    }

    // draw skeleton connections
    for (let [a, b] of connections) {
      stroke(255, 0, 255);
      strokeWeight(2);
      line(keypoints[a].x, keypoints[a].y, keypoints[b].x, keypoints[b].y);
    }
  }
}
