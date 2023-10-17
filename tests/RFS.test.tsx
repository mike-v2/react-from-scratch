import { React } from '../src/render';

describe('createElement', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('creates an element', () => {
    const element = React.createElement('div', { id: 'test' });
    expect(element.type).toBe('div');
    expect(element.props.id).toBe('test');
    expect(element.props.children).not.toBeNull();
  });

  test('flattens children arrays', () => {
    const arrayChildren = [
      ["text1"],
      ["text2", "text3"],
    ];

    //@ts-ignore
    const element = React.createElement('div', {}, arrayChildren);

    const expectedChildren = ["text1", "text2", "text3"];
    expect(element.props.children).toEqual(expectedChildren);
  });

  test('creates text elements when child is string', () => {
    const element = React.createElement('div', {}, 'text child')

    const expectedTextElement = {
      type: 'Text',
      props: {
        value: 'text child',
        children: []
      }
    }
    expect(element.props.children).toEqual([expectedTextElement]);
  });

  test('creates text elements when child is number', () => {
    const element = React.createElement('div', {}, 42)

    const expectedTextElement = {
      type: 'Text',
      props: {
        value: '42',
        children: []
      }
    }
    expect(element.props.children).toEqual([expectedTextElement]);
  });
});

describe('createRoot', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('createRoot works as expected', () => {
    const element = React.createElement('div', { className: 'container' });
    const root = React.createRoot(document.getElementById('root'));
    root.render(element);

    expect(document.querySelector('.container')).not.toBeNull();
  });
});
