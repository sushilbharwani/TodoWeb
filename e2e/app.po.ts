import { browser, by, element } from 'protractor';

export class AppPage {
  public toDoImage = element(by.id('git'));
  public userName = element(by.id('user'));
  public password = element(by.id('password'));
  public loginButton = element(by.className('btn btn-primary pull-right'));
  public appTitle = element(by.className('navbar-brand'));
  public dashboardOption = element.all(by.className('nav-tabs')).get(0);
  public addTodoOption = element.all(by.className('nav-tabs')).get(1);
  public itemTitle = element(by.className('pull-left'));
  public itemDescription = element(by.className('list-group-item-text'));
  public titleInput = element(by.id('title'));
  public titleDescription = element(by.id('description'));
  public saveButton = element(by.buttonText('Save'));
  
  navigateTo() {
    return browser.get('http://localhost:4200/');
  }

  getAppTitleText() {
    return element(by.className('panel-title text-center')).getText();
  }
  getItemTitleText() {
    return this.itemTitle.getText();
  }
  getitemDescription() {
    return this.itemDescription.getText();
  }
}
