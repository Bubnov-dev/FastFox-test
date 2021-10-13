$(document).ready(function () {
    let question = 0;
    let questions = $(".question");
    let backBtn = $(".back-btn")
    let nextBtn = $(".next-btn")

    function backQuestion(){
        question --;
        refresh ();
    }
    
    function nextQuestion(){
        question ++;
        refresh();
    }

    function refresh(){
        questions.addClass("hidden");
        questions[question].classList.remove("hidden");

    }

    $('.question input:radio').on('change', function () {
        nextQuestion();
    });


    nextBtn.on('click', function() {
        nextQuestion();
    })

    backBtn.on('click', function() {
        backQuestion();
    })

    for (let i = 0; i < questions.length; i++){

    }
})