import { useRouter } from 'next/router';
import PublicProfilePage from '../../src/app/hushh-id/[...id]/page';

export default function HushhIdHyphenPage() {
  const { query } = useRouter();
  return <PublicProfilePage params={{ id: query.id }} />;
}
