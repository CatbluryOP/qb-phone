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
    QB.Phone.Notifications.Add("fab fa-dark-web", "Dark Web", $(elem).data('mentiontag')+ " copied!", "rgb(27, 149, 224)", 2500);
    document.execCommand("copy");
    $temp.remove();
}

QB.Phone.Notifications.LoadTweets = function(Tweets, hasVPN=false) {
    Tweets = Tweets.reverse();

    if (hasVPN) {
        $(".tweet-anonymous").css("display", "block");
    } else {
        $(".tweet-anonymous").css("display", "none");
    }

    if (Tweets !== null && Tweets !== undefined && Tweets !== "" && Tweets.length > 0) {
        $(".dark-web-home-tab").html("");
        $.each(Tweets, function(i, Tweet){
            var TwtMessage = Tweet.message
            var TimeAgo = moment(Tweet.date).format('MM/DD/YYYY hh:mm');
            var DarkWebHandle = Tweet.firstName + ' ' + Tweet.lastName

            if (Tweet.url == "") {
                if (Tweet.citizenid === QB.Phone.Data.PlayerData.citizenid){
                    var TweetElement = 
                    '<div class="dark-web-tweet-id">' +
                        '<div class="dark-web-tweet" data-twtid ="'+Tweet.tweetId+'" data-twthandler="@' + DarkWebHandle.replace(" ", "_") + '" data-type ="'+Tweet.type+'">'+
                            '<div class="tweet-tweeter">' + ' &nbsp;<span>@' + DarkWebHandle.replace(" ", "_") + '</span></div>' + // Title
                            '<div class="tweet-time">' + TimeAgo + '</div>' +
                        '</div>' +
                        '<div class="postingan" data-twtid ="'+Tweet.tweetId+'" data-twthandler="@' + DarkWebHandle.replace(" ", "_") + '" data-type ="'+Tweet.type+'">' +
                            '<div class="tweet-reply"><i class="fas fa-share"></i></div>' +
                            '<div class="dark-web-retweet" data-twtmessage="'+TwtMessage+'"><div class="tweet-retweet"><i class="fas fa-retweet"></i></div>'+
                            '<div class="tweet-trash"><i class="fas fa-trash"></i></div>'+
                            '<div class="tweet-message" style="padding-bottom: 2.5vh;">' + TwtMessage + '</div>' +
                        '</div>' +
                    '</div>';
                    $(".dark-web-home-tab").append(TweetElement);
                }else{
                    var TweetElement = 
                    '<div class="dark-web-tweet-id">' +
                        '<div class="dark-web-tweet" data-twtid ="'+Tweet.tweetId+'" data-twthandler="@' + DarkWebHandle.replace(" ", "_") + '" data-type ="'+Tweet.type+'">'+
                            '<div class="tweet-tweeter">' + ' &nbsp;<span>@' + DarkWebHandle.replace(" ", "_") + '</span></div>' + // Title
                            '<div class="tweet-time">' + TimeAgo + '</div>' +
                        '</div>' +
                        '<div class="postingan" data-twtid ="'+Tweet.tweetId+'" data-twthandler="@' + DarkWebHandle.replace(" ", "_") + '" data-type ="'+Tweet.type+'">' +
                            '<div class="tweet-reply"><i class="fas fa-share"></i></div>' +
                            '<div class="dark-web-retweet" data-twtmessage="'+TwtMessage+'"><div class="tweet-retweet"><i class="fas fa-retweet"></i></div>'+
                            '<div class="tweet-flag"><i class="fas fa-flag"></i></div>'+
                            '<div class="tweet-message" style="padding-bottom: 2.5vh;">' + TwtMessage + '</div>' +
                        '</div>' +
                    '</div>';
                    $(".dark-web-home-tab").append(TweetElement);
                }
            } else {
                if (Tweet.citizenid === QB.Phone.Data.PlayerData.citizenid){
                    var TweetElement = 
                    '<div class="dark-web-tweet-id">' +
                        '<div class="dark-web-tweet" data-twtid ="'+Tweet.tweetId+'" data-twthandler="@'+DarkWebHandle.replace(" ", "_") + '" data-type ="'+Tweet.type+'">'+
                            '<div class="tweet-tweeter">' + ' &nbsp;<span>@'+DarkWebHandle.replace(" ", "_")+ '</span></div>'+ // Title
                            '<div class="tweet-time">' + TimeAgo + '</div>' +
                        '</div>' +
                        '<div class="postingan" data-twtid ="'+Tweet.tweetId+'" data-twthandler="@'+DarkWebHandle.replace(" ", "_") + '" data-type ="'+Tweet.type+'">' +
                            '<div class="tweet-reply"><i class="fas fa-share"></i></div>'+
                            '<div class="dark-web-retweet" data-imagemessage="'+Tweet.url+'" data-twtmessage="'+TwtMessage+'"><div class="tweet-retweet"><i class="fas fa-retweet"></i></div>'+
                            '<div class="tweet-trash"><i class="fas fa-trash"></i></div>'+
                            '<div class="tweet-message"><p>'+TwtMessage+'</p></div>' +
                            '<div class="tweet-image-attached">Images Attached: 1<p></p></div>'+
                            '<img class="image" src= ' + Tweet.url + ' style = " display: none; border-radius:4px; width: 80%; position:relative; z-index: 1; left: 0.4vw; margin:.6rem .5rem .6rem 1rem;height: auto; bottom: 3.5vh;">' +
                            '<div class="tweet-block">' +
                                '<div class="tweet-eye"><i class="fas fa-eye"></i></div>'+
                                '<div class="tweet-image-text">Click to View</div>'+
                                '<div class="tweet-image-text-other">Only reveal images from those you<p>know are not total pricks</p></div>'+
                            '</div>'+
                        '</div>' +
                    '</div>';
                    $(".dark-web-home-tab").append(TweetElement);
                }else{
                    var TweetElement = 
                    '<div class="dark-web-tweet-id">' +
                        '<div class="dark-web-tweet" data-twtid ="'+Tweet.tweetId+'" data-twthandler="@'+DarkWebHandle.replace(" ", "_") + '" data-type ="'+Tweet.type+'">'+
                            '<div class="tweet-tweeter">' + ' &nbsp;<span>@'+DarkWebHandle.replace(" ", "_")+ '</span></div>'+ // Title
                            '<div class="tweet-time">' + TimeAgo + '</div>' +
                        '</div>' +
                        '<div class="postingan data-twtid ="'+Tweet.tweetId+'" data-twthandler="@'+DarkWebHandle.replace(" ", "_") + '" data-type ="'+Tweet.type+'">' +
                            '<div class="tweet-reply"><i class="fas fa-share"></i></div>'+
                            '<div class="dark-web-retweet" data-imagemessage="'+Tweet.url+'" data-twtmessage="'+TwtMessage+'"><div class="tweet-retweet"><i class="fas fa-retweet"></i></div>'+
                            '<div class="tweet-flag"><i class="fas fa-flag"></i></div>'+
                            '<div class="tweet-message"><p>'+TwtMessage+'</p></div>' +
                            '<div class="tweet-image-attached">Images Attached: 1<p></p></div>'+
                            '<img class="image" src= ' + Tweet.url + ' style = " display: none; border-radius:4px; width: 80%; position:relative; z-index: 1; left: 0.4vw; margin:.6rem .5rem .6rem 1rem;height: auto; bottom: 3.5vh;">' +
                            '<div class="tweet-block">' +
                                '<div class="tweet-eye"><i class="fas fa-eye"></i></div>'+
                                '<div class="tweet-image-text">Click to View</div>'+
                                '<div class="tweet-image-text-other">Only reveal images from those you<p>know are not total pricks</p></div>'+
                            '</div>'+
                        '</div>' +
                    '</div>';
                    $(".dark-web-home-tab").append(TweetElement);
                }
            }
        });
    } else {
        var TweetElement = '<div class="dark-web-tweet-id"><div class="dark-web-tweet"><span>No messages yet.</span></div></div>'
        $(".dark-web-home-tab").append(TweetElement);
    }
}


$(".dark-web-app").on('click', function(){
    QB.Phone.Functions.LoadDarkWebApp();
});
