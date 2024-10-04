import { Suspense } from 'react';
import ActionContent from '../action/content'

function AuthActionPage() {
  return (
    <Suspense fallback="Loading...">
      <ActionContent />
    </Suspense>
  );
}

export default AuthActionPage;