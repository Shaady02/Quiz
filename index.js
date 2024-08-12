const question = [
    {
        question: "Who was the winner of 2011 wc final?",
        answers: [
            {Text: "Austraila", correct: "false"},
            {Text: "England", correct: "false"},
            {Text: "India", correct: "true"},
            {Text: "West Indies", correct: "false"}
        ]
    },
    {
        question: "Who is the Current Prime Minister of India?",
        answers: [
            {Text: "Rahul Gandhi", correct: "false"},
            {Text: "Narendra Modi", correct: "true"},
            {Text: "Arvind kejriwal", correct: "false"},
            {Text: "Dimple Yadav", correct: "false"}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {Text: "Austraila", correct: "true"},
            {Text: "Asia", correct: "false"},
            {Text: "Africa", correct: "false"},
            {Text: "Arctic", correct: "false"}
        ]
    },
    {
        question: "How many oscar do A.R. Rehman having?",
        answers: [
            {Text: "5", correct: "false"},
            {Text: "1", correct: "false"},
            {Text: "10", correct: "false"},
            {Text: "2", correct: "true"}
        ]
    },
]

const questionElement = document.getElementById("ques");
const answerbutton = document.getElementById("ans");
const nextbutton = document.getElementById("next");

let currentQuesindex = 0;
let score = 0;

function startQuiz(){
    currentQuesindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQues();
}
function showQues(){
    resetSet();
    let currentques = question[currentQuesindex];
    let quesNo = currentQuesindex+1; 
    questionElement.innerHTML = currentques.question;

    currentques.answers.forEach(answers=>{
        const button = document.createElement("button");
        button.innerHTML = answers.Text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
    // checkAnswer();
}

function resetSet(){
    nextbutton.style.display = "none"
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block"
}
function handleNextButton(){
    currentQuesindex++;
    if(currentQuesindex<question.length){
        showQues();
    }else{
        showScore();
    }
}
function showScore(){
    resetSet();
    questionElement.innerHTML = `You have Score ${score} out of ${question.length}`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
    
}
nextbutton.addEventListener("click",()=>{
    if(currentQuesindex<question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();