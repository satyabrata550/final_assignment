import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class StudentsController extends Controller {
    @service('exam') formData;

    @action 
    handleInput( number1, operator, number2, event){
        let actualResult;
        switch (operator) {
        case "+":
        actualResult= number1+ number2
        break;
        case "-":
        actualResult= number1- number2
        break;
        default:
        actualResult= number1 * number2
        }      
        this.answer=[...this.answer,{actualResult:actualResult, exceptedResult: event.target.value}]
    }

    @action
    checkScore(){
      this.total = this.answer.length
      for(let i=0;i<this.answer.length;i++){
        if(this.answer[i].actualResult == this.answer[i].exceptedResult){
            this.score+=1
        }
      }
      this.evaluationNeeded=false
    }
    
    @action
    tryAgain(){
        this.evaluationNeeded=true
        this.score=0
        this.total=0
        this.answer=[]
    }

    @tracked answer=[]   
    @tracked score=0
    @tracked total=0
    @tracked evaluationNeeded=true
}
