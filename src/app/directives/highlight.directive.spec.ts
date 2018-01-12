import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const directive = new HighlightDirective(this.el,this.renderer);
    expect(directive).toBeTruthy();
  });
});
