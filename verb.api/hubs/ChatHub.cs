using System.Threading.Tasks;
using verb.api.models;
using varb.api.hubs.clients;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System;
using System.Linq;
namespace verb.api.hubs
{
    public static class UserHandler
    {
        public static HashSet<ChatUser> ConnectedUsers = new HashSet<ChatUser>();
    }

    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            UserHandler.ConnectedUsers.First(x => x.Id == Context.ConnectionId).Name = message.User;
            await Clients.All.ReceiveMessage(message);

            if (UserHandler.ConnectedUsers.First(x => x.Name == "Admin") != null)
            {
                var adminConnectionId = UserHandler.ConnectedUsers.First(x => x.Name == "Admin").Id;
                await Clients.Clients(adminConnectionId).ReceiveUsersUpdatedMessage(new ChatUsersUpdatedMessage { UpdatedUsers = UserHandler.ConnectedUsers.ToList() });
            }
        }

        public async Task SendDirectMessage(ChatDirectMessage message)
        {
            var fromUserName = UserHandler.ConnectedUsers.First(x => x.Id == Context.ConnectionId).Name;
            await Clients.Clients(message.UserId).ReceiveMessage(new ChatMessage { User = fromUserName, Message = message.Message });
        }

        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectedUsers.Add(new ChatUser { Id = Context.ConnectionId, Name = "Unknown" });
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedUsers.Remove(UserHandler.ConnectedUsers.First(x=>x.Id == Context.ConnectionId));
            return base.OnDisconnectedAsync(exception);
        }
    }
}