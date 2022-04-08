import firebase from "../../Services/firebaseconnection";
import "../../Styles/css/loginStyle.css";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Register() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    async function newUser() {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                setUserValue(value);
                await firebase
                    .firestore()
                    .collection("users")
                    .doc(value.user.id)
                    .set({
                        nickname: nickname,
                        email: email,
                        password: password,
                    })
                    .then(() => {
                        setNickname("");
                        setEmail("");
                        setEmail("");
                        setPassword("");
                        navigate("/");
                    })
            })
            .catch((error) => {
                if (error.code === "auth/weak-password") {
                    toast.error('Your password is too weak', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else if (error.code === "auth/email-already-in-use")
                    toast.warn('Email already in use', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            })
    }



    return (
        <div>
            <div>
                <div id="login-form-wrap">
                    <h2>SIGN UP:</h2>
                    <div id="login-form">
                        <p>
                            <input onChange={(e) => { setNickname(e.target.value) }} value={nickname} required autoComplete="off" className="login" type="nickname" id="nickname" name="nickname" placeholder="Nickname" />
                        </p>
                        <p>
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} required autoComplete="off" className="login" type="email" id="email" name="email" placeholder="Email" />
                        </p>
                        <p>
                            <input onChange={(e) => { setPassword(e.target.value) }} value={password} required autoComplete="off" className="login" type="password" id="password" name="password" placeholder="Senha" />
                        </p>
                        <p>
                            <button onClick={newUser} className="logbtn">Register</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}