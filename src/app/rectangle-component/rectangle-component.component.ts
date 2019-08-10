import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-rectangle-component',
  templateUrl: './rectangle-component.component.html',
  styleUrls: ['./rectangle-component.component.scss']
})
export class RectangleComponentComponent implements OnInit {
  @Input() img;
  @Input() isAnswerPressed;
  @Input() answerText;
  @Input() pressedOk;
  @Input() answerChosen;
  @Input() answerIndex;
  @Input() showImg;
  @Input() isRightAnswer;
  @Output() updateAnswerChosen = new EventEmitter<string>();
  @Output() updateIsAnswerPressed = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public updatePressedStatus(event) {
      if(this.pressedOk)
          return;

      for(let i = 0; i < this.isAnswerPressed.length; i++) {
          if(i === this.answerIndex)
              this.isAnswerPressed[i] = true;
          else 
              this.isAnswerPressed[i] = false;
      }
      
      this.answerChosen = event.currentTarget.innerText;
      this.updateAnswerChosen.emit(this.answerChosen);
      this.updateIsAnswerPressed.emit(this.isAnswerPressed);
      
  }
}
