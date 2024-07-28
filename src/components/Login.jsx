import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = ({ setDisplay, getCookie }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!userEmail || !userPassword) {
        return setErrorMessage("Veuillez remplir tous les champs");
      }
      setIsSubmitting(true);
      const { data } = await axios.post(
        "https://site--marvel-backend--7pddggdgmnqf.code.run/login",

        {
          email: userEmail,
          password: userPassword,
        }
      );

      Cookies.set("userToken", data.token);
      setDisplay(0);
    } catch (error) {
      console.log("Offer page - catch >", error.response);
      setErrorMessage("le mot de passe ou l'e-mail sont incorrects");
    }

    setIsSubmitting(false);
    getCookie();
  };
  return (
    <main
      className="modal"
      onClick={() => {
        setDisplay(0);
      }}
    >
      <form
        className="modal-button"
        onClick={(event) => {
          event.stopPropagation();
        }}
        onSubmit={onSubmit}
      >
        <label className="label" htmlFor="email">
          <p>Email: </p>
          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            value={userEmail}
            required
            onChange={(event) => {
              setUserEmail(event.target.value);
            }}
          />
        </label>
        <label className="label" htmlFor="password">
          <p>Password:</p>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={userPassword}
            onChange={(event) => {
              setUserPassword(event.target.value);
            }}
          />
        </label>
        <span>{errorMessage}</span>
        <button disabled={isSubmitting}>Se connecter</button>
        <p className="connexion" onClick={() => setDisplay(2)}>
          Pas encore une compte ? Inscris-toi !
        </p>
      </form>
    </main>
  );
};
export default Login;
