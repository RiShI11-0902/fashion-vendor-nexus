"use client";

import { useState } from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ImageUpload } from "../ui/image-upload";
import { Input } from "./input";
import axios from "axios";

export const AiModelGenerate = ({ field }) => {
    const [image, setImage] = useState(null)
    const [prompt, setPrompt] = useState("Generate an indian fair model wearing this product")
    const [generatedImage, setgeneratedImage] = useState()

    const generate = async () => {

        if (!image && !prompt) return;

        const formData = new FormData();
        formData.append("image", image); // raw File
        formData.append("prompt", prompt);

        try {
            const sendData = await axios.post("http://localhost:5000/api/generate-model", formData , {
                headers: { "Content-Type": "multipart/form-data" },
            })
            console.log(sendData);
            setgeneratedImage(sendData.data.image)

        } catch (error) {
            console.log(error);
        }


    }
    return (
        <Dialog>
            {/* Trigger button */}
            <DialogTrigger asChild>
                <Button>Generate AI Model</Button>
            </DialogTrigger>

            {/* Dialog content */}
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>AI Model Generator</DialogTitle>
                    <DialogDescription>
                        Upload your Product Image and prompt below
                    </DialogDescription>
                </DialogHeader>

                {
                    generatedImage &&
                    <img src={generatedImage} />
                }

                {/* Example content */}
                <div className="mt-4">
                    <ImageUpload
                        value={field.value}
                        onChange={(file) => {
                            setImage(file)
                            if (!file) field.onChange(''); // Clear field if no file
                        }}
                        onUrlChange={(url) => {
                            field.onChange(url); // Set the URL directly in form field
                        }}
                        placeholder="Upload product image or enter URL"
                    />
                    <Input
                        placeholder="Enter you prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />

                    <Button type="button" onClick={generate}>Generate</Button>
                </div>

                {/* Optional close button */}
                {/* <DialogClose className="absolute top-3 right-3">✕</DialogClose> */}
            </DialogContent>
        </Dialog>
    );
};
