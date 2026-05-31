

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

document.getElementById('myButton').addEventListener('click',function(){
    alert('Button Clicked!');
});

