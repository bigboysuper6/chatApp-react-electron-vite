import People from "@/components/People";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ReactComponent as FileSvg } from "@assets/file.svg";
import { downloadFile } from "@/api/message";
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
    const handleDownload = async (message: any) => {
        await downloadFile({
            filename: message,
        })
            .then((response) => {
                const url = URL.createObjectURL(response.data);
                const a = document.createElement("a");
                a.href = url;
                a.download = message.slice(message.lastIndexOf("_") + 1); // 指定下载时的文件名
                a.click();
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Download error:", error);
            });
    };

    const menuItems = ["下载"];
    const handleEvents = [handleDownload];
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
                            menuItems={menuItems}
                            handleEvents={handleEvents.map(
                                (cur) => () => cur(item.content)
                            )}
                            direction={"dropstart"}
                        />
                    );
                }
            })}
        </>
    );
};

export default FileTab;
