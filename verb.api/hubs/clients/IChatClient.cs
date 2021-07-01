using System.Threading.Tasks;
using verb.api.models;

namespace varb.api.hubs.clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
        Task ReceiveDirectMessage(ChatDirectMessage message);

        Task ReceiveUsersUpdatedMessage(ChatUsersUpdatedMessage message);
    }
}