import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, EP } from "./api";
import { useAuth } from "./AuthContext";
import Field, { useForm } from "./Field";

const id = (t) => t._id || t.id;

const when = (t) => {
  if (!t.date) return { day: "–", mon: "TBA" };
  const d = new Date(t.date);
  return { day: d.getDate(), mon: d.toLocaleString("en", { month: "short" }) };
};

export function TournamentList() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    api(EP.tournaments).then((d) => setItems(d.tournaments || d)).catch((e) => setError(e.message));
  }, []);

  return (
    <section>
      <div className="hero">
        <div>
          <h1>Find your next bracket</h1>
          <p>Browse upcoming tournaments, sign up in one click, and keep track of every registration.</p>
          {user
            ? <Link className="btn accent" to="/tournaments/new">Host a tournament</Link>
            : <Link className="btn accent" to="/register">Create an account</Link>}
        </div>
        <svg className="bracket" viewBox="0 0 220 170" aria-hidden="true">
          <path d="M10 20H60V45H110M10 70H60V45M10 100H60V125H110M10 150H60V125M110 45H150V85H210M110 125H150V85" />
        </svg>
      </div>

      <h2 className="section-title">Upcoming tournaments</h2>
      {error && <p className="error">{error}</p>}
      {items && items.length === 0 && <p className="empty">No tournaments yet. Be the first to host one.</p>}
      <div className="grid">
        {(items || []).map((t) => {
          const w = when(t);
          return (
            <Link key={id(t)} to={`/tournaments/${id(t)}`} className="card tile">
              <div className="date"><b>{w.day}</b><span>{w.mon}</span></div>
              <div>
                <h2>{t.name}</h2>
                <span className="tag">{t.game}</span>
                <p className="hint">{t.location}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function TournamentDetail() {
  const { tid } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const [t, setT] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api(`${EP.tournaments}/${tid}`).then((d) => setT(d.tournament || d)).catch((e) => setMsg(e.message));
  }, [tid]);

  const remove = async () => {
    if (!window.confirm("Delete this tournament?")) return;
    try { await api(`${EP.tournaments}/${tid}`, { method: "DELETE" }); nav("/tournaments"); }
    catch (e) { setMsg(e.message); }
  };
  const join = async () => {
    try { await api(EP.registrations, { method: "POST", body: { tournament: tid } }); setMsg("You're registered."); }
    catch (e) { setMsg(e.message); }
  };

  if (!t) return <p>{msg || "Loading…"}</p>;
  return (
    <section className="card">
      <h1>{t.name}</h1>
      <p>{t.description}</p>
      <p className="hint">{t.game} · {t.location} · {t.date && new Date(t.date).toLocaleDateString()} · Up to {t.maxPlayers} players</p>
      {msg && <p role="status">{msg}</p>}
      {user ? (
        <div className="row">
          <button className="btn accent" onClick={join}>Register for this tournament</button>
          <Link className="btn ghost" to={`/tournaments/${tid}/edit`}>Edit</Link>
          <button className="btn danger" onClick={remove}>Delete</button>
        </div>
      ) : <p className="hint"><Link to="/login">Log in</Link> to register.</p>}
    </section>
  );
}

export function TournamentForm() {
  const { tid } = useParams();
  const nav = useNavigate();
  const [error, setError] = useState("");
  const { values, setValues, onChange } = useForm({ name: "", game: "", date: "", location: "", maxPlayers: 16, description: "" });

  useEffect(() => {
    if (tid) api(`${EP.tournaments}/${tid}`).then((d) => {
      const x = d.tournament || d;
      setValues({ ...x, date: x.date ? x.date.slice(0, 10) : "" });
    }).catch((e) => setError(e.message));
  }, [tid]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api(tid ? `${EP.tournaments}/${tid}` : EP.tournaments, { method: tid ? "PUT" : "POST", body: values });
      nav("/tournaments");
    } catch (err) { setError(err.message); }
  };

  return (
    <form className="card narrow" onSubmit={submit}>
      <h1>{tid ? "Edit tournament" : "New tournament"}</h1>
      {error && <p className="error" role="alert">{error}</p>}
      <Field label="Name" name="name" value={values.name} onChange={onChange} />
      <Field label="Game" name="game" value={values.game} onChange={onChange} />
      <Field label="Date" name="date" type="date" value={values.date} onChange={onChange} />
      <Field label="Location" name="location" value={values.location} onChange={onChange} />
      <Field label="Max players" name="maxPlayers" type="number" min="2" value={values.maxPlayers} onChange={onChange} />
      <label className="field"><span>Description</span>
        <textarea name="description" rows="4" value={values.description || ""} onChange={onChange} />
      </label>
      <button className="btn">{tid ? "Save changes" : "Create tournament"}</button>
    </form>
  );
}