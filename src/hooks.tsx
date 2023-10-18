let hooks = [];
let currentHookIndex = 0;
let rerenderCallback = null;

export function setRerenderCallback(callback) {
  rerenderCallback = callback;
}

export function resetHooks() {
  currentHookIndex = 0;
}

export function refreshHooks() {
  currentHookIndex = 0;
  hooks = [];
}

export function useState(initialValue) {
  const index = currentHookIndex;
  hooks[index] = hooks[index] || initialValue;

  const setState = newState => {
    hooks[index] = newState;
    rerenderCallback();
  }
  currentHookIndex++;

  return [hooks[index], setState];
}

export function useEffect(body, dependencies) {
  const index = currentHookIndex;

  const hasChanged = !dependencies || !hooks[index] || dependencies.some((dependency, i) => {
    return hooks[index].dependencies[i] !== dependency;
  });

  if (hasChanged) {
    if (hooks[index]?.return != null) hooks[index].return();

    hooks[index] = {
      return: body(), // call the body function while assigning its return value
      dependencies
    }
  }

  currentHookIndex++;
}