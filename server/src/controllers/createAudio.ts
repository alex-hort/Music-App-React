import { RequestWithFiles } from "#/middleware/fileParser";
import { categoriesTypes } from "#/utils/audio_category";
import { RequestHandler } from "express";
import formidable from "formidable";
import cloudinary from "#/cloud";
import Audio from "#/models/audio";

interface CreateAudioRequest extends RequestWithFiles {
    body: {
        title: string;
        about: string;
        category: categoriesTypes;
    }
}

export const createAudio: RequestHandler = async (req: CreateAudioRequest, res) => {
    try {
        const { title, about, category } = req.body;
        const poster = req.files?.poster as formidable.File;
        const audioFile = req.files?.file as formidable.File;
        const ownerId = req.user.id as string;

        if (!audioFile) return res.status(422).json({ message: "Audio file is missing" });

        const audioRes = await cloudinary.uploader.upload(audioFile.filepath, {
            resource_type: "video",
        });

        const newAudio = new Audio({
            title,
            about,
            category,
            owner: ownerId,
            file: { url: audioRes.url, publicId: audioRes.public_id },
        });

        if (poster) {
            const posterRes = await cloudinary.uploader.upload(poster.filepath, {
                width: 300,
                height: 300,
                crop: "thumb",
                gravity: "face",
            });
            newAudio.poster = { url: posterRes.url, publicId: posterRes.public_id };
        }

        await newAudio.save();
        res.status(201).json({ message: "Audio created successfully", audio: newAudio });

   } catch (err) {
    console.error("RAW ERROR:", err);
    console.error("TYPE:", typeof err);
    console.error("JSON:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: String(err) });
}
};
