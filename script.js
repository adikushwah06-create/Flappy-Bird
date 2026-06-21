

let obstacles =[];

let birdy = 150;
let birdvelocity = 0.5;

let gameSpeed = 0.5;

let score = 0;
let scoredisplay = null;

let highScore = localStorage.getItem("flappyHighScore") ? parseInt(localStorage.getItem("flappyHighScore")) : 0;

let isGameOver = false;

const bgMusic = new Audio('meow.m4a');
bgMusic.loop = true;

const crash = new Audio('hehe.mp3');

function createSparkles(count){
      for(let i=0;i<count; i++){
        const sparkle = document.createElement('div');

        sparkle.className= 'sparkle';
        sparkle.textContent='☁️';

        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
       
        sparkle.style.left = randomX + 'vw';
        sparkle.style.top = randomY + 'vh';

        document.body.appendChild(sparkle);

      }
} 

createSparkles(15);

const myButton = document.getElementById('myButton');
const bird = document.getElementById('Bird');

myButton.addEventListener('click', function(){

  bgMusic.currentTime =0;
  bgMusic.play().catch(e => console.log("Audio waiting for user interaction layer."));

    bird.classList.add('hidden');
    myButton.classList.add('hidden');

    const grass = document.createElement('div');
    grass.className = 'grass';
  
  document.body.appendChild(grass);

  scoredisplay= document.createElement('div'); 
  scoredisplay.className = 'score';


  scoredisplay.innerHTML = `Score: 0<br><span style="font-size: 18px; opacity: 0.8;">High Score: ${highScore}</span>`;
  document.body.appendChild(scoredisplay);

  function createcloud(count){
      for(let i=0;i<count; i++){
        const cloud = document.createElement('div');

        cloud.className= 'cloud';
        cloud.textContent='☁️';

        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;

        cloud.style.left = randomX + 'vw';
        cloud.style.top = randomY + 'vh';

        document.body.appendChild(cloud);

      }
} 

createcloud(15);
 


const sparkles = document.querySelectorAll('.sparkle');

sparkles.forEach(sparkle => sparkle.classList.add('hidden'));




const noOfObstacles = 3;

for (let i = 0; i < noOfObstacles; i++) {
    const pillar = document.createElement('img');
    pillar.className = 'pillar';
    pillar.src = 'obscopy.png';
    pillar.style.position = 'absolute';
   
    let startingX = 100 + (i * 60);

   pillar.style.left = startingX + 'vw';
   pillar.style.bottom = '100px';


    document.body.appendChild(pillar);
    

    

    const skyPillar = document.createElement('img');
    skyPillar.className = 'pillar';
    skyPillar.src = 'obscopy.png';
    skyPillar.style.position = 'absolute';

    let skyX = startingX+ 25;
    skyPillar.style.left = skyX + 'vw';



    skyPillar.style.top = '-70px';

    skyPillar.style.transform= 'scaleY(-1)';

    document.body.appendChild(skyPillar);

    obstacles.push({
      groundElement: pillar,
      skyElement: skyPillar,
      groundX: startingX,
      skyX: skyX,
      groundPassed: false,
      skyPassed: false
    });

  }

    const birdplay = document.createElement('div');
    birdplay.className = 'birdplay';
    

    const playerImg = document.createElement('img');
    playerImg.src = 'md.jpg';
    birdplay.appendChild(playerImg);

    birdplay.style.left = '10vw';
    birdplay.style.top = birdy + 'px';
    document.body.appendChild(birdplay);

     moveGame();

  

});


 function moveGame(){
    

    const activeBirdNow = document.querySelector('.birdplay');

    if (isGameOver) return;

    gameSpeed += 0.00005;
    obstacles.forEach(pair => {

        pair.groundX = pair.groundX - gameSpeed;
        pair.skyX = pair.skyX - gameSpeed;

          if (pair.groundX < -20) {

            let furthestGroundX = Math.max(...obstacles.map(o => o.groundX));
            pair.groundX = furthestGroundX + 60;
            pair.groundPassed = false;

            
          }

          if (pair.skyX < -20) {

            let furthestskyX = Math.max(...obstacles.map(o => o.skyX));
            pair.skyX = furthestskyX + 60;
            pair.skyPassed = false;

            
          } 

          pair.groundElement.style.left = pair.groundX + 'vw';
          pair.skyElement.style.left = pair.skyX + 'vw';

          if(activeBirdNow){

            let scoreChanged = false;

            if(pair.groundX <10 && !pair.groundPassed){ 
              pair.groundPassed = true;
              score++;
              scoreChanged = true;
            }

            if(pair.skyX <10 && !pair.skyPassed){ 
              pair.skyPassed = true;
              score++;
              scoreChanged = true;
            }

            if (scoreChanged && scoredisplay) {
                scoredisplay.innerHTML = `Score: ${score}<br><span style="font-size: 18px; opacity: 0.8;">High Score: ${highScore}</span>`;
            }

          }

       

    if(activeBirdNow){
        const birdRect = activeBirdNow.getBoundingClientRect()
        const padding = 25;

        const groundRect = pair.groundElement.getBoundingClientRect();
            const hitGround = (
                birdRect.right > (groundRect.left + padding) &&
                birdRect.left < (groundRect.right - padding) &&
                birdRect.bottom > (groundRect.top + padding) &&
                birdRect.top < (groundRect.bottom - padding)
            );

            const skyRect = pair.skyElement.getBoundingClientRect();
            const hitSky = (
                birdRect.right > (skyRect.left + padding) &&
                birdRect.left < (skyRect.right - padding) &&
                birdRect.bottom > (skyRect.top + padding) &&
                birdRect.top < (skyRect.bottom - padding)
            );


        if(hitGround || hitSky){
          isGameOver = true;
          bgMusic.pause();
          crash.play();

          const goImg = document.createElement('img');
                goImg.src = 'over.jpg'; 
                goImg.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width:350px; border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);pointer-events:none;';
                document.body.appendChild(goImg);

           const scoreBox = document.createElement('div');
                scoreBox.style = 'position:fixed; top:65%; left:50%; transform:translate(-50%, -50%); z-index:9999; background:rgba(44, 62, 80, 0.95); color:white; padding:12px 28px; font-family:sans-serif; font-weight:bold; font-size:20px; border-radius:30px; text-align:center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);';     

               
          if(score > highScore){
            localStorage.setItem("flappyHighScore", score);
            scoreBox.innerHTML = `NEW HIGH RECORD: ${score}!`;
          }
          else{
            scoreBox.innerHTML = `Final Score: ${score}`;
          }
          document.body.appendChild(scoreBox);

          setTimeout(() => { 
            window.location.reload();
            }, 3000);

            return;
          }
          
    }
  
    

     });

     birdvelocity += 0.3;
    birdy += birdvelocity;

    if(birdy < 0){
      birdy =0;
      birdvelocity = 0;
    }

    let floorlimit = window.innerHeight - 180;
    if(birdy > floorlimit){
      isGameOver = true;
      bgMusic.pause();
      crash.play();

      const goImg = document.createElement('img');
                goImg.src = 'over.jpg'; 
                goImg.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width:350px; border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);pointer-events:none;';
                document.body.appendChild(goImg);

      const scoreBox = document.createElement('div');
                scoreBox.style = 'position:fixed; top:65%; left:50%; transform:translate(-50%, -50%); z-index:9999; background:rgba(44, 62, 80, 0.95); color:white; padding:12px 28px; font-family:sans-serif; font-weight:bold; font-size:20px; border-radius:30px; text-align:center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);';          

             
       if(score > highScore){
        highScore = score;
      localStorage.setItem("flappyHighScore", score);
        scoreBox.innerHTML = `NEW HIGH RECORD: ${score}!`;
       }
       else{
        scoreBox.innerHTML = `Crashed into the ground! Score: ${score}`;
       }

       document.body.appendChild(scoreBox);
       setTimeout(() => {
           window.location.reload();
       }, 3000);
      

        return;
    }

    if(activeBirdNow){
      activeBirdNow.style.top = birdy + 'px';
    }
    requestAnimationFrame(moveGame);
   
}

 document.onkeydown = function(event) {
    if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault(); 

      if (isGameOver) return;


        
        birdvelocity = -7;      
        console.log("Flap triggered! Velocity is now:", birdvelocity);
    }
};
