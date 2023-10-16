import { createElement } from './createElement';
import { createRoot } from './render';

describe('rendering', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('createRoot works as expected', () => {
    const testRender = '<div className="container"></div>';

    // Now you can safely access the document object
    const root = createRoot(document.getElementById('root'));
    //root.render(testRender);

    // Add your assertions here
    // For example, checking if a certain element exists after rendering:
    //expect(document.querySelector('.container')).not.toBeNull();
  });

  test('createElement creates an element', () => {
    const element = createElement('div', { id: 'test' });
    expect(element.type).toBe('div');
    expect(element.props.id).toBe('test');
  });
});
