

let obstacles =[];

let birdy = 250;
let birdvelocity = 0.5;

let score = 0;
let scoredisplay = null;

let highScore = localStorage.getItem("flappyHighScore") ? parseInt(localStorage.getItem("flappyHighScore")) : 0;

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

    obstacles.forEach(pair => {

        pair.groundX = pair.groundX - 0.5;
        pair.skyX = pair.skyX - 0.5;

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
        const padding = 35;

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

          if(score > highScore){
            localStorage.setItem("flappyHighScore", score);
            alert(`🎉 NEW HIGH RECORD: ${score}!`);
          }
          else{
            alert("Game Over! Try Again.");
            window.location.reload();
          }
          window.location.reload();
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
      alert("Game Over! You crashed into the ground!");
        window.location.reload();
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
        birdvelocity = -7;      
        console.log("Flap triggered! Velocity is now:", birdvelocity);
    }
};
