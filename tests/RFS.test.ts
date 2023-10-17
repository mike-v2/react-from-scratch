import { createElement } from '../src/createElement';
import { createRoot } from '../src/render';

describe('rendering', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('createRoot works as expected', () => {
    const element = createElement('div', { className: 'container' });
    // Now you can safely access the document object
    const root = createRoot(document.getElementById('root'));
    root.render(element);

    // Add your assertions here
    // For example, checking if a certain element exists after rendering:
    expect(document.querySelector('.container')).not.toBeNull();
  });

  test('createElement creates an element', () => {
    const element = createElement('div', { id: 'test' });
    expect(element.type).toBe('div');
    expect(element.props.id).toBe('test');
  });
});
