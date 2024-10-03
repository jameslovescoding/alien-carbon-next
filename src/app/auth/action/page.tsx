import { Suspense } from 'react';
import AuthAction from '../action/content'

function AuthActionPage() {
  return (
    <Suspense fallback="Loading...">
      <AuthAction />
    </Suspense>
  );
}

export default AuthActionPage;