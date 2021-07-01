# signalR_poc1
## Simple Admin/Clients SignalR Demo

This is the first pass of a proof-of-concept where we can demo that Admin can send both broadcast and direct messages while the client can send messages globally but not directed.

### To Run 

1. Open shell to **verb.api** folder, run 
  `dotnet restore` then
  `dotnet watch run`

2. Open shell to **verb.admin** folder and run
  `yarn install` then
  `yarn start`

3. Open shell to **verb.live.client** folder and run
  `yarn install` then
  `yarn start`

### NOTES 

- Client runs at `http://localhost:3000`
- Admin runs at `http://localhost:3001`

- CORS is enabled and restricted to these two addresses (in API startup.cs)
- Pay attention to order of services/config pipeline in startup.cs, IT DOES MATTER!!!

- Copy and paste the client url `http://localhost:3000` to additional windows to create new client users

- Admin can broadcast messages globally to everyone (the top message send area) and can send directed to a user (bottom message send area). 
- Admin user list will update with user names (from unknown) when client user sends a message with their name specified.
- Client users can send messages to everyone but not to specific users.
