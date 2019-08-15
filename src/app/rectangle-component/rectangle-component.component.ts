import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-rectangle-component',
  templateUrl: './rectangle-component.component.html',
  styleUrls: ['./rectangle-component.component.scss']
})
export class RectangleComponentComponent implements OnInit {
  @Input() img;
  @Input() answerText;
  @Input() pressedOk;
  @Input() showImg;
  @Input() isRightAnswer;


  constructor() { }

  ngOnInit() {
  }
}
