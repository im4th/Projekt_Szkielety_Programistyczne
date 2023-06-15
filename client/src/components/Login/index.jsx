import {useState} from "react"
import axios from "axios"
import styles from "./styles.module.css"

const Login = () => {
    const [data, setData] = useState({email: "", password: ""})
    const [error, setError] = useState("")
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:5050/api/auth"
            const {data: res} = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }
    return (<section className={`vh-100 ${styles.gradient_custom}`}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className={`card bg-dark text-white`}>
                        <div className="card-body p-5 text-center">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-md-2 mt-md-4 pb-5">

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            onChange={handleChange}
                                            value={data.email}
                                            required
                                            className="form-control form-control-lg ej"
                                            id="typeEmailX"
                                        />
                                        <label className="form-label" htmlFor="typeEmailX"></label>
                                    </div>
                                    <div className="form-outline form-white">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={handleChange}
                                            value={data.password}
                                            required
                                            className="form-control form-control-lg"
                                            id="typePasswordX"
                                        />
                                        <label className="form-label" htmlFor="typePasswordX"></label>
                                    </div>
                                    {error && <div
                                        className={`mb-4 ${styles.error_msg}`}>{error}</div>}
                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login
                                    </button>
                                </div>
                            </form>
                            <div>
                                <p className="mb-2">Don't have an account? <a href="/signup"
                                                                              className="text-white-50 fw-bold">Sign
                                    Up</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}
export default Login;

// (
//     <div className={styles.login_container}>
//         <div className={styles.login_form_container}>
//             <div className={styles.left}>
//                 <form className={styles.form_container}
//                       onSubmit={handleSubmit}>
//                     <h1>Login to Your Account</h1>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         name="email"
//                         onChange={handleChange}
//                         value={data.email}
//                         required
//                         className={styles.input}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         name="password"
//                         onChange={handleChange}
//                         value={data.password}
//                         required
//                         className={styles.input}
//                     />
//                     {error && <div
//                         className={styles.error_msg}>{error}</div>}
//                     <button type="submit"
//                             className={styles.green_btn}>
//                         Sing In
//                     </button>
//                 </form>
//             </div>
//             <div className={styles.right}>
//                 <h1>New Here ?</h1>
//                 <Link to="/signup">
//                     <button type="button"
//                             className={styles.white_btn}>
//                         Sing Up
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     </div>
// )