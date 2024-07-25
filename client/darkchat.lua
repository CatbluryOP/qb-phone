-- Functions

local function escape_str(s)
	return s
end

local function GenerateChatId()
    local chatId = "CHAT-"..math.random(11111111, 99999999)
    return chatId
end

-- NUI Callback

RegisterNUICallback('GetChats', function(_, cb)
    local hasVPN = QBCore.Functions.HasItem(Config.VPNItem)

    cb({
        ChatData = PhoneData.Chats,
        hasVPN = hasVPN,
    })
end)

RegisterNUICallback('PostNewChat', function(data, cb)

    local URL

    if data.url ~= "" and string.match(data.url, '[a-z]*://[^ >,;]*') then
        URL = data.url
    else
        URL = ""
    end

    local ChatMessage = {
        firstName = PhoneData.PlayerData.charinfo.firstname,
        lastName = PhoneData.PlayerData.charinfo.lastname,
        citizenid = PhoneData.PlayerData.citizenid,
        message = escape_str(data.Message):gsub("[%<>\"()\'$]",""),
        time = data.Date,
        chatId = GenerateChatId(),
        type = data.type,
        url = URL,
        showAnonymous = data.anonymous
    }

    TriggerServerEvent('qb-phone:server:UpdateChats', ChatMessage)
    cb("ok")
end)

RegisterNUICallback('DeleteChat',function(data)
    TriggerServerEvent('qb-phone:server:DeleteChat', data.id)
end)

RegisterNUICallback('FlagChat',function(data, cb)
    QBCore.Functions.Notify(data.name..' was reported for saying '..data.message, "error")
    cb('ok')
end)

-- Events

RegisterNetEvent('qb-phone:client:UpdateChats', function(src, Chats, delete)
    if not PhoneData or not FullyLoaded then return end
    PhoneData.Chats = Chats
    local MyPlayerId = PlayerData.source or -1


    if delete and src == MyPlayerId then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "Dark Chat",
                text = "Chat deleted!",
                icon = "fa-solid fa-dove",
                color = "#1d1d1d",
                timeout = 1000,
            },
        })
    end

    local hasVPN = QBCore.Functions.HasItem(Config.VPNItem)

    SendNUIMessage({
        action = "UpdateChats",
        Chats = PhoneData.Chats,
        hasVPN = hasVPN,
    })

    if delete then return end

    local NewChatData = Chats[#Chats]
    local newFirst, newLast = NewChatData.firstName:gsub("[%<>\"()\'$]",""), NewChatData.lastName:gsub("[%<>\"()\' $]","")


    if not delete and src == MyPlayerId then return end

    if not delete then
        SendNUIMessage({
            action = "PhoneNotification",
            PhoneNotify = {
                title = "@"..newFirst.." "..newLast,
                text = NewChatData.message:gsub("[%<>\"()\'$]",""),
                icon = "fa-solid fa-dove",
                color = "#1d1d1d",
            },
        })
    end
end)
