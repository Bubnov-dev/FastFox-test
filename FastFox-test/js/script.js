$(document).ready(function () {
    let question = 0;
    let questions = $(".question");
    let questionsLength = questions.length;
    let backBtn = $(".back-btn");
    let nextBtn = $(".next-btn");
    let points = 0;

    $("input").removeAttr("checked");


    function backQuestion(){
        if (question>0){
            question --;
            nextBtn.removeClass("disable")
            refresh ();

            if(question==0)
                backBtn.addClass("disable")

        }
    }
    
    function nextQuestion(toskip){
        question ++;
        backBtn.removeClass("disable")
        if (toskip)
            question += Number(toskip)
        if (questionsLength <= question){
            $(".test__footer").addClass("hidden");
            $(".questions").addClass("hidden");
            $(".test__result").removeClass("hidden");
            getResult();
        }
        else{ 
            nextBtn.addClass("disable")
            refresh();
        }
    }

    function refresh(){
        questions.addClass("hidden");
        try {
            questions.eq(question).removeClass("hidden");
            if (questions.eq(question).find("input:checked").length>0)
                nextBtn.removeClass("disable")
        } 
        catch (TypeError) {  

        }
        refreshProgress()
      
    }

    function refreshProgress(){
        let widthAll = $(".test-progressbar").width();
        let ratio = question/questionsLength;
        let widthProgress = widthAll * ratio;
        let percent = ratio*100;
        $(".test-progressbar__percent").text(Math.round(percent));
        $(".test-progressbar__line-ready").width(widthProgress)

    }

    function getResult(){
        points = 0;
        let checkeds = $("input:checked");

        checkeds.each(function( index, el ) {
            points += Number(el.getAttribute("data-value"))
        });

        $(".points").text(points);

    }

    nextBtn.on('click', function() {
        if (!$(this).hasClass("disable"))
            nextQuestion();
    })

    backBtn.on('click', function() {
        backQuestion();
    })

    $('.question input:radio').on('change', function () {
        if ($(this).attr("data-to-skip"))
            nextQuestion($(this).attr("data-to-skip"));
        else
            nextQuestion();
    });

    questions.each(() => {
        let localQuestion = $(this);
        $('input:checkBox').on('change', function () {
            nextBtn.removeClass("disable")
            let checkedcheckboxes = localQuestion.find("input:checkbox:checked");
            if(checkedcheckboxes.length>0){
                nextBtn.removeClass("disable")
            } else{
                nextBtn.addClass("disable")
            }

        });
    })

    $( window ).resize( () => {
        refreshProgress();
    }) 

    refresh();


})