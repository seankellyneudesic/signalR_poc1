using System;

namespace verb.api.models
{
    public class OverlayMoveMessage
    {

        public Guid ResourceId { get; set; }
        public string Message { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public DateTime DateTimeUTC { get; set; }
    }
}