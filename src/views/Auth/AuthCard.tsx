import { Form, Input, Label, FormGroup, Row, Col, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { login, register } from "@api/user";
import { debounce } from "@/utils/utils";
import { useCallback } from "react";
type AuthCardProps = {
    model: string | boolean;
};

//debounce login event

const AuthCard = ({ model }: AuthCardProps) => {
    const isSignUp: Boolean = model === "SignUp";

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            "auth-username": "",
            "auth-password": "666666",
            "auth-tel": "13144912396",
            "auth-email": "1773257425@qq.com",
        },
    });

    const handleLogin = useCallback(
        debounce(async (data: any) => {
            await login({
                password: data["auth-password"],
                phoneNumber: data["auth-tel"],
            }).then((res) => {
                const token = res.headers["authorization"];
                if (token !== undefined) {
                    localStorage.setItem("Authorization", token);
                    window.location.href = "/home";
                }
            });
        }, 1000),
        []
    );

    const handleRegister = useCallback(
        debounce(async (data: any) => {
            await register({
                password: data["auth-password"],
                phoneNumber: data["auth-tel"],
                name: data["auth-username"],
                "e-mail": data["auth-email"],
            }).then((res) => {
                const token = res.headers["authorization"];
                if (token !== undefined) {
                    localStorage.setItem("Authorization", token);
                    window.location.href = "/home";
                }
            });
        }, 1000),
        []
    );

    const onSubmit = (data: any) => {
        if (isSignUp) {
            handleRegister(data);
        } else {
            handleLogin(data);
        }
    };

    return (
        <>
            <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col className="col-12">
                        {isSignUp && (
                            <>
                                <FormGroup>
                                    <Label for="auth-username">
                                        输入你用户名
                                    </Label>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                id="auth-username"
                                                type="text"
                                                className="border-0"
                                                {...field}
                                            />
                                        )}
                                        control={control}
                                        name="auth-username"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="auth-email">输入你的邮箱</Label>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                id="auth-email"
                                                type="email"
                                                className="border-0"
                                                {...field}
                                            />
                                        )}
                                        control={control}
                                        name="auth-email"
                                    />
                                </FormGroup>
                            </>
                        )}
                        <FormGroup>
                            <Label for="auth-tel">输入手机号</Label>
                            <Controller
                                control={control}
                                name="auth-tel"
                                render={({ field }) => (
                                    <Input
                                        id="auth-tel"
                                        type="tel"
                                        className="border-0"
                                        {...field}
                                    />
                                )}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="auth-password">输入你的密码</Label>
                            <Controller
                                render={({ field }) => (
                                    <Input
                                        id="auth-password"
                                        type="password"
                                        className="border-0"
                                        {...field}
                                    />
                                )}
                                control={control}
                                name="auth-password"
                            />
                        </FormGroup>
                        <Button type="submit" className="btn-lg w-100 mt-4">
                            {isSignUp ? "注册" : "登录"}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default AuthCard;
