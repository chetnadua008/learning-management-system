import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'
const mediaApi = 'http://localhost:8080/api/v1/media'
const LectureTab = () => {
    //state variables
    const [title, setTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [buttonDisable, setButtonDisable] = useState(true);


    //handler
    const fileChangeHandler = async (e) => {

        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);  //upload.single("file") same use
            setMediaProgress(true);
            try {
                const res = await axios.post(`${mediaApi}/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round(loaded * 100) / total);
                    }
                })
                if (res.data.success) {
                    setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id });
                    setButtonDisable(false);
                    toast.success(res.data.message || "video uploaded")
                }
            } catch (error) {
                console.log(error);
                toast.error('video upload failed')
            } finally {
                setMediaProgress(false);
            }
        }
    }
    return (
        <Card className='py-5'>
            <CardHeader className='flex justify-between'>
                <div>
                    <CardTitle>
                        Edit Lecture
                    </CardTitle>
                    <CardDescription>
                        Make Changes and CLick save when done
                    </CardDescription>
                </div>
                <div>
                    <Button variant='destructive'>
                        Remove Lecture
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='space-y-5'>
                <div>
                    <Label>Title</Label>
                    <Input
                        placeholder='introduction to javascript'
                        type='text'
                    />
                </div>
                <div>
                    <Label>Video<span className=' text-red-700'>*</span></Label>
                    <Input
                        placeholder='introduction to javascript'
                        type='file'
                        accept='video/*'
                        onChange={fileChangeHandler}
                        className='w-fit'
                    />
                </div>

                {
                    mediaProgress && (<div className='my-4'>
                        <Progress value={uploadProgress}></Progress>
                        <p>{uploadProgress} % uploaded</p>
                    </div>)
                }

                <div className='flex items-center space-x-2'>
                    <Switch id="airplane-mode" />
                    <Label>Is this video free</Label>
                </div>
                <div>
                    <Button disabled={buttonDisable}>Update Lecture</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab