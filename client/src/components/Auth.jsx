import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Field, { useForm } from "./Field";

export default function Auth({ mode }) {
  const isLogin = mode === "login";
  const { login, register } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState("");
  const { values, onChange } = useForm({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await (isLogin ? login(values) : register(values));
      nav("/tournaments");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card narrow" onSubmit={submit}>
      <h1>{isLogin ? "Log in" : "Create your account"}</h1>
      {error && <p className="error" role="alert">{error}</p>}
      {!isLogin && <Field label="Full name" name="name" value={values.name} onChange={onChange} />}
      <Field label="Email" name="email" type="email" value={values.email} onChange={onChange} />
      <Field label="Password" name="password" type="password" value={values.password} onChange={onChange} minLength={6} />
      <button className="btn">{isLogin ? "Log in" : "Create account"}</button>
      <p className="hint">
        {isLogin ? <>No account? <Link to="/register">Register</Link></> : <>Already registered? <Link to="/login">Log in</Link></>}
      </p>
    </form>
  );
}