import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Media from "@/components/Media";
const ImageTab = () => {
    const messages = useSelector<RootState, any[]>((state) => {
        return state.message.value.messages;
    });
    const image = messages
        .map((item, index) => {
            if (item.file && /\.(jpg|png)$/.test(item.content))
                return item.content;
        })
        .filter((item) => item !== undefined);
    return (
        <>
            <Media src={image} />
        </>
    );
};

export default ImageTab;
