using System;

namespace verb.api.models
{
    public class ChatMessage
    {
        public string User { get; set; }

        public string Message { get; set; }
        public DateTime DateTimeUTC { get; set; }
    }
}