import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./auth.css";
import { useAuth } from "../../context/auth-context";
import { useUserData } from "../../context/user-data-context";
import { useDocumentTitle } from "../../hooks/useDocumentTilte";
export const Login = () => {
    const location = useLocation();
    const { userlogin } = useAuth();
    const defaultLoginValue = {
        email: "",
        password: "",
    }
    const { userDataState, userDataDispatch } = useUserData()
    const [loginDetail, setloginDetail] = useState({ ...defaultLoginValue });
    const [showPassWord, setShowPassword] = useState(false);

    const setValue = (key, value) => {
        setloginDetail((prev) => {
            return {
                ...prev,
                [key]: value.trim(),
            };
        });
    };

    useEffect(() => {
        useDocumentTitle("Login")
    }, [])

    console.log(showPassWord)

    return (
        <div>
            <main className="flex-center">
                <div className=" auth-position auth-form">
                    <form
                        action=""
                        className="auth-wrapper"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const data = await userlogin(loginDetail, location);
                            userDataDispatch({
                                type: "login",
                                payload: {
                                    loginData: data.foundUser
                                }
                            })
                            setloginDetail({ ...defaultLoginValue })
                        }}
                    >
                        <div>
                            <h2 className="text-center">login</h2>
                        </div>
                        <div className="flex-col">
                            <label htmlFor="email">
                                Email address <span className="require-star">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="fs-sm input-padding"
                                value={loginDetail.email}
                                autoComplete="off"
                                required
                                onChange={(e) => {
                                    setloginDetail((prev) => {
                                        return {
                                            ...prev,
                                            email: e.target.value,
                                        };
                                    });
                                }}
                            />
                        </div>
                    <div className="flex-col" >
                            <label htmlFor="password" >
                                <span>
                                    Password <span className="require-star">*</span>
                                </span>
                            </label>
                            <div className="flex-between" style={{position: "relative"}}>
                                <input
                                    type={showPassWord ? "text" : "password"}
                                    style={{paddingRight: "3rem"}}
                                    id="password"
                                    className="fs-sm input-padding w-100"
                                    value={loginDetail.password}
                                    required
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setValue("password", e.target.value);
                                    }}
                                />
                                {showPassWord ? (
                                    <span
                                        className="mr-3 fa fa-eye show-password-icon"
                                        onClick={(e) => setShowPassword(false)}
                                    ></span>
                                ) : (
                                    <span
                                        className="mr-3 fa fa-eye-slash show-password-icon"
                                        onClick={(e) => setShowPassword(true)}
                                    ></span>
                                )}
                            </div>

                        </div>
                        <div className="text-center mt-1">
                            <button className="btn-sm border-squre form-submit btn-block" type="submit">
                                Login
                            </button>
                        </div>
                        <div className="text-center mt-1">
                            <button className="btn-sm border-squre form-submit btn-block" type="submit" onClick={async (e) => {
                                e.preventDefault();
                                const data = await userlogin({
                                    email: "ravikumar@gmail.com",
                                    password: "ravikumar",
                                }, location);
                                userDataDispatch({
                                    type: "login",
                                    payload: {
                                        loginData: data.foundUser
                                    }
                                })
                                setloginDetail({ ...defaultLoginValue })
                            }}>
                                Guest Login
                            </button>
                        </div>
                        <div className="text-center mt-1">
                            <Link
                                to="/signup"
                                state={location?.state}
                                className="btn-icon-text-right centre"
                            >
                                Create New Account
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
