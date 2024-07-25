Config = Config or {}

-- Configs for Payment and Banking

Config.RenewedBanking = false -- Either put this to true or false if you use Renewed Banking or not
Config.RenewedFinances = false -- Either put this to true or false if you use Renewed Finances or not

-- Configs for GoPro Script
Config.BrazzersCameras = false -- Either put this to true or false if you use Renewed Cameras or not

Config.BillingCommissions = { -- This is a percentage (0.10) == 10%
    mechanic = 0.10
}

-- Web hook for camera ( NOT GO PRO )
Config.Webhook = 'https://discord.com/api/webhooks/1256602085143609426/kwTa8lTuPv22Si5pacU8YR4YV59JU5k87ECGWzxYpicsRpWQnpNSzC1IDZz0AhlhCGG-'

-- Item name for pings app ( Having a VPN sends an anonymous ping, else sends the players name)
Config.VPNItem = 'water_bottle'

-- The garage the vehicle goes to when you sell a car to a player
Config.SellGarage = 'altastreet'

-- NEW --
Config.Garage = 'qbcore'  -- Use 'jdev' if using JDev's QB Garage Script
                        -- Use 'qbcore' if using base QBCore Garage Script

-- How Long Does The Player Have To Accept The Ping - This Is In Seconds
Config.Timeout = 30

-- How Long Does The Blip Remain On The Map - This Is In Seconds
Config.BlipDuration = 30

-- Blip Settings - Find Info @ https://wiki.gtanet.work/index.php?title=Blips
Config.BlipColor = 4
Config.BlipIcon = 280
Config.BlipScale = 0.75

Config.ChatDuration = 12 -- How many hours to load Chat (12 will load the past 12 hours of Chat)
Config.TweetDuration = 8 -- How many hours to load tweets (12 will load the past 12 hours of tweets)
Config.MailDuration = 72 -- How many hours to load Mails (72 will load the past 72 hours of Mails)


Config.RepeatTimeout = 4000
Config.CallRepeats = 10
Config.AllowWalking = true -- Allow walking and driving with phone out


Config.Milkroad = {
    {
        label = 'VPN', -- Item Label
        description = '30 GNE', -- Description
        item = 'vpn', -- Item Name
        info = {}, -- Item Info
        icon = 'fas fa-user-secret', -- Icon
        cryptoType = 'gne', -- Crypto to use
        amount = 20, -- Amount needed to purchase this item
    },
    {
        label = 'Delivery List',
        description = '10 XCoin',
        item = 'deliverylist',
        info = {},
        icon = 'fas fa-clipboard-list',
        cryptoType = 'xcoin',
        amount = 10,
    },
    {
        label = 'Phone Dongle (R)',
        description = '50 GNE',
        item = 'racingdongle',
        info = {alias = nil, type = 'civilian'},
        icon = 'fas fa-mask',
        cryptoType = 'gne',
        amount = 50,
    },
}


Config.PhoneApplications = {
       
    ["twitter"] = {
        app = "twitter",
        color = "#f08d86",
        color2 = "#a55150",
        icon = "fa-solid fa-dove",
        tooltipText = "Twatter",
        tooltipPos = "top",
        style = "font-size: 2.4vh";
        job = false,
        blockedjobs = {},
        slot = 9,
        Alerts = 0,
    },
    
}

Config.MaxSlots = 28

Config.JobCenter = {
    [1] = {
        vpn = false,
        icon = 'fas fa-warehouse',
        icons = '💲💲💲💲💲',
        label = "Impound Worker",
        event = "qb-phone:jobcenter:tow",
    },
    [2] = {
        vpn = true,
        icon = 'fas fa-house',
        label = "House Robbery",
        event = "qb-robbery:waypoint", -- Make Your Own Event
    },
    [3] = {
        vpn = true,
        icon = 'fas fa-pills',
        label = "Meth Run",
        event = "kevin-methruns:waypoint", -- Make Your Own Event
    },
    [4] = {
        vpn = false,
        icon = 'fas fa-fish',
        icons = '💲💲💲💲',
        label = 'Fishing',
        event = 'qb-phone:jobcenter:fish',
    },
    [5] = {
        vpn = true,
        icon = 'fas fa-tablets',
        label = "Oxy Run",
        event = "kevin-oxyruns:waypoint", -- Make Your Own Event
    },
    [6] = {
        vpn = false,
        icon = 'fas fa-trash',
        label = "Sanitation Worker",
        icons = '💲💲💲💲💲',
        event = "qb-phone:jobcenter:sanitation",
    },
    [7] = {
        vpn = false,
        icon = 'fas fa-shop',
        icons = '💲💲💲💲',
        label = "Runner Delivery",
        event = "qb-phone:jobcenter:postop",
    },
    [8] = {
        vpn = true,
        icon = 'fas fa-cannabis',
        label = "Weed Runs",
        event = "kevin-weedruns:waypoint", -- Make Your Own Event
    },
    [9] = {
        vpn = false,
        icon = 'fas fa-warehouse',
        icons = '💲💲💲💲💲',
        label = "PD Impound Worker",
        event = "qb-phone:jobcenter:pdimpound"
    }
}

Config.TaxiJob = {
    {
        Job = "taxi",
    },
}

Config.CryptoCoins = {
    {
        label = 'Shungite', -- label name
        abbrev = 'SHUNG', -- abbreviation
        icon = 'fas fa-caret-square-up', -- icon
        metadata = 'shung', -- meta data name
        value = 50, -- price of coin
        purchase = true, -- TRUE ( crypto is purchaseable in the phone) FALSE ( crypto is not purchaseable and only exchangeable )
        sell = true -- TRUE ( crypto is sellable in the phone) FALSE ( crypto is not sellable )
    },
    {
        label = 'Guinea',
        abbrev = 'GNE',
        icon = 'fas fa-horse-head',
        metadata = 'gne',
        value = 100,
        purchase = true,
        sell = false
    },
    {
        label = 'X Coin',
        abbrev = 'XNXX',
        icon = 'fas fa-times',
        metadata = 'xcoin',
        value = 75,
        purchase = false,
        sell = true
    },
    {
        label = 'LME',
        abbrev = 'LME',
        icon = 'fas fa-lemon',
        metadata = 'lme',
        value = 150,
        purchase = false,
        sell = false
    },
}
