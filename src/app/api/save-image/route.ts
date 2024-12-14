import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Extract url field from json body by parsing.
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "Image URL is required." }), {
        status: 400,
      });
    }

    // Use Prisma to create new record in photo table in database.
    // Data object specifies column url and its value.
    const photo = await prisma.photo.create({
      data: {
        url,
      },
    });

    return new Response(JSON.stringify(photo), { status: 201 });
  } catch (error) {
    console.error("Error saving photo:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
    });
  }
}
