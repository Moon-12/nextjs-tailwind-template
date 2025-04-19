"use client";
import { useState, useEffect } from "react";
import Toast from "./components/toast";

type FileContent = {
  content: string;
};

type ErrorResponse = {
  message: string;
};

// Define interface for toast state
interface ToastState {
  message: string;
  type: "success" | "error" | "info" | "warning";
}
export default function Home() {
  const [content, setContent] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>();
  const [updateTrigger, setUpdateTrigger] = useState<number>(0);
  // Fetch file content on mount
  const fetchContent = async () => {
    try {
      const response = await fetch("/api/getFile");
      const data: FileContent | ErrorResponse = await response.json();
      if (response.ok && "content" in data) {
        setContent(data.content);
      } else {
        setError("message" in data ? data.message : "Unknown error");
      }
    } catch (err) {
      setError("Failed to fetch content");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [updateTrigger]);

  // Handle content update
  const handleUpdate = async () => {
    if (userInput) {
      try {
        const response = await fetch("/api/updateFile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: userInput }),
        });
        const data: ErrorResponse = await response.json();
        setToast({ message: data.message, type: "success" });
        setUpdateTrigger((prev) => prev + 1);
        if (!response.ok) {
          //  setError(data.message);
          setToast({ message: data.message, type: "error" });
        }
      } catch (err) {
        setToast({ message: "Failed to update content", type: "success" });
        //setError();
      }
    } else {
      setToast({ message: "Please enter the text", type: "warning" });
    }
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Welcome to file Editor
        </h1>
        {isLoading && <p className="text-gray-600">Loading...</p>}
        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            File Content
          </h2>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 whitespace-pre-wrap break-words">
            {content || "No content available"}
          </pre>
        </div>
        <textarea
          className="w-full h-44 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter text ..."
        />
        <div className="mt-4 text-sm text-black-600">
          <button
            className="bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2"
            onClick={handleUpdate}
          >
            Update File
          </button>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={closeToast} />}
    </div>
  );
}
