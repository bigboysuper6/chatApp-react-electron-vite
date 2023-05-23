import People from "@/components/People";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ReactComponent as FileSvg } from "@assets/file.svg";
const FileTab = () => {
    const messages = useSelector<RootState, any[]>((state) => {
        return state.message.value.messages;
    });
    const groupInfo = useSelector((state: any) => {
        return state.message.value.groupInfo;
    });

    const setAvatar = (userId: string) => {
        if (userId == groupInfo.owner?._id) {
            return groupInfo.owner?.avatar;
        } else {
            return groupInfo.members?.find((item: any) => {
                return item?._id == userId;
            })?.avatar;
        }
    };

    return (
        <>
            {messages.map((item) => {
                if (item.file) {
                    const avatar = setAvatar(item.userId);
                    return (
                        <People
                            isFiles={true}
                            name={item.content
                                .replace("http://localhost:3000/files/", "")
                                .split("_")
                                .slice(2)
                                .join("_")}
                            fileSize={item.fileSize}
                            avatars={[avatar]}
                            Svg={<FileSvg />}
                        />
                    );
                }
            })}
        </>
    );
};

export default FileTab;
