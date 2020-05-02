var virus = [1, 1, 1, 1, 1];
var cases = ["myC0", "myC1", "myC2", "myC3", "myC4"]

// suitcase filling block
var virV = 5;
var virH = 7;
var x0 = 20;
var y0 = 40;
var virWidth = 25;
var virHeight = 25;
// -----------------------

var anti = new Image(114, 160);
anti.src = 'image/anti.png';

var viruspic1 = new Image(virWidth, virHeight);
viruspic1.src = 'image/covid_green.png';
var viruspic2 = new Image(virWidth, virHeight);
viruspic2.src = 'image/covid_red.png';

var audio = new Audio('sound/spray.mp3');

function init()
{
    drawField();
}

async function selectCase(sender, iter)
{
    var c = document.getElementById(sender.id);
    var ctx = c.getContext("2d");
        
    ctx.drawImage(anti, 50, 40);
    audio.play();
    await sleep(500);
    ctx.clearRect(0, 0, c.width, c.height);
    await sleep(300);
    
    virus[iter] = 0;
    enemyTurn();
    drawField();
    
    var sum = 0;
    for (var i = 0; i < 5; i++) sum += virus[i];
    document.getElementById("counter").innerHTML = sum;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function enemyTurn()
{
    var deltaVirus = [0, 0, 0, 0, 0];
    
    for (var i = 0; i < 5; i++) {
        if (virus[i] == 0) continue;
        
        deltaVirus[i] -= virus[i];
        
        if (i > 0) deltaVirus[i-1] += virus[i];
        if (i < 4) deltaVirus[i+1] += virus[i];
    }
    
    for (var i = 0; i < 5; i++) virus[i] += deltaVirus[i];
}

function drawField()
{
    for (var i = 0; i < 5; i++) {
        var c = document.getElementById(cases[i]);
        drawVirus(c, virus[i]);
    }
}

function drawVirus(canv, value)
{
    var ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);
    
    var available_positions = [];
    for (var i = 0; i < virV*virH; i++) available_positions[i] = i;
    
    for (var i = 0; i < value; i++) {
        if (rndInt(2)) pic = viruspic1;
        else pic = viruspic2;
        
        var newpos = rndInt(virV*virH-i);
        var new_i = ~~(available_positions[newpos]/virV);
        var new_j = available_positions[newpos]%virV;
                
        var newX = x0 + new_i*virWidth;
        var newY = y0 + new_j*virHeight;
        available_positions.splice(newpos, 1);
        
        ctx.drawImage(pic, newX, newY);    
    }
}

function rndInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}














