import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ExamService extends Service {
  @tracked questionList = [];
  @tracked questions = [];
  @tracked operators = [];

  addItem(question) {
    this.questionList = [...question];
    this.createQuestions(this.questionList);
  }

  createQuestions(question) {
    let [Question_No, ...levels] = [...question];
    let difficulty_level = levels[levels.length - 1].difficulty_level;
    let level1, level2, level3;
    let number1, number2, operator;
    let arr = [];

    let j = 0;
    for (let i = 0; i < Question_No.No_Of_Questions; i++) {
      let operatorArr = [];
      number1 = Math.random();
      number2 = Math.random();
      if (number1 < 0.1) number1 += 0.1;
      if (number2 < 0.1) number2 += 0.1;

      if (difficulty_level == 'easy') {
        console.log(difficulty_level);
        number1 = Math.floor(number1 * 10);
        number2 = Math.floor(number2 * 10);
      } else if (difficulty_level == 'medium') {
        number1 = Math.floor(number1 * 100);
        number2 = Math.floor(number2 * 10);
      } else {
        number1 = Math.floor(number1 * 100);
        number2 = Math.floor(number2 * 100);
      }

      for (let i = 0; i < levels.length - 1; i++) {
        if (levels[i].level1) {
          level1 = levels[i].level1;
          operatorArr.push('+');
        } else if (levels[i].level2) {
          level2 = levels[i].level2;
          operatorArr.push('-');
        } else if (levels[i].level3) {
          level3 = levels[i].level3;
          operatorArr.push('*');
        } else {
          continue;
        }
      }

      arr.push({number1:number1, number2:number2, operator:operatorArr[j]});
      j++;
      if (j == levels.length - 1) {
        j = 0;
      }
    }
    this.questionList = [...arr];
  }
}
