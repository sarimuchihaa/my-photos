// Imports.
"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

// Frontend.
export default function Home() {
  // State to hold uploaded image URL.
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <main className="p-8 text-center">
      <h1 className="text-white bg-pink-300 text-3xl font-medium py-2 px-4 inline-block">
        Image Upload App 🏕️⭐🍕
      </h1>
      <section className="flex flex-col items-center justify-between">
        <CldUploadWidget
          uploadPreset="next_cloudinary_app"
          onSuccess={(result: any) => {
            console.log(result);
            // Set image URL after successful upload.
            if (result?.info?.secure_url) {
              setImageUrl(result.info.secure_url); // Store the image URL in state
            }
          }}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 hover:shadow-lg transition-all mt-4"
            >
              Upload image 🧡
            </button>
          )}
        </CldUploadWidget>

        {/* Display uploaded image */}
        {imageUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Uploaded Image:</h2>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-64 h-auto rounded shadow-lg"
            />
          </div>
        )}
      </section>
    </main>
  );
}
