import Prompt from "@/models/prompt";
import User from '@/models/user';
import { connectToDB } from "@/utils/database";


export const GET = async (req: Request) => {
  console.log("API route /api/prompt called");
  try {
    await connectToDB();
    console.log("Fetching prompts...");
    const prompts = await Prompt.find({}).populate("creator", "email username image", User)
    console.log("Promps fetched successfully")

    return new Response(JSON.stringify(prompts), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
}

export const revalidate = 0;