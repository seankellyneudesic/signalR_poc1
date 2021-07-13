using System.Threading.Tasks;
using verb.api.models;
using Microsoft.AspNetCore.SignalR;
using varb.api.hubs.clients;
using System;
namespace verb.api.hubs
{
    public class OverlayHub : Hub<IOverlayClient>
    {
        public async Task OverlayPlace(OverlayPlaceMessage message)
        {
            message.DateTimeUTC = DateTime.UtcNow;
            await Clients.All.ReceiveOverlayPlace(message);
        }

        public async Task OverlayMove(OverlayMoveMessage message)
        {
            message.DateTimeUTC = DateTime.UtcNow;
            await Clients.All.ReceiveOverlayMove(message);
        }
    }
}