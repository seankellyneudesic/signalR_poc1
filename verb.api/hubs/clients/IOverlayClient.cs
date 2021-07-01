using System.Threading.Tasks;
using verb.api.models;

namespace varb.api.hubs.clients
{
    public interface IOverlayClient
    {
        Task OverlayPlace(OverlayPlaceMessage message);
        Task OverlayMove(OverlayMoveMessage message);
    }
}