import { SignitMeanPage } from './app.po';

describe('signit-mean App', function() {
  let page: SignitMeanPage;

  beforeEach(() => {
    page = new SignitMeanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
