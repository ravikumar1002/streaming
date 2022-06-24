import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./auth.css";
import { useAuth } from "../../context/auth-context";
import { useDocumentTitle } from "../../hooks/useDocumentTilte";

export const SignUp = () => {
    const location = useLocation();
    const { userSignUp, user } = useAuth();
    const [errorPassword, setErrorPassword] = useState(false)
    const [showPassWord, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const emptyField = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    }

    const [signupDetail, setSignupDetail] = useState({ ...emptyField });

    const setValue = (key, value) => {
        setSignupDetail((prev) => {
            return {
                ...prev,
                [key]: value.trim(),
            };
        });
    };

    const showPasswordFn = (e, passwordType, value) => {
        e.stopPropagation();
        setShowPassword((prev) => ({ ...prev, [passwordType]: value }));
    };

    const matchpassword = () => {
        if (signupDetail.confirmPassword.length > 0) {
            signupDetail.password !== signupDetail.confirmPassword ? setErrorPassword(true) : setErrorPassword(false)
        } else {
            setErrorPassword(false)
        }
    }

    useEffect(() => {
        matchpassword()
    }, [signupDetail.confirmPassword])

    useEffect(() => {
        useDocumentTitle("Signup")
    }, [])


    const checkALlInput = () => {
        const isAllFieldIsFill = {
            name: false,
            email: false,
            password: false,
        }

        const checkEmail = (email) => {
            if (email.includes("@")) {
                const emailData = email.split('@')
                if (emailData[0].length > 0 && emailData[1].length > 0) {
                    return true
                }
            }
            return false
        }

        if (signupDetail.name.length > 0) {
            isAllFieldIsFill.name = true
        } else {
            isAllFieldIsFill.name = false
        }

        if (signupDetail.email.length > 0 && checkEmail(signupDetail.email)) {
            isAllFieldIsFill.email = true
        } else {
            isAllFieldIsFill.email = false
        }
        if (signupDetail.confirmPassword === signupDetail.password) {
            isAllFieldIsFill.password = true
        } else {
            isAllFieldIsFill.password = false
        }

        if (isAllFieldIsFill.name && isAllFieldIsFill.email && isAllFieldIsFill.password) {
            return true
        }
        return false
    }

    return (
        <div>
            <main className="flex-center">
                <div className="auth-position auth-form">
                    <form
                        action=""
                        className="auth-wrapper"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await userSignUp(signupDetail, location);
                            setSignupDetail(emptyField)
                        }}
                    >
                        <div>
                            <h2 className="text-center">Signup</h2>
                        </div>
                        <div className="flex-col">
                            <label htmlFor="name">
                                Name <span className="require-star">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="fs-sm input-padding"
                                autoComplete="off"
                                value={signupDetail.name}
                                required
                                onChange={(e) => {
                                    setValue("name", e.target.value);
                                }}
                                data-error="Name is empty"
                                title="Name"
                            />
                        </div>
                        <div className="flex-col">
                            <label htmlFor="email">
                                Email address <span className="require-star">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="fs-sm input-padding"
                                autoComplete="off"
                                value={signupDetail.email}
                                required
                                onChange={(e) => {
                                    setValue("email", e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex-col">
                            <label htmlFor="password">
                                <span>
                                    Password <span className="require-star">*</span>
                                </span>
                            </label>
                            <div className="flex-between" style={{ position: "relative" }}>
                                <input
                                    type={showPassWord.password ? "text" : "password"}
                                    id="password"
                                    className="fs-sm input-padding w-100"
                                    style={{ paddingRight: "3rem" }}
                                    required
                                    value={signupDetail.password}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setValue("password", e.target.value);
                                    }}
                                />
                                {showPassWord.password ? (
                                    <span
                                        className="mr-3 fa fa-eye show-password-icon"
                                        onClick={(e) => showPasswordFn(e, "password", false)}
                                    >
                                    </span>
                                ) : (
                                    <span
                                        className="mr-3 fa fa-eye-slash show-password-icon"
                                        onClick={(e) => showPasswordFn(e, "password", true)}
                                    >
                                    </span>
                                )}
                            </div>

                        </div>
                        <div className={`flex-col ${errorPassword && "input-err"}`}>
                            <label
                                htmlFor="confirm-password"
                            >
                                <span>
                                    Confirm Password <span className="require-star">*</span>
                                </span>
                            </label>
                            <div className="flex-between" style={{ position: "relative" }}>
                                <input
                                    type={showPassWord.confirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    className={`fs-sm input-padding ${errorPassword && "errorFiled"} w-100`}
                                    value={signupDetail.confirmPassword}
                                    required
                                    style={{ paddingRight: "3rem" }}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setValue("confirmPassword", e.target.value);
                                    }}
                                />
                                {showPassWord.confirmPassword ? (
                                    <span
                                        className="mr-3 fa fa-eye show-password-icon"
                                        onClick={(e) => showPasswordFn(e, "confirmPassword", false)}
                                    >
                                    </span>
                                ) : (
                                    <span
                                        className="mr-3 fa fa-eye-slash show-password-icon"
                                        onClick={(e) => showPasswordFn(e, "confirmPassword", true)}
                                    >
                                    </span>
                                )}
                            </div>
                            {errorPassword && <div className="error-msg"> password doesn't match</div>}
                        </div>
                        <div className="text-center mt-1">
                            {
                                checkALlInput() ?
                                    <button
                                        className="btn-sm border-squre form-submit btn-block"
                                        type="submit"
                                    >
                                        Create New Account
                                    </button>
                                    :
                                    <button
                                        className="btn-sm border-squre form-submit btn-block"
                                        style={{ cursor: "not-allowed", opacity: "0.7" }}
                                        type="submit"
                                    >
                                        Create New Account
                                    </button>
                            }

                        </div>
                        <div className="text-center mt-1">
                            <Link
                                to="/login"
                                state={location?.state}
                                className="btn-icon-text-right  centre "
                            >
                                Already have an account
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
