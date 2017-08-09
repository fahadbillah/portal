import { PortalFrontendPage } from './app.po';

describe('portal-frontend App', () => {
  let page: PortalFrontendPage;

  beforeEach(() => {
    page = new PortalFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
