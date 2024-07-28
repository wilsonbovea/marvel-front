import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Signup = ({ setDisplay, getCookie }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!userEmail || !userPassword || !userName) {
        return setErrorMessage("Veuillez remplir tous les champs");
      }
      setIsSubmitting(true);
      const { data } = await axios.post(
        "https://site--marvel-backend--7pddggdgmnqf.code.run/signup",

        {
          username: userName,
          email: userEmail,
          password: userPassword,
        }
      );

      // setUserToken(data.token);
      console.log(data);
      Cookies.set("userToken", data.token);
      setDisplay(0);
      // setConnected(true);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
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
        <label className="label" htmlFor="username">
          <p>Username: </p>
          <input
            value={userName}
            type="text"
            placeholder="username"
            id="username"
            name="username"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </label>
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
        <button disabled={isSubmitting}>S'inscrire</button>
        <p className="connexion" onClick={() => setDisplay(3)}>
          Tu as déja un compte ? Connecte-toi !
        </p>
      </form>
    </main>
  );
};
export default Signup;
