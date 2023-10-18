import { refreshHooks } from '../src/hooks';
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

describe('render', () => {

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('createRoot returns an object with render and unmount', () => {
    const root = React.createRoot(document.getElementById('root'));

    expect(root).toHaveProperty('render');
    expect(typeof root.render).toBe('function');

    expect(root).toHaveProperty('unmount');
    expect(typeof root.unmount).toBe('function');
  });

  test('render creates dom node of the correct type', () => {
    const element = React.createElement('div', {});
    const rootNode = document.getElementById('root');
    const root = React.createRoot(rootNode);
    root.render(element);

    expect(rootNode.firstChild.nodeName).toBe('DIV');
  });

  test('render handles function components', () => {
    const stringContent = 'function name';

    const functionComponent = () => {
      return <div>{stringContent}</div>
    }
    const root = React.createRoot(document.getElementById('root'));
    const element = React.createElement(functionComponent, {});
    root.render(element);

    expect(document.body.textContent).toContain(stringContent);
  });

  test('render transfers props from element to dom node', () => {
    const src = 'path/to/image.jpg';
    const alt = 'Some Image';
    const element = React.createElement('img', {
      src,
      alt,
      id: 'imageID'
    });

    const root = React.createRoot(document.getElementById('root'));
    root.render(element);

    const renderedElement = document.querySelector("#imageID") as HTMLImageElement;
    expect(renderedElement).not.toBeNull();

    expect(renderedElement.src).toContain(src);
    expect(renderedElement.alt).toBe(alt);
  });

  test('render converts props whose JSX name differs from the HTML name', () => {
  // className -> class
    const element = React.createElement('div', { className: 'container' });
    const root = React.createRoot(document.getElementById('root'));
    root.render(element);

    expect(document.querySelector('.container')).not.toBeNull();
  });

  test('render transfers event names in lower case', () => {
    // onClick -> onclick
    const clickMsg = 'clicked';
    const element = React.createElement('div', { id: 'btnID', onClick: (e) => clickMsg });
    const root = React.createRoot(document.getElementById('root'));
    root.render(element);

    const renderedElement = document.querySelector('#btnID') as HTMLElement;
    expect(renderedElement).not.toBeNull();
    expect(renderedElement.onclick(null)).toBe(clickMsg);
  });
});

describe('useState', () => {
  let rootNode = null;

  beforeEach(() => {
    refreshHooks();
    document.body.innerHTML = '<div id="root"></div>';
    rootNode = document.getElementById('root');
  });

  test('returns the initial value on the first call', () => {
    function TestComponent() {
      const [state] = React.useState('initial');
      return <div>{state}</div>;
    }

    const root = React.createRoot(rootNode);
    root.render(React.createElement(TestComponent, {}));

    expect(rootNode.textContent).toBe('initial');
  });

  test('change state on button press', () => {
    function Component() {
      const [state, setState] = React.useState(0);

      return (
        <div>
          <button id='btn-1' onClick={() => setState(state + 1)} />
          {state}
        </div>
      )
    }

    console.log("body = ", document.body.innerHTML);
    const root = React.createRoot(rootNode);
    const element = React.createElement(Component, {});
    root.render(element);
    console.log("body = ", document.body.innerHTML);

    const button = document.querySelector('#btn-1') as HTMLButtonElement;
    const clickEvent = new MouseEvent('click');

    button.dispatchEvent(clickEvent);

    expect(rootNode.textContent).toBe("1");
  });

  test('handles multiple useState calls correctly', () => {
    function Component() {
      const [state1] = React.useState('first');
      const [state2] = React.useState('second');
      return <div>{`${state1}-${state2}`}</div>;
    }

    const root = React.createRoot(rootNode);
    root.render(React.createElement(Component, {}));

    expect(rootNode.textContent).toBe('first-second');
  });
})
