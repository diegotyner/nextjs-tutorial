import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt"

export const GET = async (req: Request) => {
  console.log("I am actually running")
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator')
    console.log("I am actually running")

    return new Response(JSON.stringify(prompts), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
}

export const revalidate = 0;