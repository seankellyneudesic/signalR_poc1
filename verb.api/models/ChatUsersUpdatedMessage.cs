using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace verb.api.models
{
    public class ChatUsersUpdatedMessage
    {
        public IEnumerable<ChatUser> UpdatedUsers { get; set; }
    }
}
