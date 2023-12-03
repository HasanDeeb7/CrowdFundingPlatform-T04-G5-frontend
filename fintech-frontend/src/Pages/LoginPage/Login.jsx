import { useState } from "react";
import LoginForm from "../../Layouts/LoginForm/LoginForm";
import SignUpFrom from "../../Layouts/SignupForm/SignUpFrom";
import "./Login.css";
import { AnimatePresence, delay, motion } from "framer-motion";
function Login() {
  const [login, setLogin] = useState(true);
  const loginFormVariant = {
    closed: { transform: "translateX(30px)", opacity: 0, scale: 0 },
    opened: { transform: "translateX(0)", opacity: 1, scale: 1 },
    leave: { transform: "translateX(-30)", opacity: 1, scale: 1 },
  };
  return (
    <div className="loginContainer">
      <div className="loginFormWrapper">
        {login && (
          <AnimatePresence>
            <motion.div
              variants={loginFormVariant}
              initial="closed"
              animate="opened"
              exit="leave"
              transition={{ duration: 0.5, ease: [0, 0.7, 0.2, 1] }}
              className="loginFormWrapper"
              style={{backgroundColor: 'transparent'}}
            >
              <LoginForm />
              Don't Have an Account?{" "}
              <span>
                <span
                  className="loginLink"
                  href="#"
                  onClick={() => setLogin(false)}
                >
                  Create one
                </span>
              </span>
            </motion.div>
          </AnimatePresence>
        )}
        {!login && (
          <AnimatePresence>
            <motion.div
              variants={loginFormVariant}
              initial="closed"
              animate="opened"
              exit="leave"
              transition={{ duration: 0.5, ease: [0, 0.7, 0.2, 1] }}
              className="loginFormWrapper"
              style={{backgroundColor: 'transparent'}}

            >
              {" "}
              <SignUpFrom /> Already have an Account?{" "}
              <span className="loginLink" onClick={() => setLogin(true)}>
                Sign In
              </span>{" "}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default Login;
