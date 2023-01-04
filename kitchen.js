console.log("Kitchen JS Loaded");

function go_back() {
    window.location = "home.html";
}

function preload() {
    img_kitchen = loadImage("Kitchen.jpg");
    console.log(img_kitchen + "Kitchen.JS");
}

function setup() {
    canvas = createCanvas(320, 500);
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_displayer").innerHTML = "Status : DETECTING OBJECTS";
}

function modelLoaded() {
    console.log("MODEL LOADED");
    status = true;
    objectdetector.detect(img_kitchen, gotresult);
}

function gotresult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}

function draw() {
    image(img_kitchen, 0, 0, 320, 500);
    if (status != "") {
        for (i = 0; i < objects.lenght; i++) {
            document.getElementById("status").innerHTML = "STATUS : OBJECT DETECTED";
            fill("#9593c1");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects.y + 15);
            noFill();
            stroke("#0a3f32");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}