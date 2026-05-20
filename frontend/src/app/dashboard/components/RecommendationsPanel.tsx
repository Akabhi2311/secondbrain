export default function RecommendationsPanel({ recommendations }: any) {
  return (
    <div className="bg-gray-900 p-4 rounded">
      <h2 className="text-lg font-bold text-white mb-3">
        🎯 Recommendations
      </h2>

      {recommendations?.recommendations?.length === 0 ? (
        <p className="text-green-400">You're doing great 🎉</p>
      ) : (
        recommendations?.recommendations?.map((r: string, i: number) => (
          <p key={i} className="text-yellow-400">
            {r}
          </p>
        ))
      )}
    </div>
  );
}