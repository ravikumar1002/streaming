import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./auth.css"
import { useAuth } from "../../context/auth-context"

export const SignUp = () => {
    const location  = useLocation()
    const { userSignUp } = useAuth()
    const [signupDetail, setSignupDetail] = useState({
        email: "",
        password: "",
    })

    return (
        <div>
            <main>
                <div className="modal-container  auth-position">
                    <form action="" className="auth-wrapper" onSubmit={(e) => {
                        e.preventDefault()
                        // console.log(location)
                        userSignUp(signupDetail, location)
                    }}>
                        <div>
                            <h2 className="text-center">Signup</h2>
                        </div>
                        <div className="flex-col">
                            <label htmlFor="email">Email address</label>
                            <input type="email" id="email" className="fs-sm input-padding" autoComplete="off" required
                                onChange={(e) => {
                                    setSignupDetail((prev) => {
                                        return {
                                            ...prev,
                                            email: e.target.value
                                        }
                                    })
                                }}
                            />
                        </div>
                        <div className="flex-col">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="fs-sm input-padding" required autoComplete="off"
                                onChange={(e) => {
                                    setSignupDetail((prev) => {
                                        return {
                                            ...prev,
                                            password: e.target.value
                                        }
                                    })
                                }
                                }
                            />
                        </div>
                        <div className="flex-space-between p-0">
                            <span>
                                <label htmlFor="remember-me"> <input type="checkbox" id="remember-me" required autoComplete="off" /> <span>I accept all Terms & Conditions</span></label>
                            </span>
                        </div>

                        <div className="text-center">
                            <button className="btn-sm border-squre btn-primary" type="submit" >
                                Create New Account
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/login" state={location.state} className="btn-icon-text-right text-underline-none centre ">Already have an account <i className="fas fa-angle-right fs-md"></i></Link>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    )
}