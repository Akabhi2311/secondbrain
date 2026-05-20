interface Activity {
  type: string;
  title: string;
}

export default function RecentActivityFeed({
  activities,
}: {
  activities: Activity[];
}) {

  return (
    <div className="rounded-2xl border border-white/10 bg-[#081028] p-6">

      <h2 className="text-3xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      {activities.length === 0 ? (

        <p className="text-gray-400">
          No recent activity
        </p>

      ) : (

        <div className="space-y-4">

          {activities.map((activity, index) => (

            <div
              key={index}
              className="border-b border-white/10 pb-4"
            >

              <p className="text-white text-lg">
                {activity.title}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}