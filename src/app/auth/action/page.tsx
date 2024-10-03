'use client'

import { useParams } from "next/navigation";

function AuthActionPage() {
  const { mode, oobCode, apiKey, lang } = useParams();

  return (
    <div>
      <h1>Auth Action Page</h1>
      <p>mode: {String(mode)}</p>
      <p>oobCode: {String(oobCode)}</p>
      <p>apiKey: {String(apiKey)}</p>
      <p>lang: {String(lang)}</p>
    </div>
  );
}

export default AuthActionPage;