// src/App.jsx
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_APPLICATIONS } from "./graphql/queries";
import {
  CREATE_APPLICATION,
  UPDATE_APPLICATION_STATUS,
  DELETE_APPLICATION,
} from "./graphql/mutations";

export default function App() {
  const { data, loading, error } = useQuery(GET_APPLICATIONS);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [createApplication, { loading: creating }] = useMutation(
    CREATE_APPLICATION,
    {
      refetchQueries: [ { query: GET_APPLICATIONS } ],
    }
  );

  const [updateStatus] = useMutation(UPDATE_APPLICATION_STATUS, {
    refetchQueries: [ { query: GET_APPLICATIONS } ],
  });

  const [deleteApp] = useMutation(DELETE_APPLICATION, {
    refetchQueries: [ { query: GET_APPLICATIONS } ],
  });

  const onAdd = async () => {
    if (!company.trim() || !role.trim()) return;
    await createApplication({
      variables: { input: { company: company.trim(), role: role.trim() } },
    });
    setCompany("");
    setRole("");
  };

  const onMarkApplied = (id) =>
    updateStatus({ variables: { id, status: "APPLIED" } });

  const onMarkRejected = (id) =>
    updateStatus({ variables: { id, status: "REJECTED" } });

  const onDelete = (id) => deleteApp({ variables: { id } });

  return (
    <div style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16 }}>
        Job Tracker
      </h1>

      {/* Add form */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ padding: 10, width: 240 }}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: 10, width: 240 }}
        />
        <button onClick={onAdd} disabled={creating} style={{ padding: "8px 14px" }}>
          {creating ? "Adding..." : "Add"}
        </button>
      </div>

      {/* List */}
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error.message}</p>}

      <ul style={{ lineHeight: 2 }}>
        {(data?.applications ?? []).map((app) => (
          <li key={app.id} style={{ marginBottom: 8 }}>
            <strong>{app.company}</strong> — {app.role}{" "}
            <span style={{ opacity: 0.7 }}>[{app.currentStatus}]</span>
            <span style={{ marginLeft: 12, display: "inline-flex", gap: 8 }}>
              <button onClick={() => onMarkApplied(app.id)}>Mark Applied</button>
              <button onClick={() => onMarkRejected(app.id)}>Mark Rejected</button>
              <button onClick={() => onDelete(app.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}