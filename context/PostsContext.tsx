"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { Post } from "@/types/post";
import { loadPosts, savePosts } from "@/lib/storage";

type State = { posts: Post[] };

type Action =
  | { type: "INIT"; payload: Post[] }
  | { type: "ADD"; payload: Post };

const PostsContext = createContext<{
  state: State;
  addPost: (post: Post) => void;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT":
      return { posts: action.payload };
    case "ADD":
      return { posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
}
export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { posts: [] });

  // hydrate form localStorage on mount
  useEffect(() => {
    const existing = loadPosts();
    dispatch({ type: "INIT", payload: existing });
  }, []);

  //persist whenever posts change
  useEffect(() => {
    savePosts(state.posts);
  }, [state.posts]);

  const addPost = (post: Post) => dispatch({ type: "ADD", payload: post });

  const value = useMemo(() => ({ state, addPost }), [state]);
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within a PostsProvider");
  return ctx;
}
