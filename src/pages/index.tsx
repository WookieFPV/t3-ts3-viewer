import { api } from "~/utils/api";
import { TeamspeakUi } from "~/components/tsComponents";
import { LastDataView } from "~/components/lastDataView";

const isDebug = false;
export const TsLoaderUi = () => {
  const clients = api.ts3.clients.useQuery(undefined, {
    refetchInterval: 5 * 1000,
  });
  const channels = api.ts3.channel.useQuery(undefined, { staleTime: Infinity });

  if (isDebug) {
    console.log(JSON.stringify(clients.data));
    console.log(JSON.stringify(channels.data));
  }

  if (!channels.data || !clients.data)
    return (
      <div className="min min-h-screen space-y-1 bg-[#23272A] p-4 text-white">
        Loading...
      </div>
    );

  const filteredClients = clients.data?.filter((cl) => cl.type !== 0);

  return (
    <div className="min min-h-screen space-y-1 bg-[#23272A] p-4 text-white">
      <LastDataView dataUpdatedAt={clients.dataUpdatedAt} />
      <TeamspeakUi channels={channels.data} clients={filteredClients} />
    </div>
  );
};

export default TsLoaderUi;
