import { Buffer } from "buffer";
import { BufferData } from "../interfaces/User";
interface Props {
    image: BufferData | undefined;
    type: string;
}

function Image({ image, type }: Props) {
    if (!image || image.data.length === 0) {
        return getImageForType(type);
    }
    let b64;
    if (typeof image.data === "string") {
        b64 = image.data;
    } else {
        b64 = Buffer.from(image.data).toString("base64");
    }
    return <img src={`data:${image.contentType};base64,${b64}`} alt={type} />;
}

const getImageForType = (type: string) => {
    let imageSrc: string = "assets/";
    switch (type) {
        case "profile":
            imageSrc += "profile.png";
            break;
        case "post":
            imageSrc += "post.png";
            break;
    }
    return <img src={imageSrc} alt={type} />;
};
export default Image;
