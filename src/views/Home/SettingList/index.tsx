import { useDispatch } from "react-redux";
import SettingCardGroup from "./components/SettingCardGoup";
import Search from "@/components/Search";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    area as changeArea,
    phoneNumber as changePhoneNumber,
    email as changeEmail,
    password as changePassword,
    avatar as changeAvatar,
    name as changeName,
} from "@/api/user";
import {
    setEmail,
    setPhoneNumber,
    setArea,
    setName,
    setAvatar,
} from "@/app/Slices/user";

const SettingList = () => {
    const settingGroup = [
        {
            title: "Account",
            data: [
                { value: "修改密码", type: "password" },
                { value: "修改电子邮箱", type: "email" },
                { value: "修改手机号", type: "phoneNumber" },
            ],
        },
        {
            title: "Person",
            data: [
                { value: "修改头像", type: "avatar" },
                { value: "修改昵称", type: "name" },
                { value: "修改地区", type: "area" },
            ],
        },
    ];
    const dispatch = useDispatch();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            email: "",
            phoneNumber: "",
            area: "",
            currentPassword: "",
            password: "",
            name: "",
            avatar: "",
        },
    });

    const onSubmit: SubmitHandler<any> = async (data) => {
        const {
            area,
            phoneNumber,
            email,
            currentPassword,
            password,
            name,
            avatar,
        } = data;
        if (area?.length > 0) {
            await changeArea({ area });
            dispatch(setArea({ area }));
            reset({ area: "" });
        }
        if (phoneNumber?.length > 0) {
            await changePhoneNumber({ phoneNumber });
            dispatch(setPhoneNumber({ phoneNumber }));
            reset({ phoneNumber: "" });
        }

        if (email?.length > 0) {
            await changeEmail({ email });
            dispatch(setEmail({ email }));
            reset({ email: "" });
        }

        if (currentPassword?.length > 0 && password?.length > 0) {
            await changePassword({ currentPassword, password });
            reset({ password: "", currentPassword: "" });
        }

        if (name?.length > 0) {
            await changeName({ name });
            dispatch(setName({ name }));
            reset({ name: "" });
        }

        if (avatar?.length > 0) {
            // console.log(data);
            await changeAvatar({ avatar: avatar[0] });
            dispatch(setAvatar({ avatar }));
            reset({ avatar: "" });
        }
    };

    return (
        <>
            <div className="chat-list hidden-overflow px-4 bg-light ">
                <h2 className="fw-bold">设置</h2>
                <Search />
                {settingGroup.map((item: any) => {
                    return (
                        <SettingCardGroup
                            title={item.title}
                            data={item.data}
                            control={control}
                            handleSubmit={handleSubmit(onSubmit)}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default SettingList;
