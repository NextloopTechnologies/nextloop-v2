type FileUploadAPIResponse = {
  fileId: string;
  url: string
}

export const uploadResume = async (resumeFile: FormData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/upload`, {
      method: "POST",
      body: resumeFile
    });
    const { data, success }: { data: FileUploadAPIResponse | null, success: boolean } = await response.json();
    if (!success) throw new Error("Failed to upload!")
    return { data, success }
  } catch (error) {
    console.log("UPLOAD_ERROR", error)
    return { error, success: false }
  }
}