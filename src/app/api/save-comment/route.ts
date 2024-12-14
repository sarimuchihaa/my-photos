import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { comment, imageUrl } = await req.json();

    if (!comment || !imageUrl) {
      return new Response(
        JSON.stringify({ error: "Comment and image URL are required." }),
        { status: 400 }
      );
    }

    // Retrieve photo ID using image URL.
    const photo = await prisma.photo.findUnique({
      where: { url: imageUrl },
    });

    if (!photo) {
      return new Response(JSON.stringify({ error: "Image not found." }), {
        status: 404,
      });
    }

    // Create comment and associate it with photo ID.
    const newComment = await prisma.comment.create({
      data: {
        text: comment,
        photoId: photo.id, // Associate comment with correct photo.
      },
    });

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.error("Error saving comment:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
    });
  }
}
