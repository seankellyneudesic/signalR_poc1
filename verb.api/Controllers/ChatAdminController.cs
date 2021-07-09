using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using varb.api.hubs.clients;
using verb.api.hubs;
using verb.api.models;

namespace verb.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatAdminController : ControllerBase
    {

        private readonly IHubContext<ChatHub, IChatClient> _chatHub;
        private readonly ILogger<ChatAdminController> _logger;

        public ChatAdminController(ILogger<ChatAdminController> logger, IHubContext<ChatHub, IChatClient> chatHub)
        {
            _logger = logger;
            _chatHub = chatHub;
        }

        [HttpGet]
        [Route("ActiveUsers")]
        public async Task<IEnumerable<ChatUser>> GetActiveUsers()
        {
            return UserHandler.ConnectedUsers.ToList();
        }

        [HttpPost]
        [Route("ClearConnections")]
        public async Task<ActionResult> ClearConnections()
        {
            UserHandler.ConnectedUsers.Clear();
            // might be more to do
            return Ok();
        }
    }
}
