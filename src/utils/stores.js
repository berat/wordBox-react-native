import {action, decorate, observable} from 'mobx';

function Store() {
  this.name = 'Ali';

  this.updateName = (name) => {
    this.name = name;
  };

  this.getName = () => {
    this.name;
  };
}

decorate(Store, {
  name: observable,
  updateName: action,
  getName: action,
});

export default new Store();
