import React, { useEffect, useState } from "react";
import { api, EP } from "../api.js";

export default function Registrations() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const load = () => api(EP.registrations).then((d) => setItems(d.registrations || d)).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const cancel = async (rid) => {
    try { await api(`${EP.registrations}/${rid}`, { method: "DELETE" }); load(); }
    catch (e) { setError(e.message); }
  };

  return (
    <section>
      <h1>My registrations</h1>
      {error && <p className="error">{error}</p>}
      {items && items.length === 0 && <p className="empty">You haven't registered for any tournaments yet.</p>}
      {(items || []).map((r) => (
        <div className="card row" key={r._id || r.id}>
          <span>{r.tournament?.name || r.tournament}</span>
          <button className="btn danger" onClick={() => cancel(r._id || r.id)}>Cancel registration</button>
        </div>
      ))}
    </section>
  );
}