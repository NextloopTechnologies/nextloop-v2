/* eslint-disable no-useless-catch */
import { AppliedJob } from "../types"
import supabaseClient from "./client"

export const createAppliedJob = async (values: AppliedJob) => {
  try {
    const { error } = await supabaseClient
      .from('applied_jobs')
      .insert(values)

    if (!error) return { success: true, msgText: "Created!", status: 201 }
    return { success: false, msgText: "Failed to create!", status: 500 }
  } catch (error) {
    throw error
  }
}