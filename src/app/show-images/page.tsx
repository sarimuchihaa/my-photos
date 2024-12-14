"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Comment {
  id: number;
  text: string;
}

interface Photo {
  id: number;
  url: string;
  comments: Comment[];
}

export default function DisplayPhotosWithComments() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPhotosWithComments = async () => {
      try {
        const response = await fetch("/api/photos-with-comments");
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos with comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotosWithComments();
  }, []);

  if (loading) {
    return <p className="text-2xl text-blue-500 font-bold text-center mb-10">Loading... ⭐</p>;
  }

  return (
    <div className="p-8 text-center overflow-auto h-screen">
      <h1 className="text-white bg-pink-300 text-3xl font-bold py-2 px-4 inline-block">
        Image with comment ⭐
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="flex flex-col h-full justify-between border p-4 rounded shadow-lg bg-white"
          >
            {/* Images */}
            <div className="flex-shrink-0">
              <img
                src={photo.url}
                alt="Uploaded"
                className="w-full h-48 object-cover rounded mb-4"
              />
            </div>
            {/* Comments */}
            <div>
              <h2 className="text-lg font-bold mb-2 text-teal-500">
                Comments :
              </h2>
              <ul className="pl-6 text-blue-500 text-bold">
                {photo.comments.length > 0 ? (
                  photo.comments.map((comment) => (
                    <h1
                      key={comment.id}
                      className="mb-1 text-blue-500 font-bold text-center"
                    >
                      {comment.text}
                    </h1>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => router.push("/")}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 hover:shadow-lg mt-6"
      >
        Back to home 🏠
      </button>
    </div>
  );
}
