Chats = {}

-- Events

CreateThread(function()
    local chatsSelected = MySQL.query.await('SELECT * FROM phone_darkchat WHERE `date` > NOW() - INTERVAL ? hour', {Config.ChatDuration})
    Chats = chatsSelected
end)

RegisterNetEvent('qb-phone:server:DeleteChat', function(chatId)
    local src = source
    local CID = QBCore.Functions.GetPlayer(src).PlayerData.citizenid
    local delete = false
    for i = 1, #Chats do
        if Chats[i].chatId == chatId and Chats[i].citizenid == CID then
            table.remove(Chats, i)
            delete = true
            break
        end
    end
    if not delete then return end
    TriggerClientEvent('qb-phone:client:UpdateChats', -1, src, Chats, true)
end)

RegisterNetEvent('qb-phone:server:UpdateChats', function(ChatData)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local HasVPN = Player.Functions.GetItemByName(Config.VPNItem)

    if (ChatData.showAnonymous and HasVPN) then
        ChatData.firstName = "Anonymous"
        ChatData.lastName = ""
    end
    
    print(json.encode(ChatData.url))
    MySQL.insert('INSERT INTO phone_darkchat (citizenid, firstName, lastName, message, url, chatid, type) VALUES (?, ?, ?, ?, ?, ?, ?)', {
        ChatData.citizenid,
        ChatData.firstName:gsub("[%<>\"()\'$]",""),
        ChatData.lastName:gsub("[%<>\"()\'$]",""),
        ChatData.message:gsub("[%<>\"()\'$]",""),
        ChatData.url,
        ChatData.chatId,
        ChatData.type,
    }, function(id)
        if id then
            Chats[#Chats+1] = {
                id = id,
                citizenid = ChatData.citizenid,
                firstName = ChatData.firstName:gsub("[%<>\"()\'$]",""),
                lastName = ChatData.lastName:gsub("[%<>\"()\'$]",""),
                message = ChatData.message:gsub("[%<>\"()\'$]",""),
                url = ChatData.url,
                chatId = ChatData.chatId,
                type = ChatData.type,
                date = os.date('%Y-%m-%d %H:%M:%S')
            }

            TriggerClientEvent('qb-phone:client:UpdateChats', -1, src, Chats, false)
        end
    end)
end)

-- Use this chat function in different resources I used it in Renewed Fishing script to make the ped chat close to start of tournaments --
local function AddNewChat(ChatData)
    local chatID = ChatData and ChatData.chatId or "CHAT-"..math.random(11111111, 99999999)

    MySQL.insert('INSERT INTO phone_darkchat (citizenid, firstName, lastName, message, url, chatid, type) VALUES (?, ?, ?, ?, ?, ?, ?)', {
        ChatData.citizenid,
        ChatData.firstName:gsub("[%<>\"()\'$]",""),
        ChatData.lastName:gsub("[%<>\"()\'$]",""),
        ChatData.message:gsub("[%<>\"()\'$]",""),
        ChatData.url,
        chatID,
        ChatData.type or "chat",
    }, function(id)
        if id then
            Chats[#Chats+1] = {
                id = id,
                citizenid = ChatData.citizenid or "TEMP332",
                firstName = ChatData.firstName:gsub("[%<>\"()\'$]",""),
                lastName = ChatData.lastName:gsub("[%<>\"()\'$]",""),
                message = ChatData.message:gsub("[%<>\"()\'$]",""),
                url = ChatData.url or "",
                chatId = chatID,
                type = ChatData.type or "chat",
                date = os.date('%Y-%m-%d %H:%M:%S')
            }

            TriggerClientEvent('qb-phone:client:UpdateChats', -1, 0, Chats, false)
        end
    end)
end
exports("AddNewChat", AddNewChat)
