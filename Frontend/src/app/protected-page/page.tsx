// app/protected-page/page.tsx
import withAuth from '../components/withAuth';

function ProtectedPage() {
  return <div>This is a protected page</div>;
}

export default withAuth(ProtectedPage);
