import axios from "axios";

export const postReducerActions = {
  add_post: "add_post",
  delete_post: "delete_post",
  sort_post: "sort_post",
  fetch_post: "fetch_post",
};

const defaultState = {
  posts: [],
};

export const postReducer = (state = defaultState, action) => {
  switch (action.type) {
    case postReducerActions.add_post:
      return { ...state, posts: [...state.posts, action.payload] };
    case postReducerActions.delete_post:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };
    case postReducerActions.sort_post:
      return {
        ...state,
        posts: [
          ...state.posts.sort((a, b) =>
            a[action.payload].localeCompare(b[action.payload])
          ),
        ],
      };
    case postReducerActions.fetch_post:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
