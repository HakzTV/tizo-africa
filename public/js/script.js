function toggleForm(){
    let container = document.querySelector('#container');
    container.classList.toggle('active')
}

let swap = document.querySelectorAll('.swap');
for(var i= 0; i<swap.length; i++){
    swap[i].addEventListener('click' ,()=>{
        toggleForm();
    })
}

