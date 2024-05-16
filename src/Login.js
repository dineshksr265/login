import React, { useState, useEffect } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import i18n from './i18n'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = ({ onLogin }) => {
    const [mail, setMail] = useState("");
    const [pwd, setPwd] = useState("");
    const [mailError, setMailError] = useState("");
    const [submit, setSubmit] = useState(false);
    const [language, setLanguage] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();


    useEffect(() => {
        i18n.changeLanguage('en');
        setLanguage('en');
    }, []);

    const HandlerLogin = (e) => {
        e.preventDefault();

        const emailPattern = /^[A-Za-z0-9._]{3,}@[a-zA-Z]{3,}[.]{1,1}[a-zA-Z.]{2,6}$/g;

        let mailValid = true;
        let pwdValid = true;
        if (mail !== "" && !emailPattern.test(mail)) {
            setMailError("Please enter valid email");
            mailValid = false;
        } else if (mail === "" || !mail) {
            setMailError("Email Address is Required");
            console.log("mailError------", mailError)
            mailValid = false;
        } else {
            setMailError("");
            mailValid = true;
        }

        if (pwd === "") {
            pwdValid = true;
        } else {
            pwdValid = true;
        }

        setSubmit(true);
        //setPwdError("");

        if (mailValid && pwdValid) {
            //alert("Login Successfully");
            setMail("");
            setPwd("");
            navigate('/dashboard');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setMail(value);
        } else if (name === "password") {
            setPwd(value);
        } else if (name === "language") {
            setLanguage(value);
            i18n.changeLanguage(value);
        }
    };

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="login-container">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <div className="d-flex justify-content-center mb-6">
                    <img src="/login_demo_logo.png" alt="Logo of a bird in flight" className="h-20 w-20" />
                </div>
                <h2 className="text-center text-2xl font-semibold mb-6">{t('login')}</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <div className="textbox-input p-2">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <input type="email" id="email"
                                    name="email"
                                    className={`form-control ${mailError && !isEmailValid(mail) ? 'is-invalid' : ''}`}
                                    placeholder={t('email_address')}
                                    value={mail}
                                    onChange={handleInputChange}
                                    required
                                />

                                {submit && mailError && !isEmailValid(mail) && <p className="error text-danger">{t('mailError')}</p>}
                            </div>
                        </label>

                        <div className="textbox-input p-2">
                            <div className="icon">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`form-control`}
                                placeholder={t('password')}
                                value={pwd}
                                onChange={handleInputChange}
                            />


                        </div>

                    </div>
                    <div className="mb-4">
                        <button type="submit" onClick={HandlerLogin} className={`mt-3 btn btn-primary rounded-button`}>{t('login')}</button>
                    </div>
                    <div className="text-center">
                        {/* <a className="text-blue-500 hover:underline">{t('forgetPwd')}</a> */}
                        <button
                            className="link-button">{t('forgetPwd')}
                        </button>
                    </div>

                    <div className="mt-2 mb-2 select-wrapper" style={{ display: 'block', margin: 'auto' }}>

                        <select className="form-select language-select" aria-label="Default select example"
                            name="language"
                            value={language}
                            onChange={handleInputChange}
                        >
                            <option value="en">English</option>
                            <option value="ta">Tamil</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Login;
