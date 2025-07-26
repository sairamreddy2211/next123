"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import React, { useState } from "react";

export default function ProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  // State for custom template token
  const [customToken, setCustomToken] = useState<string | null>(null);
  const [customTokenError, setCustomTokenError] = useState<string | null>(null);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>You are not signed in.</div>;
  }

  async function handleShowToken() {
    setTokenError(null);
    try {
      const t = await getToken();
      setToken(t || "No token returned");
    } catch (e: any) {
      setTokenError(e.message || "Failed to get token");
    }
  }

  async function handleShowCustomToken() {
    setCustomTokenError(null);
    try {
      const t = await getToken({ template: "pipecodetemplate" });
      setCustomToken(t || "No token returned");
    } catch (e: any) {
      setCustomTokenError(e.message || "Failed to get custom template token");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "2rem", border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>User Profile</h2>
      <img
        src={user.imageUrl}
        alt="Profile"
        style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 16 }}
      />
      <div>
        <strong>Name:</strong> {user.fullName}
      </div>
      <div>
        <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
      </div>
      <div>
        <strong>Clerk User ID:</strong> {user.id}
      </div>
      <div>
        <strong>Username:</strong> {user.username || "N/A"}
      </div>
      <div>
        <strong>Provider:</strong>{" "}
        {user.externalAccounts && user.externalAccounts.length > 0
          ? user.externalAccounts[0].provider
          : "N/A"}
      </div>
      <div style={{ marginTop: 24 }}>
        <button onClick={handleShowToken} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
          Show My Clerk Token
        </button>
        {token && (
          <div style={{ marginTop: 12, wordBreak: "break-all", padding: 8, borderRadius: 4 }}>
            <strong>Token:</strong>
            <div style={{ fontSize: "0.85rem" }}>{token}</div>
          </div>
        )}
        {tokenError && (
          <div style={{ color: "red", marginTop: 8 }}>
            <b>Error:</b> {tokenError}
          </div>
        )}
      </div>
      <div style={{ marginTop: 24 }}>
        <button onClick={handleShowCustomToken} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
          Show My Clerk Token (pipecodetemplate)
        </button>
        {customToken && (
          <div style={{ marginTop: 12, wordBreak: "break-all", background: "#e8f7ff", padding: 8, borderRadius: 4 }}>
            <strong>Custom Template Token:</strong>
            <div style={{ fontSize: "0.85rem" }}>{customToken}</div>
          </div>
        )}
        {customTokenError && (
          <div style={{ color: "red", marginTop: 8 }}>
            <b>Error:</b> {customTokenError}
          </div>
        )}
      </div>
    </div>
  );
}