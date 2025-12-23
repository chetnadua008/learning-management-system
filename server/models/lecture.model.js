import mongoose from "mongoose";
const lectureSchema = new mongoose.Schema({
    lectureTitle: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    publicId: {
        type: String,
    },
    isPreviewFree: {
        type: Boolean,
    },

})
export const Lecture = mongoose.model("lecture", lectureSchema);        //lecture = collection name