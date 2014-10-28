$( document ).ready(function() {

    var total = $('.entry').length;
    var selected;
    var currentIndex = -1;
    //Set the initial highlighted to the first index
    selected = $('.entry').eq(0).find('a.title').attr('href');


    $(window).keypress(function(e) {
        var key = e.which;
        //if its an tab key select the first entry or increment the index
        if (key == 9){
            e.preventDefault();
            if (currentIndex == -1){
                currentIndex = 0;
                $('.entry').eq(currentIndex).css('background-color','yellow');
            }
            else if (currentIndex < total){
                $('.entry').eq(currentIndex).css('');
                currentIndex++;
                $('.entry').eq(currentIndex).css('background-color','yellow');
            }
        }
        //if its shift/tab go back one index
        if (key === 9 && e.shiftKey){
            e.preventDefault();
            if (currentIndex != -1 && currentIndex > 0)
                $('.entry').eq(currentIndex).css('');
                currentIndex--;
                $('.entry').eq(currentIndex).css('background-color','yellow');
        }
        //if its enter key go to that location which is pointed to
        if (key == 13){
            e.preventDefault();
            if (currentIndex >= 0 && currentIndex < total)
                window.location = $('.entry').eq(currentIndex).find('a.title').attr('href');
        }

    });
});

