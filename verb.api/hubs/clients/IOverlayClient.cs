using System.Threading.Tasks;
using verb.api.models;

namespace varb.api.hubs.clients
{
    public interface IOverlayClient
    {
        Task ReceiveOverlayPlace(OverlayPlaceMessage message);
        Task ReceiveOverlayMove(OverlayMoveMessage message);
    }
}