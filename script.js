

let cactusx= 100;

let birdy = 100;
let birdvelocity = 0.5;

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



const pillar= document.createElement('img');
    pillar.className='pillar';
    pillar.src = 'obscopy.png';

    pillar.style.position = 'absolute';
    pillar.style.left = cactusx + 'vw';
    pillar.style.top = '50vh';


    document.body.appendChild(pillar);
    


    const birdplay = document.createElement('div');
    birdplay.className = 'birdplay';
    birdplay.textContent = '🦉';
    birdplay.style.left = '10vw';
    birdplay.style.top = birdy + 'px';
    document.body.appendChild(birdplay);

     moveGame();

  

});


 function moveGame(){
    cactusx = cactusx - 0.5;

    const activeCactus = document.querySelector('.pillar');

    if(cactusx < -10){
      cactusx= 100;
    }

    if(activeCactus){
        activeCactus.style.left = cactusx + 'vw';
    }
    

    birdvelocity = birdvelocity +0.3;
    birdy = birdy + birdvelocity;

    const activeBirdNow = document.querySelector('.birdplay');

    if(activeBirdNow){
        activeBirdNow.style.top = birdy + 'px';
    }

    if(activeBirdNow && activeCactus){
        const birdRect = activeBirdNow.getBoundingClientRect();
        const cactusRect = activeCactus.getBoundingClientRect();

        const padding = 35;


        if (
            birdRect.right > (cactusRect.left + padding )&&
            birdRect.left < (cactusRect.right - padding )&&
            birdRect.bottom > (cactusRect.top + padding )&&
            birdRect.top < (cactusRect.bottom - padding )
        ) {
            alert('Game Over!');
            location.reload();
        }
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
