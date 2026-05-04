"use client"

import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/store/useAppStore"
import { Camera, RefreshCw, ChevronLeft } from "lucide-react"

export default function UploadReport() {
  const router = useRouter()
  const addReport = useAppStore((state) => state.addReport)
  const [fileName, setFileName] = useState<string | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Could not access camera. Please use file upload fallback.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setIsCameraActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL('image/png')
        setCapturedImage(imageData)
        setFileName("captured_photo.png")
        stopCamera()
      }
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-6 fade-slide pb-24">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => router.back()} className="pressable p-2 bg-white rounded-full shadow-soft">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-text">Upload Report</h1>
      </div>

      <Card title="Upload report" subtitle="Capture or select file." className="card-highlight">
        <div className="space-y-4">
          
          {!capturedImage && !isCameraActive && (
              <div 
                className="rounded-2xl border border-dashed border-black/20 bg-black/5 p-8 text-center cursor-pointer hover:bg-black/10 transition-colors flex flex-col items-center justify-center gap-2"
                onClick={startCamera}
              >
                  <Camera size={24} className="text-highlight" />
                  <div className="text-sm font-semibold">Tap to open Camera</div>
                  <p className="mt-1 text-xs text-black/60">Takes live photo of report</p>
              </div>
          )}

          {isCameraActive && !capturedImage && (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4]">
                 <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button 
                       onClick={capturePhoto}
                       className="w-16 h-16 rounded-full bg-white border-4 border-black/20 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    />
                 </div>
              </div>
          )}

          {capturedImage && (
              <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-[3/4]">
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                  <button 
                     onClick={() => {
                        setCapturedImage(null)
                        setFileName(null)
                        startCamera()
                     }}
                     className="absolute top-2 right-2 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm text-black"
                  >
                     <RefreshCw size={16} />
                  </button>
              </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-[1px] bg-black/10"></div>
            <div className="text-xs font-semibold text-black/40">OR</div>
            <div className="flex-1 h-[1px] bg-black/10"></div>
          </div>

          <div className="w-full overflow-hidden">
            <label className="block text-xs font-semibold text-black/60 mb-1">Fallback File Input</label>
            <Input
              type="file"
              className="w-full text-ellipsis"
              accept="image/*,.pdf"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) {
                   setFileName(file.name)
                   // If they select a file, clear any captured image
                   setCapturedImage(null)
                   stopCamera()
                } else {
                   setFileName(null)
                }
              }}
            />
          </div>
          
          {fileName && (
            <div className="text-xs font-medium text-highlight bg-highlight/10 p-2 rounded-lg">
                Selected: {fileName}
            </div>
          )}

          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              disabled={!fileName}
              onClick={() => {
                addReport({
                  id: `r-${Date.now()}`,
                  title: "New Upload",
                  date: new Date().toISOString(),
                  location: "Uploaded",
                  summary: "Report uploaded and awaiting AI summary.",
                  status: "stable",
                  description: "AI analysis will be ready soon.",
                  medicines: ["Prenatal vitamins"],
                  lifestyle: ["Rest after upload"],
                  images: capturedImage ? [capturedImage] : ["/mock/report-1.svg"]
                })
                // Simulate toast notification before redirect
                router.push("/reports")
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
