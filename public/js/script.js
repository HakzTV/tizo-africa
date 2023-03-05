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

// To create tags 

var tags = [];
$(document).ready(function () {

    $('body').on('click', 'span.cross', function () {
        var removedItem = $(this).parent().contents(':not(span)').text();
        $(this).parent().remove(); 
        tags = $.grep(tags, function (value) {
            return value != removedItem;
        }); 
    });

    $("#textBox").keypress(function (e) {
        if (e.which === 13) {
            $(".target").append("<a href='#' class='tag'>" + this.value + '<span class="cross">X</span>' + "</a>");

            tags.push(this.value);
            this.value = "";
        }
    });
});