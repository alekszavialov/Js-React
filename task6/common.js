const questionsData =
    {
        data: [
            {
                question: "some test question",
                answers: [1, 2, 3, 4],
                correctAnswerIndex: 3,
                correctAnswerReference: "Nice job !",
                incorrectAnswerReference: "Bad boy!",
                done: false
            },
            {
                question: "some test question1",
                answers: [1, 2, 3, 4, 5],
                correctAnswerIndex: 3,
                correctAnswerReference: "Nice job !",
                incorrectAnswerReference: "Bad boy!",
                done: false
            },
            {
                question: "some test question2",
                answers: [1, 2],
                correctAnswerIndex: 1,
                correctAnswerReference: "Nice job !",
                incorrectAnswerReference: "Bad boy!",
                done: false
            },
            {
                question: "some test question3",
                answers: [1, 2, 3, 4, 5, 6],
                correctAnswerIndex: 3,
                correctAnswerReference: "Nice job !",
                incorrectAnswerReference: "Bad boy!",
                done: true
            },
        ]
    };

const inputsValue = 4;

const getUniqueId = (() => {
    let id = 0;

    return {
        increment: function () {
            return id++;
        },
        decrement: function () {
            return --id;
        }
    };

})();

window.onload = function () {
    const questionForm = document.getElementById('question');
    const questionFormSubmitButton = document.getElementById('form-Submit');
    const questionTextArea = questionForm.querySelector('div.questionTextArea');
    const questionVariablesArea = questionForm.querySelector('div.questionVariablesArea');
    const questionAnswerArea = questionForm.querySelector('div.questionAnswerArea');

    let questionsEnds = true;
    let lastQuestion = {};
    let answerReference = [];

    function generateNodes() {
        const textField = document.createElement('p');
        questionTextArea.appendChild(textField);
        const answerField = document.createElement('p');
        questionAnswerArea.appendChild(answerField);
        for (let i = 0; i < inputsValue; i++) {
            addQuestionField(i);
            getUniqueId.increment();
        }
        questionsEnds = false;
    }

    function addQuestionField(uniqueId) {
        let input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', 'answer' + uniqueId);
        input.setAttribute('name', 'answer');
        questionVariablesArea.appendChild(input);
        let label = document.createElement('label');
        label.setAttribute('for', 'answer' + uniqueId);
        questionVariablesArea.appendChild(label);
    }

    function removeLastQuestionField() {
        const lastId = getUniqueId.decrement();
        const removedInput = document.getElementById('answer' + lastId);
        const removedLabel = questionVariablesArea.querySelector('label[for=answer' + lastId + ']');
        removedInput.remove();
        removedLabel.remove();
    }

    function correctQuestField(lengthValue) {
        while (lengthValue !== 0) {
            if (lengthValue > 0) {
                addQuestionField(getUniqueId.increment());
                lengthValue--;
            } else {
                removeLastQuestionField();
                lengthValue++;
            }
        }
    }

    function fillQuestion(currentQuestionData, questionFields) {
        const questionTextField = questionTextArea.querySelector('p');
        questionTextField.innerText = currentQuestionData.question;
        let label;
        questionFields.forEach(function (item, index) {
            item.setAttribute('value', currentQuestionData.answers[index]);
            label = questionForm.querySelector('label[for=' + item.getAttribute('id') + ']');
            label.innerText = currentQuestionData.answers[index];
        });
    }

    function showAnswers() {
        questionTextArea.remove();
        questionFormSubmitButton.remove();
        const answerText = answerReference.reduce((acc, item) => {
            acc += `Question : ${item.question} <br/>Correct answer : ${item.correctAnswer}</br>Your answer : ${item.yourAnswer}<br/><br/>`;
            return acc;
        }, '');
        const answerArea = questionAnswerArea.querySelector('p');
        answerArea.innerHTML = answerText;
    }

    questionForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const currentQuestion = questions.next();
        if (currentQuestion.done && questionsEnds) {
            showAnswers();
            return;
        }

        if (questionsEnds) {
            generateNodes();
        }

        const answerArea = questionAnswerArea.querySelector('p');
        const currentQuestionData = currentQuestion.value;
        if (currentQuestionData instanceof Function) {
            const answer = this.querySelector('input:checked');
            answer.checked = false;
            console.log(questionVariablesArea);
            answerArea.innerText = currentQuestionData(parseInt(answer.value));
            questionFormSubmitButton.value = !lastQuestion.done ? 'Next question' : 'Show results';
            questionsEnds = lastQuestion.done;
            questionForm.setAttribute('novalidate', '');
        } else {
            answerArea.innerText = '';
            lastQuestion = currentQuestionData;
            let questionFields = questionForm.querySelectorAll('input[name=answer]');
            const lengthValue = currentQuestionData.answers.length - questionFields.length;
            if (lengthValue !== 0) {
                correctQuestField(lengthValue);
                questionFields = questionForm.querySelectorAll('input[name=answer]');
            }
            questionForm.removeAttribute('novalidate');
            fillQuestion.call(this, currentQuestionData, questionFields);
            questionFormSubmitButton.value = 'Make answer';
        }
    });

    function checkAnswer(currentAnswer) {
        answerReference.push({
            question: lastQuestion.question,
            correctAnswer: lastQuestion.correctAnswerIndex,
            yourAnswer: currentAnswer
        });
        return lastQuestion.correctAnswerIndex === currentAnswer ?
            lastQuestion.correctAnswerReference :
            lastQuestion.incorrectAnswerReference;
    }

    const questions = (function* generateQuestions() {
        for (let item of questionsData.data) {
            yield item;
            yield checkAnswer;
        }
    })();
};