import { DesktopSimPage } from './app.po';

describe('desktop-sim App', () => {
  let page: DesktopSimPage;

  beforeEach(() => {
    page = new DesktopSimPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
