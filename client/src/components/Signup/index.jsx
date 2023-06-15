import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import styles from "./styles.module.css"

const Signup = () => {
    const [data, setData] = useState({
        firstName: "", lastName: "", email: "", password: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:5050/api/users"
            const {data: res} = await axios.post(url, data)
            navigate("/login")
            console.log(res.message)
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (<section className="text-center text-lg-start pt-3 mt-3">
        <div className="container py-4 ">
            <div className="row g-0 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <div className={`card ${styles.cascading_right} ${styles.mordowez}`}>
                        <div className="card-body p-5 shadow-5 text-center ">
                            <h2 className="fw-bold mb-5">Sign up now</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                onChange={handleChange}
                                                value={data.firstName}
                                                required
                                                className="form-control"
                                                id="form3Example1"
                                            />
                                            <label className="form-label" htmlFor="form3Example1"></label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                onChange={handleChange}
                                                value={data.lastName}
                                                required
                                                className="form-control"
                                                id="form3Example2"
                                            />
                                            <label className="form-label" htmlFor="form3Example2"></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                        value={data.email}
                                        required
                                        className="form-control"
                                        id="form3Example3"
                                    />
                                    <label className="form-label" htmlFor="form3Example3"></label>
                                </div>
                                <div className="form-outline mb-1">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                        value={data.password}
                                        required
                                        className="form-control"
                                        id="form3Example4"
                                    />
                                    <label className="form-label" htmlFor="form3Example4"></label>
                                </div>
                                {error && <div
                                    className={styles.error_msg}>{error}</div>}
                                <button type="submit" className="btn btn-primary btn-block mt-2 mb-4">
                                    Sign up
                                </button>
                            </form>
                            <div>
                                <p className="mb-2">Already signed up? <a href="/login"
                                                                          className="fw-bold">Login</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <img src="/photo1.jpg"
                         className="w-100 rounded-4 shadow-4"
                         alt="f1"/>
                </div>
            </div>
        </div>
    </section>);
};
export default Signup


// (<div className={styles.signup_container}>
//     <div className={styles.signup_form_container}>
//         <div className={styles.left}>
//             <h1>Welcome Back</h1>
//             <Link to="/login">
//                 <button type="button"
//                         className={styles.white_btn}>
//                     Sing in
//                 </button>
//             </Link>
//         </div>
//         <div className={styles.right}>
//             <form className={styles.form_container}
//                   onSubmit={handleSubmit}>
//                 <h1>Create Account</h1>
//                 <input
//                     type="text"
//                     placeholder="First Name"
//                     name="firstName"
//                     onChange={handleChange}
//                     value={data.firstName}
//                     required
//                     className={styles.input}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Last Name"
//                     name="lastName"
//                     onChange={handleChange}
//                     value={data.lastName}
//                     required
//                     className={styles.input}
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     name="email"
//                     onChange={handleChange}
//                     value={data.email}
//                     required
//                     className={styles.input}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     onChange={handleChange}
//                     value={data.password}
//                     required
//                     className={styles.input}
//                 />
//                 {error && <div
//                     className={styles.error_msg}>{error}</div>}
//                 <button type="submit"
//                         className={styles.green_btn}>
//                     Sing Up
//                 </button>
//             </form>
//         </div>
//     </div>
// </div>);