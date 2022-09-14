import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class FormComponent extends Component {
  @service('exam') formData;

  @action
  add(event) {
    event.preventDefault();
    this.formData.addItem([...this.formDataArr]);
  }

  @action
  handleInput(event) {
    let data = {};
    data[event.target.name] = event.target.value;
    this.formDataArr = [...this.formDataArr, data];
  }
  @tracked formValue = false;
  @tracked formDataArr = [];
}
