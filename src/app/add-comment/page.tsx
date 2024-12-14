"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// Frontend page to add comments to image.
export default function AddComment() {
  const [comment, setComment] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageUrlFromParams = searchParams.get("imageUrl");

  useEffect(() => {
    if (imageUrlFromParams) {
      setImageUrl(decodeURIComponent(imageUrlFromParams)); // Set image URL from query parameters.
    }
  }, [imageUrlFromParams]);

  const handleCommentSubmit = async () => {
    if (!comment || !imageUrl) {
      alert("Please provide comment and image.");
      return;
    }

    // Send comment to backend for saving in database.
    try {
      const response = await fetch("/api/save-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to save comment");
      }

      const data = await response.json();
      console.log("Comment saved:", data);

      // Redirect to show-images page.
      router.push("/show-images");
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleGoHome = () => {
    router.push("/"); // Redirect to home.
  };

  return (
    <main className="p-8 text-center">
      <h1 className="text-white bg-pink-300 text-3xl font-bold py-2 px-4 inline-block">
        Add comment 📝🌞
      </h1>
      {imageUrl && (
        <div className="mt-6 text-center">
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={500}
            height={300}
            className="w-64 h-auto rounded shadow-lg mx-auto"
          />
        </div>
      )}
      <div className="mt-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 w-64 border rounded"
          placeholder="Write a comment"
        />
      </div>
      <button
        onClick={handleCommentSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 hover:shadow-lg mt-4"
      >
        Submit comment ⭐
      </button>
      <button
        onClick={handleGoHome}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 hover:shadow-lg mt-4 ml-4"
      >
        Home 🏠
      </button>
    </main>
  );
}
