var canvas=document.getElementById("slideshow");
//alert('canvas made');
var context = canvas.getContext("2d");
var newPic=new Image();
newPic.src="Pic/Trixie_1.jpg";


var img;
var caption;
var index=0;
var max;
var min=0;
var int_ID;
var gA=0;
var width = 500;
var height = 667;
var scalar=0.6;
var shift=width;

var xhr= new XMLHttpRequest();

newPic.onload=function (){
    context.drawImage(newPic, 0, 0,500,667);
}

xhr.onload=function(){

    if(xhr.status===200){
        responseObject=JSON.parse(xhr.responseText);
        var length=responseObject.picture.length;
        img=new Array(length);
        caption=new Array(length);
        max=length-1;
        for(var i=0; i<length; i++){
            img[i]= new Image(); 
            img[i].src=responseObject.picture[i].src;
            caption[i]=responseObject.picture[i].text;
          
        }
        context.font='30px serif';
        context.fillStyle="white";
        context.drawImage(img[0], 0, 0, width, height);
        context.fillRect(8, 625, 482, 35);
        context.fillStyle=("black");
        context.fillText(caption[0], 10, 650);
    }
    
};

xhr.open('GET', 'pics.json', true);
xhr.send(null);


function nextpic(){

    if(document.getElementById("seq").checked){

        var next;
        transitionType();

        if(index==max){
        index=min;
        next=index;
    }else{
        next=index+1;
        index++;
    }

    drawMe(next);

    }else{
        alert("Please select Sequential or press Start, Next and Previous do not work in Random mode");
    }
}

function drawMe(nextt){
    context.fillStyle="white";
    context.drawImage(img[nextt], 0, 0, width, height);
    context.fillRect(8, 625, 482, 35);
    context.fillStyle=("black");
    context.fillText(caption[nextt], 10, 650);
}
function previouspic(){
    if(document.getElementById("seq").checked){
    var previous;
    transitionType();
    if(index==min){
        index=max;
        previous=max;
    }else{
        previous=index-1;
        index--;
    }
    drawMe(previous);
    }else{
        alert("Please select Sequential or press Start, Next and Previous do not work in Random mode");
    }
}

function startShow(){
    if(document.getElementById("rand").checked){
        int_ID=window.setInterval("nextRandom()", 3000);
    }else{
    int_ID=window.setInterval("nextpic()", 3000);
    }
}

function stopShow(){
    clearInterval(int_ID);
}

function nextRandom(){
    var num=Math.floor((Math.random() * max));

    transitionType();
    drawMe(num);
    index=num;
}

function fade(){
    //help with this function came from:
    //https://stackoverflow.com/questions/51179050/using-canvas-globalalpha-to-fade
    //http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

    gA += 0.05;

    console.log(gA);

    context.clearRect(0, 0, width, height);
    context.globalAlpha = gA;
    context.drawImage(img[index], 0, 0, width, height);

    if (gA >= 1){
        cancelAnimationFrame(fade);
        drawMe(index);
        gA=0;
    }
    else {
    requestAnimationFrame(fade);
    }

}

function scalePic(){
    scalar+=0.05;
    console.log(scalar);
    context.clearRect(0, 0, width, height);
    context.drawImage(img[index], 0, 0, width*scalar, height*scalar);

    if (scalar >= 1){
        cancelAnimationFrame(scalePic);
        scalar=0.6;
        drawMe(index);
    }
    else {
    requestAnimationFrame(scalePic);
    }

}

function swipePic(){
    shift-=50;
    console.log(swipe);
    context.clearRect(0, 0, width, height);
 //   context.translate(width+swipe, height+swipe);
    context.drawImage(img[index], -shift, 0, width, height);

    if (shift <= width/3){
        cancelAnimationFrame(swipePic);
  //      context.translate(0,0);
        shift=width;
        drawMe(index);
    }
    else {
    requestAnimationFrame(swipePic);
    }
}

function transitionType(){
    var choice=document.getElementById("tran").selectedIndex;
    if(choice=='1'){
        requestAnimationFrame(fade);
    }else if(choice=='2'){
        requestAnimationFrame(swipePic);
    }else if(choice=='3'){
        requestAnimationFrame(scalePic);

    }
}