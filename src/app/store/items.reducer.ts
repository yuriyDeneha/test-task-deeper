import { ToggleTypes, TreeItems } from "../shared/interfaces/tree.interface";
import { cloneDeep } from "../shared/utils/clone-deep";

export const GET_ITEMS = "GET_ITEMS";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const TOGGLE_ALL_ITEMS = "TOGGLE_ALL_ITEMS";
export const SEARCH_ITEMS = "SEARCH_ITEMS";

export function getItems() {
  return {
    type: GET_ITEMS
  }
}

const initialState = {
  data: [],
  pending: false,
  error: null
}

export function items(state = initialState, { type , payload }: { type: string, payload?: any } ) {
  switch( type ) {
    case GET_ITEMS:
      return Object.assign({}, state, {pending: true, error: null})
    case GET_ITEMS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false})
    case GET_ITEMS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"})
      case TOGGLE_ITEM:
        return Object.assign({}, state, {pending: false, error: "Error", data: findAndReplace(state.data, payload.name)})
        case TOGGLE_ALL_ITEMS:
        return Object.assign({}, state, {pending: false, error: "Error", data: expandAll(state.data, payload)})
        case SEARCH_ITEMS:
          return Object.assign({}, state, {pending: false, error: "Error", data: searchAndExpandByNameWithMap(state.data, payload)})
    default:
      return state;
  }
}

export interface State{
  items: typeof initialState
}

function findAndReplace(array: TreeItems, name: string): TreeItems {
  return array.map((obj: any) => {
    if (obj.name === name) {
      return Object.assign({}, obj, {expanded: !obj.expanded});
    } else if (obj.children) {
      return { ...obj, children: findAndReplace(obj.children, name) };
    } else {
      return obj;
    }
  });
}

function expandAll(array: TreeItems, method: ToggleTypes): TreeItems {
  return array.map(obj => {
    return { ...obj, expanded: !!method, children: obj.children ? expandAll(obj.children, method) : obj.children };
  });
}

function searchAndExpandByNameWithMap(object: TreeItems, name: string): TreeItems {
  const array: TreeItems = cloneDeep(object);
  return array.map(obj => {
    const objName = obj.name.toLowerCase();
    if(!name){
      obj.visible = true;
      if (obj.children) {
        obj.children = searchAndExpandByNameWithMap(obj.children, name);
      }
    }
    if (objName.includes(name.toLowerCase())) {
      obj.visible = true;
      obj.expanded = true;
      return obj;
    }
    if (obj.children) {
      obj.children = searchAndExpandByNameWithMap(obj.children, name);
      obj.visible = obj.children.some(child => child.visible);
      obj.expanded = obj.children.some(child => child.visible);
    } else {
      obj.visible = false;
    }
    return obj;
  });
}


