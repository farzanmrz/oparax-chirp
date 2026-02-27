"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

interface CreateWorkflowInput {
  name: string
  description: string
  frequency: string
  handles: string[]
  styleRules: string
  exampleTweet: string
}

const VALID_FREQUENCIES = ["15m", "30m", "1h", "2h"]

function generateWorkflowName(description: string): string {
  const words = description.trim().split(/\s+/)
  let name = ""
  for (const word of words) {
    if ((name + " " + word).trim().length > 40) break
    name = (name + " " + word).trim()
  }
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export async function createWorkflow(input: CreateWorkflowInput) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  if (!input.description.trim()) {
    return { error: "Description is required." }
  }
  if (!VALID_FREQUENCIES.includes(input.frequency)) {
    return { error: "Invalid frequency." }
  }
  if (input.handles.length > 10) {
    return { error: "Maximum 10 handles allowed." }
  }

  const name = input.name.trim() || generateWorkflowName(input.description)

  const { error } = await supabase.from("workflows").insert({
    user_id: user.id,
    name,
    description: input.description.trim(),
    frequency: input.frequency,
    handles: input.handles,
    style_rules: input.styleRules.trim() || null,
    example_tweet: input.exampleTweet.trim() || null,
    status: "active",
  })

  if (error) {
    return { error: "Failed to create workflow. Please try again." }
  }

  redirect("/dashboard")
}
