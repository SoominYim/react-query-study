import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const [count, setCount] = useState(0);
  // const id = 1;
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["todos", id],
  //   queryFn: async () => {
  //     const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   },
  // });
  // const fetchPosts = async () => {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // };
  // useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  //   staleTime: 1000 * 60,
  // });
  //   // 1분 동안 fresh 상태이며 1분 뒤 stale 상태, default : 0
  //   const { data, isLoading } = useQuery({
  //     queryKey: ["user", userId],
  //     queryFn: fetchUser,
  //     enabled: !!userId, // userId가 존재할 때만 실행
  //   });

  // useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  //   cacheTime: 1000 * 60 * 5,
  // });
  //   // default : 1000 * 60 * 5 , 5분

  // const { data } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  //   refetchOnWindowFocus: false, // 창 활성화 시 refetch 비활성화
  // });

  // const { data } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  //   onSuccess: (data) => console.log("Data fetched successfully:", data),
  //   onError: (error) => console.log("Error fetching data:", error),
  // });

  // const queryClient = useQueryClient();

  // const createPost = async (newPost) => {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newPost),
  //   });
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // };

  // const mutation = useMutation(createPost, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["posts"]); // 캐시된 데이터를 무효화
  //   },
  // });

  // mutation.mutate({ title: "New Post" });

  const queryClient = useQueryClient();

  const createPost = async (newPost) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const mutation = useMutation(createPost, {
    onMutate: (variables) => {
      console.log("Mutation started with variables:", variables);
    },
    onSuccess: (data, variables, context) => {
      console.log("Mutation successful with data:", data);
      queryClient.invalidateQueries(["posts"]); // 캐시된 데이터를 무효화
    },
    onError: (error, variables, context) => {
      console.log("Mutation failed with error:", error);
    },
    onSettled: (data, error, variables, context) => {
      console.log("Mutation settled with data:", data, "and error:", error);
    },
  });

  mutation.mutate({ title: "New Post" });
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
