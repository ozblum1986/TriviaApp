import { Component} from '@angular/core';
import { DataUtilsService } from './services/data-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'TriviaApp';
    QNAData;
    currentElem;
    currQuestionNUmber = 1;
    questionsNumber;
    answerPressed = -1;
    img = "";
    answerChosen;
    pressedOk = false;
    buttonText = "OK";
    answerSubmitted = false;
    scrambleAnswers = [];
    isRightAnswer = false;
    questionText;
    rightAudio = new Audio();
    wrongAudio = new Audio();

    constructor( private dataService: DataUtilsService ) {
        this.rightAudio.src = "../assets/audio/applause.wav";
        this.wrongAudio.src = "../assets/audio/boo.wav";

        dataService.getQNAData()
        .subscribe((data) => {
            this.QNAData = data.body.results;
            this.questionsNumber = this.QNAData.length;
            this.currentElem = this.QNAData[this.currQuestionNUmber - 1];
            this.questionText = this.currentElem.question;
            this.scrambleAllAnswers();
        },
        (err) => {
            return err;
        });
    }

    public scrambleAllAnswers() {
        this.scrambleAnswers = [];
        let allAnswers = this.currentElem.incorrect_answers.slice();
        allAnswers.push(this.currentElem.correct_answer);

        for(let index = 0; index < allAnswers.length; index++) {
            let scrambledIndex = Math.floor(Math.random() * Math.floor(allAnswers.length));
            this.scrambleAnswers.splice(scrambledIndex, 0, allAnswers[index]);
        }
    }

    public hasPressedAnswer() {
        return this.answerPressed != -1;
    }

    public updatePressedStatus(event,i) {
        if(this.pressedOk)
          return;
        
        this.answerChosen = event.currentTarget.innerText;
        this.answerPressed = i;
    }

    public initVars() {
        this.buttonText = "OK";
        this.pressedOk = false;
        this.answerSubmitted = false;
        this.answerPressed = -1;
    }

    public submitAnswer() {
        if(!this.hasPressedAnswer())
            return;

        if(this.answerSubmitted && this.currQuestionNUmber === this.questionsNumber) {
            this.dataService.getQNAData()
            .subscribe((data) => {
                this.QNAData = data.body.results;
                this.questionsNumber = this.QNAData.length;
                this.currQuestionNUmber = 1;
                this.currentElem = this.QNAData[this.currQuestionNUmber - 1];
                this.scrambleAllAnswers();
                this.initVars();
            },
            (err) => {
                return err;
            });
        } else if(this.answerSubmitted) {
            this.currQuestionNUmber++;
            this.currentElem = this.QNAData[this.currQuestionNUmber - 1];
            this.questionText = this.currentElem.question;
            this.scrambleAllAnswers();
            this.initVars();
        } else {
            this.pressedOk = true;
            
            if(this.answerChosen === this.currentElem.correct_answer) {
                this.isRightAnswer = true;
                this.rightAudio.load();
                this.rightAudio.play();
            } 
            else 
            {
                this.isRightAnswer = false;
                this.wrongAudio.load();
                this.wrongAudio.play();
            }
            
            this.img = this.isRightAnswer ? "assets/Group.png" : "assets/Group3.png";
            this.buttonText = (this.currQuestionNUmber === this.questionsNumber) ? "Restart" : "Continue";
            this.answerSubmitted = true;
        }
    }
}
