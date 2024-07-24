import Prompt from "@/models/prompt"
import User from "@/models/user"
import { connectToDB } from "@/utils/database";


export const GET = async (req: Request) => {
  console.log("I am actually running")
  try {
    await connectToDB();
    const prompts = await Prompt.find({})
    console.log("Promps fetched successfully")

    return new Response(JSON.stringify(prompts), { status: 200,   headers: { 'Cache-Control': 'no-store' }, })
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch all prompts", { status: 501 })
  }
}

export const revalidate = 0;