import React, { useRef, useState } from "react"
import { BASE_API_URL } from "../api"
import { LuUpload } from "react-icons/lu"
import { useAppContext } from "../context/appContext"

import { useQueryClient } from "@tanstack/react-query"

import { useNavigate } from "react-router-dom"

const FileUpload = () => {
  const fileInputRef = useRef(null)

  const queryClient = useQueryClient()

  const { setLoading } = useAppContext()
  const navigate = useNavigate()

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      uploadFile(selectedFile)
    }
  }

  const uploadFile = async (selectedFile) => {
    const formData = new FormData()
    formData.append("audioData", selectedFile)

    setLoading(true)

    try {
      const response = await fetch(`${BASE_API_URL}/api/recordings`, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Recording uploaded successfully:", result)
        navigate(`/calls/${result._id}`)
      } else {
        const error = await response.json()
        console.error("Error uploading recording:", error)
      }
    } catch (error) {
      console.error("Error during fetch operation:", error)
    }

    queryClient.invalidateQueries({ queryKey: ["calls-all"] })
    setLoading(false)
  }

  return (
    <>
      <input
        className="hidden"
        type="file"
        accept=".wav, .mp3, .flac"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        onClick={handleButtonClick}
        className="bg-slate-100 text-slate-800 font-bold rounded-md py-2 px-2 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
      >
        <span>Upload recording</span>
        <LuUpload />
      </button>
    </>
  )
}

export default FileUpload
