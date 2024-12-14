import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all photos with their associated comments.
    const photosWithComments = await prisma.photo.findMany({
      include: {
        comments: true, // Include associated comments
      },
    });

    return new Response(JSON.stringify(photosWithComments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching photos with comments:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
    });
  }
}
