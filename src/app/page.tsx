/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";

// Frontend.
export default function Home() {
  const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const router = useRouter();

  // State to hold uploaded image URL.
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Function to send image URL to backend.
  const storeImageUrlInDB = async (url: string) => {
    try {
      const response = await fetch("/api/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // Send image URL.
      });

      if (!response.ok) {
        throw new Error("Failed to store image URL");
      }

      const data = await response.json();
      console.log("Image stored in database:", data);
    } catch (error) {
      console.error("Error storing image:", error);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-white bg-pink-300 text-3xl font-medium py-2 px-4 inline-block">
        Image upload app 🏕️⭐🍕
      </h1>
      <section className="flex flex-col items-center justify-between p-0">
        <CldUploadWidget
          uploadPreset="next_cloudinary_app"
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            console.table(result);

            // Check if the result contains a valid URL
            if (typeof result.info !== "string" && result.info.secure_url) {
              const imageUrl = result.info.secure_url;
              setImageUrl(imageUrl); // Store image URL in state.
              storeImageUrlInDB(imageUrl); // Call backend to store it.

              // Redirect to the add-comment page with the image URL
              router.push(
                `/add-comment?imageUrl=${encodeURIComponent(imageUrl)}`
              );
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

        {/* New "Show Images" Button */}
        <button
          onClick={() => router.push("/show-images")}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 hover:shadow-lg transition-all mt-4"
        >
          Show images 📷
        </button>
      </section>
    </div>
  );
}
