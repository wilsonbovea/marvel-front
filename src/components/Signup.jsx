const Signup = ({ setDisplay }) => {
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
      >
        <label className="label" htmlFor="username">
          <p>Username: </p>
          <input
            type="text"
            placeholder="username"
            id="username"
            name="username"
          />
        </label>
        <label className="label" htmlFor="email">
          <p>Email: </p>
          <input type="text" placeholder="email" id="email" name="email" />
        </label>
        <label className="label" htmlFor="password">
          <p>Password:</p>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
        </label>
        <button>S'inscrire</button>
      </form>
    </main>
  );
};
export default Signup;
