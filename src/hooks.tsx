let hooks = [];
let currentHookIndex = 0;
let rerenderCallback = null;

export function setRerenderCallback(callback) {
  rerenderCallback = callback;
}

export function resetHooks() {
  currentHookIndex = 0;
}

// used during testing to refresh the app
export function refreshHooks() {
  currentHookIndex = 0;
  hooks = [];
}

export function useState(initialValue) {
  // freeze index value for callback
  const index = currentHookIndex;
  // initialize
  hooks[index] = hooks[index] || initialValue;

  //console.log(`useState called with initialValue: ${initialValue} and currentValue: ${hooks[index]}`);

  const setState = (newState) => {
    // always reference the same hook by freezing index
    hooks[index] = newState;
    // rerender on state change
    // use setTimeout so that the render process finishes before rerendering
    setTimeout(() => rerenderCallback(), 0);
  };
  // prepare for the next hook call
  currentHookIndex++;

  return [hooks[index], setState];
}

export function useEffect(body, dependencies = null) {
  // no dependecies runs every render
  // empty dependency array runs once at start
  // populated dependency array runs if the items change
  const willRun =
    !dependencies ||
    !hooks[currentHookIndex] ||
    dependencies.some((dependency, i) => {
      return hooks[currentHookIndex].dependencies[i] !== dependency;
    });

  //console.log(`useEffect called with dependencies: ${dependencies}  useEffect should run? ${willRun}`)

  if (willRun) {
    // clean up previous useEffect
    if (hooks[currentHookIndex]?.return != null) hooks[currentHookIndex].return();

    hooks[currentHookIndex] = {
      return: body(), // call the body function while assigning its return value
      dependencies,
    };
  }
  // prepare for the next hook call
  currentHookIndex++;
}
