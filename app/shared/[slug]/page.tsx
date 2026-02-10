import { PublicCollectionView } from '../components/PublicCollectionView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSharedCollection(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/shared/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function SharedCollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getSharedCollection(slug);

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Collection Not Found</h1>
          <p className="text-sm text-zinc-400">
            This shared collection link is invalid or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PublicCollectionView
      collection={data.collection}
      icons={data.icons ?? []}
      hasPassword={data.passwordRequired ?? false}
    />
  );
}
