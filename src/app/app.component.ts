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
    isAnswerPressed = [false,false,false,false];
    img = "";
    answerChosen;
    pressedOk = false;
    buttonText = "OK";
    answerSubmitted = false;
    scrambleAnswers = [];
    isRightAnswer = false;
    rightAnswers = 0;
    rightAudio = new Audio();
    wrongAudio = new Audio();

    constructor( private dataService: DataUtilsService ) {
        this.rightAudio.src = "../assets/audio/applause.wav";
        this.wrongAudio.src = "../assets/audio/boo.wav";

        dataService.getQNAData()
        .subscribe((data) => {
            this.QNAData = data.body.results;
            this.currentElem = this.QNAData[this.currQuestionNUmber - 1];
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
        return this.isAnswerPressed[0] || this.isAnswerPressed[1] || this.isAnswerPressed[2] || this.isAnswerPressed[3];
    }

    updateAnswerChosen($event) {
        this.answerChosen = $event;
    }

    updateIsAnswerPressed($event) {
        this.isAnswerPressed = $event;
    }

    public submitAnswer() {
        if(!this.hasPressedAnswer())
            return;

        if(this.answerSubmitted) {
            this.currQuestionNUmber++;
            this.currentElem = this.QNAData[this.currQuestionNUmber - 1];
            this.scrambleAllAnswers();
            this.pressedOk = false;
            this.buttonText = "OK";
            this.answerSubmitted = false;
            this.isAnswerPressed = [false,false,false,false];
        } else {
            this.pressedOk = true;
            
            if(this.answerChosen === this.currentElem.correct_answer) {
                this.rightAnswers++;
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
            this.buttonText = "Continue";
            this.answerSubmitted = true;
        }
    }
}
