import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt"

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator')
    console.log("I am actually running")

    return new Response(JSON.stringify(prompts), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}