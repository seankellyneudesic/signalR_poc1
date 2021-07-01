using System;

namespace verb.api.models
{
    public class ChatDirectMessage
    {
        public string UserId { get; set; }
        public string Message { get; set; }
        public DateTime DateTimeUTC { get; set; }
    }
}