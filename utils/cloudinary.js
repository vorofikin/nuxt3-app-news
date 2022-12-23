import { v2 as _cloudinary } from "cloudinary";

const cloudinary = () => {
    const config = useRuntimeConfig();
    _cloudinary.config({
        cloud_name: config.CLOUDINARY_CLOUD_NAME,
        api_key: config.CLOUDINARY_API_KEY,
        api_secret: config.CLOUDINARY_API_SECRET
    });
    return _cloudinary;
}

export const uploadToCloudinary = (image) => {
    return new Promise((res, rej) => {
        cloudinary().uploader.upload(image, (error, data) => {
            if (error) {
                rej(error);
            }
            res(data);
        })
    })
}
