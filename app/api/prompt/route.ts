import Prompt from "@/models/prompt";
import User from '@/models/user';
import { connectToDB } from "@/utils/database";


export const GET = async (req: Request) => {
  try {
    await connectToDB();
    console.log("Fetching prompts...");
    const prompts = await Prompt.find({}).populate("creator", "email username image", User)

    return new Response(JSON.stringify(prompts), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
}

export const revalidate = 0;