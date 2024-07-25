var CurrentDarkWebTab = "dark-web-home"
var HashtagOpen = false;
var MinimumTrending = 100;

// Search

$(document).ready(function(){
    $("#dark-web-search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".dark-web-tweet-id").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

// Functions

function ConfirmationFrame() {
    $('.spinner-input-frame').css("display", "flex");
    setTimeout(function () {
        $('.spinner-input-frame').css("display", "none");
        $('.checkmark-input-frame').css("display", "flex");
        setTimeout(function () {
            $('.checkmark-input-frame').css("display", "none");
        }, 2000)
    }, 1000)
}

function CopyMentionTag(elem) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(elem).data('mentiontag')).select();
    QB.Phone.Notifications.Add("fab fa-user-secret", "Dark Web", $(elem).data('mentiontag')+ " copied!", "rgb(27, 149, 224)", 2500);
    document.execCommand("copy");
    $temp.remove();
}

QB.Phone.Notifications.LoadChatMessage = function(ChatMessage, hasVPN=false) {
    ChatMessage = ChatMessage.reverse();

    if (hasVPN) {
        $(".dark-web-anonymous").css("display", "block");
    } else {
        $(".dark-web-anonymous").css("display", "none");
    }

    if (ChatMessage !== null && ChatMessage !== undefined && ChatMessage !== "" && ChatMessage.length > 0) {
        $(".dark-web-home-tab").html("");
        $.each(ChatMessage, function(i, Chats){
            var ChatMessage = Chats.message
            var TimeAgo = moment(Chats.date).format('MM/DD/YYYY hh:mm');
            var DarkWebHandle = Chats.firstName + ' ' + Chats.lastName

            if (Chats.url == "") {
                if (Chats.citizenid === QB.Phone.Data.PlayerData.citizenid){
                    var ChatElement = 
                    '<div class="dark-web-tweet-id">' +
                        '<div class="dark-web-tweet" data-chatId ="'+Chats.chatId+'" data-chathandler="@' + DarkWebHandle.replace(" ", "_") + '" data-type ="'+Chats.type+'">'+
                            '<div class="dark-web-tweeter">' + ' &nbsp;<span>@' + DarkWebHandle.replace(" ", "_") + '</span></div>' + // Title
                            '<div class="dark-web-time">' + TimeAgo + '</div>' +
                        '</div>' +
                        '<div class="postingan" data-chatId ="'+Chats.chatId+'" data-chathandler="@' + DarkWebHandle.replace(" ", "_") + '" data-type ="'+Chats.type+'">' +
                            '<div class="dark-web-reply"><i class="fas fa-share"></i></div>' +
                            '<div class="dark-web-retweet" data-chatmessage="'+ChatMessage+'"><div class="dark-web-retweet"><i class="fas fa-retweet"></i></div>'+
                            '<div class="dark-web-trash"><i class="fas fa-trash"></i></div>'+
                            '<div class="dark-web-message" style="padding-bottom: 2.5vh;">' + ChatMessage + '</div>' +
                        '</div>' +
                    '</div>';
                    $(".dark-web-home-tab").append(ChatElement);
                }else{
                    var ChatElement = 
                    '<div class="dark-web-tweet-id">' +
                        '<div class="dark-web-tweet" data-chatId ="'+Chats.chatId+'" data-chathandler="@' + DarkWebHandle.replace(" ", "_") + '" data-type ="'+Chats.type+'">'+
                            '<div class="dark-web-tweeter">' + ' &nbsp;<span>@' + DarkWebHandle.replace(" ", "_") + '</span></div>' + // Title
                            '<div class="dark-web-time">' + TimeAgo + '</div>' +
                        '</div>' +
                        '<div class="postingan" data-chatId ="'+Chats.chatId+'" data-chathandler="@' + DarkWebHandle.replace(" ", "_") + '" data-type ="'+Chats.type+'">' +
                            '<div class="dark-web-reply"><i class="fas fa-share"></i></div>' +
                            '<div class="dark-web-retweet" data-chatmessage="'+ChatMessage+'"><div class="dark-web-retweet"><i class="fas fa-retweet"></i></div>'+
                            '<div class="dark-web-flag"><i class="fas fa-flag"></i></div>'+
                            '<div class="dark-web-message" style="padding-bottom: 2.5vh;">' + ChatMessage + '</div>' +
                        '</div>' +
                    '</div>';
                    $(".dark-web-home-tab").append(ChatElement);
                }
            } else {
                if (Chats.citizenid === QB.Phone.Data.PlayerData.citizenid){
                    var ChatElement = 
                    '<div class="dark-web-tweet-id">' +
                        '<div class="dark-web-tweet" data-chatId ="'+Chats.chatId+'" data-chathandler="@'+DarkWebHandle.replace(" ", "_") + '" data-type ="'+Chats.type+'">'+
                            '<div class="dark-web-tweeter">' + ' &nbsp;<span>@'+DarkWebHandle.replace(" ", "_")+ '</span></div>'+ // Title
                            '<div class="dark-web-time">' + TimeAgo + '</div>' +
                        '</div>' +
                        '<div class="postingan" data-chatId ="'+Chats.chatId+'" data-chathandler="@'+DarkWebHandle.replace(" ", "_") + '" data-type ="'+Chats.type+'">' +
                            '<div class="dark-web-reply"><i class="fas fa-share"></i></div>'+
                            '<div class="dark-web-retweet" data-imagemessage="'+Chats.url+'" data-chatmessage="'+ChatMessage+'"><div class="dark-web-retweet"><i class="fas fa-retweet"></i></div>'+
                            '<div class="dark-web-trash"><i class="fas fa-trash"></i></div>'+
                            '<div class="dark-web-message"><p>'+ChatMessage+'</p></div>' +
                            '<div class="dark-web-image-attached">Images Attached: 1<p></p></div>'+
                            '<img class="image" src= ' + Chats.url + ' style = " display: none; border-radius:4px; width: 80%; position:relative; z-index: 1; left: 0.4vw; margin:.6rem .5rem .6rem 1rem;height: auto; bottom: 3.5vh;">' +
                            '<div class="dark-web-block">' +
                                '<div class="dark-web-eye"><i class="fas fa-eye"></i></div>'+
                                '<div class="dark-web-image-text">Click to View</div>'+
                                '<div class="dark-web-image-text-other">Only reveal images from those you<p>know are not total pricks</p></div>'+
                            '</div>'+
                        '</div>' +
                    '</div>';
                    $(".dark-web-home-tab").append(ChatElement);
                }else{
                    var ChatElement = 
                    '<div class="dark-web-tweet-id">' +
                        '<div class="dark-web-tweet" data-chatId ="'+Chats.chatId+'" data-chathandler="@'+DarkWebHandle.replace(" ", "_") + '" data-type ="'+Chats.type+'">'+
                            '<div class="dark-web-tweeter">' + ' &nbsp;<span>@'+DarkWebHandle.replace(" ", "_")+ '</span></div>'+ // Title
                            '<div class="dark-web-time">' + TimeAgo + '</div>' +
                        '</div>' +
                        '<div class="postingan data-chatId ="'+Chats.chatId+'" data-chathandler="@'+DarkWebHandle.replace(" ", "_") + '" data-type ="'+Chats.type+'">' +
                            '<div class="dark-web-reply"><i class="fas fa-share"></i></div>'+
                            '<div class="dark-web-retweet" data-imagemessage="'+Chats.url+'" data-chatmessage="'+ChatMessage+'"><div class="dark-web-retweet"><i class="fas fa-retweet"></i></div>'+
                            '<div class="dark-web-flag"><i class="fas fa-flag"></i></div>'+
                            '<div class="dark-web-message"><p>'+ChatMessage+'</p></div>' +
                            '<div class="dark-web-image-attached">Images Attached: 1<p></p></div>'+
                            '<img class="image" src= ' + Chats.url + ' style = " display: none; border-radius:4px; width: 80%; position:relative; z-index: 1; left: 0.4vw; margin:.6rem .5rem .6rem 1rem;height: auto; bottom: 3.5vh;">' +
                            '<div class="dark-web-block">' +
                                '<div class="dark-web-eye"><i class="fas fa-eye"></i></div>'+
                                '<div class="dark-web-image-text">Click to View</div>'+
                                '<div class="dark-web-image-text-other">Only reveal images from those you<p>know are not total pricks</p></div>'+
                            '</div>'+
                        '</div>' +
                    '</div>';
                    $(".dark-web-home-tab").append(ChatElement);
                }
            }
        });
    } else {
        var ChatElement = '<div class="dark-web-tweet-id"><div class="dark-web-tweet"><span>No messages yet.</span></div></div>'
        $(".dark-web-home-tab").append(ChatElement);
    }
}


// Clicks

$(document).on('click', '.dark-web-new-tweet', function(e){ // Post Tweet Button
    e.preventDefault();
    ClearInputNew()
    $('#dark-web-box-textt').fadeIn(350);
});
$(document).on('click', '#box-new-cancel', function(e){
    e.preventDefault();
    ClearInputNew()
    $('.dark-web-menu-body').fadeOut(350);
    //$('.phone-new-box-body').fadeOut(350);
});

$(document).on('click', '#chat-sendmessage-chat', function(e) {
    e.preventDefault();

    var ChatMessage = $(".dark-web-box-text-input").val(); // Ensure this class matches your input field
    var imageURL = $('.dark-web-box-image-input').val(); // Ensure this class matches your input field

    console.log("ChatMessage:", ChatMessage); // Debug statement
    console.log("imageURL:", imageURL); // Debug statement

    if (ChatMessage !== "" || imageURL !== "") {
        var CurrentDate = new Date();
        if (imageURL !== "") {
            setTimeout(function() {
                ConfirmationFrame();
            }, 150);
        }
        $.post('https://qb-phone/PostNewChat', JSON.stringify({
            Message: ChatMessage,
            Date: CurrentDate,
            url: imageURL,
            type: 'chat',
            // anonymous: anonymousTweet,
        }), function() {
            ClearInputNew();
            $('#dark-web-box-textt').fadeOut(350);
        });
    } else {
        QB.Phone.Notifications.Add("fab fa-user-secret", "Dark Web", "Fill a message!", "#1DA1F2");
    }
    $('.dark-web-box-image-input').val("");
});


// Clicks

$(document).on('click', '.dark-web-eye', function(e){
    e.preventDefault();

    $(this).parent().parent().find(".image").css({"display":"block"});
    $(this).parent().parent().find(".dark-web-block").css({"display":"none"});
});

$(document).on('click', '.dark-web-image-attached', function(e){
    e.preventDefault();

    $(this).parent().parent().find(".image").css({"display":"none"});
    $(this).parent().parent().find(".dark-web-block").css({"display":"block"});
});

$(document).on('click', '#image-container', function(e){
    e.preventDefault();
    QB.Screen.popUp(source)
});

$(document).on('click', '.dark-web-reply', function(e){
    e.preventDefault();
    var ChatName = $(this).parent().data('chathandler');

    ClearInputNew()
    $('#dark-web-box-textt').fadeIn(350);
    $(".dark-web-box-textt-input").val(ChatName+ " ");
});

$(document).on('click', '.dark-web-retweet', function(e){
    e.preventDefault();
    var ChatName = $(this).parent().parent().data('chathandler');
    var isRetweet =  $(this).parent().parent().data('type');
    var ChatMessage = $(this).parent().data('chatmessage');
    var imageURL = $(this).parent().data('imagemessage');
    var CompleteRetweet = "RT " + ChatName + " " + ChatMessage

    if (isRetweet !== 'retweet'){
        var CurrentDate = new Date();
        if (imageURL == null){
            imageURL = ""
        }
        setTimeout(function(){
            ConfirmationFrame()
        }, 150);
        $.post('https://qb-phone/PostNewChat', JSON.stringify({
            Message: CompleteRetweet,
            Date: CurrentDate,
            url: imageURL,
            type: 'chat'
        }))
    } else {
        QB.Phone.Notifications.Add("fab fa-user-secret", "Dark Web", "Cannot retweet a retweet!", "#1DA1F2");
    }
});

$(document).on('click', '.dark-web-flag', function(e){
    e.preventDefault();
    var ChatName = $(this).parent().parent().data('chathandler');
    var ChatMessage = $(this).parent().data('chatmessage');
    $.post('https://qb-phone/FlagChat', JSON.stringify({
        name: ChatName,
        message: ChatMessage,
    }))
});

$(document).on('click','.dark-web-trash',function(e){
    e.preventDefault();
    var source = $(this).parent().parent().data('chatId');
    $.post('https://qb-phone/DeleteChat', JSON.stringify({id: source}))
})
