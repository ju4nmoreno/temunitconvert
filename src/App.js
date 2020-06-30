import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);

  node.appendChild(rootNode);

  function dispatch(msg) {
    model = update(msg, model);
    const updateVeiw = view(dispatch, model);
    const patches = diff(currentView, updateVeiw);
    rootNode = patch(rootNode, patches);
    currentView = updateVeiw;
  }
}

export default app;
