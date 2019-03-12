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
                correctAnswerIndex: 3,
                correctAnswerReference: "Nice job !",
                incorrectAnswerReference: "Bad boy!",
                done: true
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

    let questionsStart = false;
    let lastQuestion;

    function generateNodes() {
        let textField = document.createElement('p');
        questionForm.appendChild(textField);
        for (let i = 0; i < inputsValue; i++) {
            addQuestionField(i);
            getUniqueId.increment();
        }
        questionsStart = !questionsStart;
    }

    function addQuestionField(uniqueId) {
        let input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', 'answer' + uniqueId);
        input.setAttribute('name', 'answer');
        questionForm.appendChild(input);
        let label = document.createElement('label');
        label.setAttribute('for', 'answer' + uniqueId);
        questionForm.appendChild(label);
    }

    function removeLastQuestionField() {
        const lastId = getUniqueId.decrement();
        const removedInput = document.getElementById('answer' + lastId);
        const removedLabel = questionForm.querySelector('label[for=answer' + lastId + ']');
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
        const questionTextField = this.querySelector('p');
        questionTextField.innerText = currentQuestionData.question;
        let label;
        questionFields.forEach(function (item, index) {
            item.setAttribute('value', currentQuestionData.answers[index]);
            label = questionForm.querySelector('label[for=' + item.getAttribute('id') + ']');
            label.innerText = currentQuestionData.answers[index];
        });
    }

    questionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // const answerID = this.querySelector('input:checked').value;
        // console.log(answerID);
        // console.log(questions.next());
        if (!questionsStart) {
            generateNodes();
        }

        const currentQuestion = questions.next();
        if (currentQuestion.done) {
            console.log('done!');
            return;
        }

        const currentQuestionData = currentQuestion.value;
        if (currentQuestionData instanceof Function) {
            const userAnswer = Array.from(questionForm).reduce((acc, item) => {
                console.log(item);
                if (item.name){
                    if (item.value === ''){
                        return false;
                    }
                    acc[item.name] = item.value;
                }
                return acc;
            }, {});
            console.log('123231!!');
        } else {
            lastQuestion = currentQuestionData;
            let questionFields = questionForm.querySelectorAll('input[name=answer]');
            const lengthValue = currentQuestionData.answers.length - questionFields.length;
            if (lengthValue !== 0) {
                correctQuestField(lengthValue);
                questionFields = questionForm.querySelectorAll('input[name=answer]');
            }
            fillQuestion.call(this, currentQuestionData, questionFields);
            console.log(currentQuestion.value);
        }


    });

    function checkAnswer(currentAnswer) {
        console.log('answer!');
    }

    const questions = (function* generateQuestions() {
        for (let item of questionsData.data) {
            yield item;
            yield checkAnswer;
        }
    })();
};