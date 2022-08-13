var ball_x, ball_y, ball_diameter, ball_dx, ball_dy;
var paddle_x, paddle_y, paddle_dx, paddle_width, paddle_height;
var bricks_width, bricks_height;
var score = 0, arrayy = [], arr, bonus_x, bonus_y, booster_x, booster_y, danger_x, danger_y, bricks_cnt;
var bricks_row_length, bricks_col_length, row_arr = [], margin_x;

function setup() {
  button = createButton("Play again");
  
  createCanvas(590, 600);
  background("black");
  frameRate(1000);
  
  ball_x = width/2+2;
  ball_y = height/2;
  ball_diameter = 25;
  ball_dx = 2;
  ball_dy = 3;
  //circle(ball_x, ball_y, ball_diameter);
  
  paddle_width = 80;
  paddle_height = 20;
  paddle_dx = 4;
  paddle_x = (width/2)-(paddle_width/2);
  paddle_y = height-20;
  
  //rect(paddle_x, paddle_y, paddle_width, paddle_height);
  
  bricks_width = 70;
  bricks_height = 20;
  bricks_row_length = 7;
  bricks_col_length = 7;
  margin_x = 10;

  // Creating 2d array
  for(let i=0;i<bricks_col_length;i++){
    let num = 2*margin_x+(bricks_width+margin_x)*i;
    row_arr.push(num);
  }
  
  arr = new Array(bricks_row_length);
  
  for(let i=0;i<bricks_row_length;i++){
    arr[i] = new Array(bricks_col_length);
  }
  
  for(let i=0;i<bricks_row_length;i++){
    for(let j=0;j<bricks_col_length;j++){
      arr[i][j] = row_arr[j];
    }
  }
  
  // arr = [[20, 100, 180, 260, 340, 420, 500]];
  // arrayy = [20, 50, 80, 110, 140];
  for(let i=0;i<bricks_row_length;i++){
    let num = 2*margin_x+(bricks_height+margin_x)*i;
    arrayy.push(num);
  }
  
  bonus_x = Math.floor(Math.random() * bricks_row_length);
  bonus_y = Math.floor(Math.random() * bricks_col_length );
  booster_x = Math.floor(Math.random() * bricks_row_length);
  booster_y = Math.floor(Math.random() * bricks_col_length );
  danger_x = Math.floor(Math.random() * bricks_row_length);
  danger_y = Math.floor(Math.random() * bricks_col_length );
  
  bricks_cnt = 0;
  score = 0;
} // change - 10ms

function draw(){
  background("rgb(118,116,116)");
  circle(ball_x, ball_y, ball_diameter);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  
  // bricks
  for(let i=0;i<bricks_row_length;i++){
    for(let j=0;j<bricks_col_length ;j++){
      if(i==bonus_x && j==bonus_y){
        if(i==booster_x && j==booster_y){
          fill("aqua");
          rect(arr[i][j], arrayy[i], bricks_width, bricks_height);
          fill("white");
        }
        else{
          fill("green");
          rect(arr[i][j], arrayy[i], bricks_width, bricks_height);
          fill("white");
        }
      }
      else if(i==booster_x && j==booster_y){
        fill("orange");
        rect(arr[i][j], arrayy[i], bricks_width, bricks_height);
        fill("white");
      }
      else if(i==danger_x && j==danger_y){
        fill("red");
        rect(arr[i][j], arrayy[i], bricks_width, bricks_height);
        fill("white");
      }
      else{
        rect(arr[i][j], arrayy[i], bricks_width, bricks_height);
      }
    }
  }
  
  // Score
  stroke("black");
  
  // Wall collision
  ball_x += ball_dx;
  ball_y -= ball_dy;
  if(ball_x + (ball_diameter/2) >= width){
    ball_dx *= -1;
  }
  if(ball_x - (ball_diameter/2) <= 0){
    ball_dx *= -1;
  }
   if(ball_y + (ball_diameter/2) >= height){
     // ball_dy *= -1;
     print("Game Over!");
     text("Game. Over!", width/2-30, height/2-10);
     text("Your score is " + score, width/2-35, height/2+10);
     // ball_diameter = 0;
     noLoop();
     
     button.position(width/2-30, height/2+30);
     button.mousePressed(playagain);
   }
  if(ball_y - (ball_diameter/2) <= 0){
    ball_dy *= -1;
  }
  
  // Paddle movement
  if(keyIsDown(RIGHT_ARROW) && paddle_x+paddle_dx <= (width-paddle_width)){
    paddle_x += paddle_dx;
  }
  if(keyIsDown(LEFT_ARROW) && paddle_x >= paddle_dx){
    paddle_x -= paddle_dx;
  }
  
  if(ball_x >= paddle_x && ball_x <= paddle_x+paddle_width && ball_y+(ball_diameter/2) >= height-paddle_height){
    ball_dy *= -1;
  }
  
  if(ball_y >= paddle_y && ball_y <= paddle_y+paddle_height && ((ball_x-(ball_diameter/2) <= paddle_x+paddle_width) || (ball_x+(ball_diameter/2) >= paddle_x))){
      ball_dx *= -1;
  }
  
  for(let i=0;i<bricks_row_length;i++){
    for(let j=0;j<bricks_col_length ;j++){
      if(ball_x+(ball_diameter/2) >= arr[i][j] && ball_x-
         (ball_diameter/2) <= arr[i][j]+bricks_width && ball_y+
         (ball_diameter/2) >= arrayy[i] && ball_y-
         (ball_diameter/2) <= arrayy[i]+bricks_height){
        if(ball_x >= arr[i][j] && ball_x <= arr[i][j]+bricks_width && (ball_y-(ball_diameter/2)) <= arrayy[i]+bricks_height){
          ball_dy *= -1;
        }
        else if(ball_y+(ball_diameter/2) >= arrayy[i] && ball_y-(ball_diameter/2) <= arrayy[i]+bricks_height && ((ball_x-(ball_diameter/2) <= arr[i][j]+bricks_width) || (ball_x+(ball_diameter/2) >= arr[i][j]))){
            ball_dx *= -1;
        }
        arr[i][j] = -1000;
        score+=5;
        bricks_cnt++
        if(i==bonus_x && j==bonus_y){
          score += 15;
        }
        if(i==booster_x && j==booster_y){
          ball_dx *= 2;
          ball_dy *= 2;
        }
        if(i==danger_x && j==danger_y){
          paddle_width *= 2/3;
          paddle_x += paddle_width/4;
        }
      }
    }
  }
  
  fill("white");
  text("Score ->", width-90, 14);
  text(score, width-40, 14);
  
  if(bricks_cnt >= bricks_row_length*bricks_col_length){
    text("You win!", width/2-30, height/2-10);
     text("Your score is " + score, width/2-35, height/2+10);
     noLoop();
     
     button.position(width/2-30, height/2+30);
     button.mousePressed(playagain);
  }
}

function playagain() {
  button.position(-1000, -1000);
  setup();
  draw();
  loop();
}