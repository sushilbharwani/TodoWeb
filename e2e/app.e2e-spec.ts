import { AppPage } from './app.po';
import { protractor, browser, element, by } from 'protractor';

var page = new AppPage();

describe('Todo-web App end to end Test', () => {
  // let page: AppPage;

  // beforeEach(() => {
  //   page = new AppPage();
  // });

  it('should verify all the elements present on Login Page', () => {
    page.navigateTo();
    expect(page.toDoImage.isPresent()).toBeFalsy('Image is not present on Home Page');
    expect(page.getAppTitleText()).toEqual('Todo App');
    expect(page.userName.isPresent()).toBeTruthy('User Name field was not present');
    expect(page.password.isPresent()).toBeTruthy('Password field was not present');
    browser.sleep(1500);
  });

  it('should login to the app and verify the dashboard page', () => {
    page.loginButton.click();
    expect(page.appTitle.isPresent()).toBeTruthy('App Title was not present');
    expect(page.dashboardOption.isPresent()).toBeTruthy('Dashboard option was not present');
    expect(page.addTodoOption.isPresent()).toBeTruthy('Add to do option was not present');
    browser.sleep(1500);
  });

  it('should Add a new Item in the list', () => {
    page.addTodoOption.click();
    page.titleInput.sendKeys('Protractor');
    page.titleDescription.sendKeys('Automation Testing Framework');
    page.saveButton.click();
    browser.sleep(1500);
  });

  it('should Verify if new Item is successfully added', () => {
    expect(page.getItemTitleText()).toEqual('Protractor');
    expect(page.getitemDescription()).toEqual('Automation Testing Framework');
    browser.sleep(1500);
  });

});
