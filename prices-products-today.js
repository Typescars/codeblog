imgr = new Array();
imgr[0] = "https://sites.google.com/site/fdblogsite/Home/nothumbnail.gif";
showRandomImg = true;
aBold = true;
numposts1 = 4;
numposts11 = 1;
newsize = 400;
function recentposts1(json) {
 j = showRandomImg ? Math.floor((imgr.length + 1) * Math.random()) : 0;
 img = new Array;
 if (numposts1 <= json.feed.entry.length) maxpost = numposts1;
 else maxpost = json.feed.entry.length;
 document.write('<div class="blog_featured_posts">');
 for (var i = 0; i < maxpost; i++) {
  var entry = json.feed.entry[i];
  var posttitle = entry.title.$t;
  var tag = entry.category[0].term;
  var pcm;
  var posturl;
  var cropsize = newsize;
  if (i == json.feed.entry.length) break;
  for (var k = 0; k < entry.link.length; k++) if (entry.link[k].rel == "alternate") {
   posturl = entry.link[k].href;
   break
  }
  for (var k = 0; k < entry.link.length; k++) if (entry.link[k].rel == "replies" && entry.link[k].type == "text/html") {
   pcm = entry.link[k].title.split(" ")[0];
   break
  }
  if ("content" in entry) var postcontent = entry.content.$t;
  else if ("summary" in entry) var postcontent = entry.summary.$t;
  else var postcontent = "";
  postdate = entry.published.$t;
  if (j > imgr.length - 1) j = 0;
  img[i] = imgr[j];
  s = postcontent;
  a = s.indexOf("<img");
  b = s.indexOf('src="', a);
  c = s.indexOf('"', b + 5);
  d = s.substr(b + 5, c - b - 5);
  if (a != -1 && (b != -1 && (c != -1 && d != ""))) img[i] = d;
  var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  var month2 = ["Ì‰«Ì—", "›»—«Ì—", "„«—”", "√»—Ì·", "„«ÌÊ", "ÌÊ‰ÌÊ", "ÌÊ·ÌÊ", "√€”ÿ”", "”» „»—", "√ﬂ Ê»—", "‰Ê›„»—", "œÌ”„»—"];
  var day = postdate.split("-")[2].substring(0, 2);
  var m = postdate.split("-")[1];
  var y = postdate.split("-")[0];
  for (var u2 = 0; u2 < month.length; u2++) if (parseInt(m) == month[u2]) {
   m = month2[u2];
   break
  }
  var daystr = day + " " + m + " " + y;
  if (i == 0) {
   var st = "#FF3D66";
   var trtd = '<div class="blog_featured_post first"><a href="' + posturl + '"><div class="blog_contents"><span>' + tag + '</span><h3>' + posttitle + '</h3></div><div class="feat-img" style="background-image:url(' + img[i] + ');"></div></a></div>';
   document.write(trtd)
  }
  if (i == 1) {
   var trtd = '<div class="blog_featured_post second"><a href="' + posturl + '"><div class="blog_contents"><span>' + tag + '</span><h3>' + posttitle + '</h3></div><div class="feat-img" style="background-image:url(' + img[i] + ');"></div></a></div>';
   document.write(trtd)
  }
  if (i == 2) {
   var trtd = '<div class="blog_featured_post third"><a href="' + posturl + '"><div class="blog_contents"><span>' + tag + '</span><h3>' + posttitle + '</h3></div><div class="feat-img" style="background-image:url(' + img[i] + ');"></div></a></div>';
   document.write(trtd)
  }
  if (i == 3) {
   var trtd = '<div class="blog_featured_post fourth"><a href="' + posturl + '"><div class="blog_contents"><span>' + tag + '</span><h3>' + posttitle + '</h3></div><div class="feat-img" style="background-image:url(' + img[i] + ');"></div></a></div>';
   document.write(trtd)
  }
  j++
 }
 document.write('</div>')
};

function removeHtmlTag(strx,chop){
if(strx.indexOf("<")!=-1)
{
var s = strx.split("<");
for(var i=0;i<s.length;i++){
if(s[i].indexOf(">")!=-1){
s[i] = s[i].substring(s[i].indexOf(">")+1,s[i].length);
}
}
strx = s.join("");
}
chop = (chop < strx.length-1) ? chop : strx.length-2;
while(strx.charAt(chop-1)!=' ' && strx.indexOf(' ',chop)!=-1) chop++;
strx = strx.substring(0,chop-1);
return strx+'...';
}
function createSummaryAndThumb(pID, pURL, pTITLE){
var div = document.getElementById(pID);
var imgtag = "";
var img = div.getElementsByTagName("img");
var summ = posts_no_thumb_sum;
if(img.length>=1) {
imgtag = '<div class="posts-thumb"><a href="'+ pURL +'" title="'+ pTITLE+'"><img src="'+img[0].src+'" width="'+img_thumb_width+'px" height="'+img_thumb_height+'px" /></a></div>';
summ = posts_thumb_sum;
}

var summary = imgtag + '<div class="post-info"><h2 class="post-title"><a href="' + pURL + '">' + pTITLE + '</a></h2></div><div class="post-summary">' + removeHtmlTag(div.innerHTML,summ) + '</div>';
div.innerHTML = summary;
}

var relatedTitles=new Array();var relatedTitlesNum=0;var relatedUrls=new Array();var thumburl=new Array();function related_results_labels_thumbs(json){for(var i=0;i<json.feed.entry.length;i++){var entry=json.feed.entry[i];relatedTitles[relatedTitlesNum]=entry.title.$t;try{thumburl[relatedTitlesNum]=entry.media$thumbnail.url}catch(error){s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")){thumburl[relatedTitlesNum]=d}else{if(typeof(defaultnoimage)!=='undefined')thumburl[relatedTitlesNum]=defaultnoimage;else thumburl[relatedTitlesNum]="https://1.bp.blogspot.com/_u4gySN2ZgqE/SosvnavWq0I/AAAAAAAAArk/yL95WlyTqr0/s400/noimage.png"}}if(relatedTitles[relatedTitlesNum].length>35)relatedTitles[relatedTitlesNum]=relatedTitles[relatedTitlesNum].substring(0,35)+"...";for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){relatedUrls[relatedTitlesNum]=entry.link[k].href;relatedTitlesNum++}}}}function removeRelatedDuplicates_thumbs(){var tmp=new Array(0);var tmp2=new Array(0);var tmp3=new Array(0);for(var i=0;i<relatedUrls.length;i++){if(!contains_thumbs(tmp,relatedUrls[i])){tmp.length+=1;tmp[tmp.length-1]=relatedUrls[i];tmp2.length+=1;tmp3.length+=1;tmp2[tmp2.length-1]=relatedTitles[i];tmp3[tmp3.length-1]=thumburl[i]}}relatedTitles=tmp2;relatedUrls=tmp;thumburl=tmp3}function contains_thumbs(a,e){for(var j=0;j<a.length;j++)if(a[j]==e)return true;return false}function printRelatedLabels_thumbs(current){var splitbarcolor;if(typeof(splittercolor)!=='undefined')splitbarcolor=splittercolor;else splitbarcolor="#d4eaf2";for(var i=0;i<relatedUrls.length;i++){if((relatedUrls[i]==current)||(!relatedTitles[i])){relatedUrls.splice(i,1);relatedTitles.splice(i,1);thumburl.splice(i,1);i--}}var r=Math.floor((relatedTitles.length-1)*Math.random());var i=0;if(relatedTitles.length>0)document.write('<ul id="related-posts">');while(i<relatedTitles.length&&i<20&&i<maxresults){document.write('<li><a');document.write(' href="'+relatedUrls[r]+'"><img src="'+thumburl[r]+'"/><span class="overlay">'+relatedTitles[r]+'</span></a></li>');i++;if(r<relatedTitles.length-1){r++}else{r=0}}document.write('</ul>');relatedUrls.splice(0,relatedUrls.length);thumburl.splice(0,thumburl.length);relatedTitles.splice(0,relatedTitles.length)}
$(document).ready(function() {
$('#related-posts img').attr('src', function(i, src) {return src.replace( 's72-c', 's640' );});
$('#related-posts img').attr('src', function(i, src) {return src.replace( '/default.jpg', '/mqdefault.jpg' );});
});

(function() {
      var items = <data:post.commentJso/>;
      var msgs = <data:post.commentMsgs/>;
      var config = <data:post.commentConfig/>;

// <![CDATA[
      var cursor = null;
      if (items && items.length > 0) {
        cursor = parseInt(items[items.length - 1].timestamp) + 1;
      }

      var bodyFromEntry = function(entry) {
        var text = (entry &&
                    ((entry.content && entry.content.$t) ||
                     (entry.summary && entry.summary.$t))) ||
            '';
        if (entry && entry.gd$extendedProperty) {
          for (var k in entry.gd$extendedProperty) {
            if (entry.gd$extendedProperty[k].name == 'blogger.contentRemoved') {
              return '<span class="deleted-comment">' + text + '</span>';
            }
          }
        }
        return text;
      }

      var parse = function(data) {
        cursor = null;
        var comments = [];
        if (data && data.feed && data.feed.entry) {
          for (var i = 0, entry; entry = data.feed.entry[i]; i++) {
            var comment = {};
            // comment ID, parsed out of the original id format
            var id = /blog-(\d+).post-(\d+)/.exec(entry.id.$t);
            comment.id = id ? id[2] : null;
            comment.body = bodyFromEntry(entry);
            comment.timestamp = Date.parse(entry.published.$t) + '';
            if (entry.author && entry.author.constructor === Array) {
              var auth = entry.author[0];
              if (auth) {
                comment.author = {
                  name: (auth.name ? auth.name.$t : undefined),
                  profileUrl: (auth.uri ? auth.uri.$t : undefined),
                  avatarUrl: (auth.gd$image ? auth.gd$image.src : undefined)
                };
              }
            }
            if (entry.link) {
              if (entry.link[2]) {
                comment.link = comment.permalink = entry.link[2].href;
              }
              if (entry.link[3]) {
                var pid = /.*comments\/default\/(\d+)\?.*/.exec(entry.link[3].href);
                if (pid && pid[1]) {
                  comment.parentId = pid[1];
                }
              }
            }
            comment.deleteclass = 'item-control blog-admin';
            if (entry.gd$extendedProperty) {
              for (var k in entry.gd$extendedProperty) {
                if (entry.gd$extendedProperty[k].name == 'blogger.itemClass') {
                  comment.deleteclass += ' ' + entry.gd$extendedProperty[k].value;
                } else if (entry.gd$extendedProperty[k].name == 'blogger.displayTime') {
                  comment.displayTime = entry.gd$extendedProperty[k].value;
                }
              }
            }
            comments.push(comment);
          }
        }
        return comments;
      };

      var paginator = function(callback) {
        if (hasMore()) {
          var url = config.feed + '?alt=json&v=2&orderby=published&reverse=false&max-results=50';
          if (cursor) {
            url += '&published-min=' + new Date(cursor).toISOString();
          }
          window.bloggercomments = function(data) {
            var parsed = parse(data);
            cursor = parsed.length < 50 ? null
                : parseInt(parsed[parsed.length - 1].timestamp) + 1
            callback(parsed);
            window.bloggercomments = null;
          }
          url += '&callback=bloggercomments';
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
          document.getElementsByTagName('head')[0].appendChild(script);
        }
      };
      var hasMore = function() {
        return !!cursor;
      };
      var getMeta = function(key, comment) {
        if ('iswriter' == key) {
          var matches = !!comment.author
              && comment.author.name == config.authorName
              && comment.author.profileUrl == config.authorUrl;
          return matches ? 'true' : '';
        } else if ('deletelink' == key) {
          return config.baseUri + '/delete-comment.g?blogID='
               + config.blogId + '&postID=' + comment.id;
        } else if ('deleteclass' == key) {
          return comment.deleteclass;
        }
        return '';
      };

      var replybox = null;
      var replyUrlParts = null;
      var replyParent = undefined;

      var onReply = function(commentId, domId) {
        if (replybox == null) {
          // lazily cache replybox, and adjust to suit this style:
          replybox = document.getElementById('comment-editor');
          if (replybox != null) {
            replybox.height = '250px';
            replybox.style.display = 'block';
            replyUrlParts = replybox.src.split('#');
          }
        }
        if (replybox && (commentId !== replyParent)) {
          replybox.src = '';
          document.getElementById(domId).insertBefore(replybox, null);
          replybox.src = replyUrlParts[0]
              + (commentId ? '&parentID=' + commentId : '')
              + '#' + replyUrlParts[1];
          replyParent = commentId;
        }
      };

      var hash = (window.location.hash || '#').substring(1);
      var startThread, targetComment;
      if (/^comment-form_/.test(hash)) {
        startThread = hash.substring('comment-form_'.length);
      } else if (/^c[0-9]+$/.test(hash)) {
        targetComment = hash.substring(1);
      }

      // Configure commenting API:
      var configJso = {
        'maxDepth': config.maxThreadDepth
      };
      var provider = {
        'id': config.postId,
        'data': items,
        'loadNext': paginator,
        'hasMore': hasMore,
        'getMeta': getMeta,
        'onReply': onReply,
        'rendered': true,
        'initComment': targetComment,
        'initReplyThread': startThread,
        'config': configJso,
        'messages': msgs
      };

      var render = function() {
        if (window.goog && window.goog.comments) {
          var holder = document.getElementById('comment-holder');
          window.goog.comments.render(holder, provider);
        }
      };

      // render now, or queue to render when library loads:
      if (window.goog && window.goog.comments) {
        render();
      } else {
        window.goog = window.goog || {};
        window.goog.comments = window.goog.comments || {};
        window.goog.comments.loadQueue = window.goog.comments.loadQueue || [];
        window.goog.comments.loadQueue.push(render);
      }
    })();

(function(a){a.fn.simpleTab=function(b){b=jQuery.extend({active:1,fx:null,showSpeed:400,hideSpeed:400,showEasing:null,hideEasing:null,show:function(){},hide:function(){},change:function(){}},b);return this.each(function(){var e=a(this),c=e.children("[data-tab]"),d=b.active-1;e.addClass("simpleTab").prepend('<ul class="tab-wrapper"></ul>');c.addClass("tab-content").each(function(){a(this).hide();e.find(".tab-wrapper").append('<li><a href="#">'+a(this).data("tab")+"</a></li>")}).eq(d).show();e.find(".tab-wrapper a").on("click",function(){var f=a(this).parent().index();a(this).closest(".tab-wrapper").find(".activeTab").removeClass("activeTab");a(this).addClass("activeTab");if(b.fx=="slide"){if(c.eq(f).is(":hidden")){c.slideUp(b.hideSpeed,b.hideEasing,function(){b.hide.call(e)}).eq(f).slideDown(b.showSpeed,b.showEasing,function(){b.show.call(e)})}}else{if(b.fx=="fade"){if(c.eq(f).is(":hidden")){c.hide().eq(f).fadeIn(b.showSpeed,b.showEasing,function(){b.show.call(e)})}}else{if(b.fx=="fancyslide"){if(c.eq(f).is(":hidden")){c.slideUp(b.hideSpeed,b.hideEasing,function(){b.hide.call(e)}).eq(f).delay(b.hideSpeed).slideDown(b.showSpeed,b.showEasing,function(){b.show.call(e)})}}else{if(c.eq(f).is(":hidden")){c.hide().eq(f).show()}}}}b.change.call(e);return false}).eq(d).addClass("activeTab")})}})(jQuery);}function createSummaryAndThumb(pID){var div = document.getElementById(pID);var imgtag = "";var img = div.getElementsByTagName("img");var summ = summary_noimg;if(img.length>=1) { imgtag = '<span style="float:left; height: 180px;  margin-right: 15px; margin-top:4px; "><img src="'+img[0].src+'" width="'+img_thumb_width+'px" height="'+img_thumb_height+'px"/></span>'; summ = summary_img; } var summary = imgtag + '<div>' + removeHtmlTag(div.innerHTML,summ) + '</div>'; div.innerHTML =summary; }
(function(){var e=document.getElementsByTagName("pre"),t=e.length;for(var n=0;n<t;n++){e[n].innerHTML='<span class="line-number"></span>'+e[n].innerHTML+'<span class="cl"></span>';var r=e[n].innerHTML.split(/\n/).length;for(var i=0;i<r;i++){var s=e[n].getElementsByTagName("span")[0];s.innerHTML+="<span>"+(i+1)+"</span>"}}})();$(document).ready(function(){$("#contact").appendTo(".contact-form");$(".contact-form #contact").css("display","block");$(".post-tabs").simpleTab({active:1,fx:"fade",showSpeed:400,hideSpeed:400})});
$(".intro .widget-content").each(function(){var e=$(this).text();if(e.match("random")){$.ajax({url:"/feeds/posts/default?alt=json-in-script",type:"get",dataType:"jsonp",success:function(e){var t=e.feed.entry.length;var n=0;var r=t-3;var i=Math.floor(Math.random()*(r-n+1))+n;$.ajax({url:"/feeds/posts/default?alt=json-in-script&start-index="+i+"&max-results=3",type:"get",dataType:"jsonp",success:function(e){var t="";var n="<ul>";for(var r=0;r<e.feed.entry.length;r++){for(var i=0;i<e.feed.entry[r].link.length;i++){if(e.feed.entry[r].link[i].rel=="alternate"){t=e.feed.entry[r].link[i].href;break}}var s=e.feed.entry[r].title.$t;var o=e.feed.entry[r].author[0].name.$t;var u=e.feed.entry[r].published.$t.substring(0,10);var a=e.feed.entry[r].category[0].term;var f=e.feed.entry[r].content.$t;var l=$("<div>").html(f);var c=l.find("img:first").attr("src");var h=e.feed.entry[r].media$thumbnail.url;if(c===undefined){var p='<a class="rcp-thumb" href="'+t+'" style="background:url('+h+') no-repeat center center;background-size: cover"/>'}else{var p='<a class="rcp-thumb" href="'+t+'" style="background:url('+c+') no-repeat center center;background-size: cover"/>'}n+='<li><a href="/search/label/'+a+'" class="post-tag">'+a+"</a>"+p+'<div class="post-panel"><h3 class="rcp-title"><a href="'+t+'">'+s+'</a></h3><span class="recent-date">'+u+'</span><span class="recent-author2">'+o+"</span></div></li>"}n+='<div class="clear"/></ul>';$(".intro .widget-content").each(function(){if($(this).text().match("random")){$(this).html(n);$(this).removeClass("widget-content").addClass("layout-content");$(".intro-loader").remove();$(this).find(".rcp-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}})}if(e.match("recent")){$.ajax({url:"/feeds/posts/default?alt=json-in-script",type:"get",dataType:"jsonp",success:function(e){$.ajax({url:"/feeds/posts/default?alt=json-in-script&max-results=3",type:"get",dataType:"jsonp",success:function(e){var t="";var n="<ul>";for(var r=0;r<e.feed.entry.length;r++){for(var i=0;i<e.feed.entry[r].link.length;i++){if(e.feed.entry[r].link[i].rel=="alternate"){t=e.feed.entry[r].link[i].href;break}}var s=e.feed.entry[r].title.$t;var o=e.feed.entry[r].author[0].name.$t;var u=e.feed.entry[r].published.$t.substring(0,10);var a=e.feed.entry[r].category[0].term;var f=e.feed.entry[r].content.$t;var l=$("<div>").html(f);var c=l.find("img:first").attr("src");var h=e.feed.entry[r].media$thumbnail.url;if(c===undefined){var p='<a class="rcp-thumb" href="'+t+'" style="background:url('+h+') no-repeat center center;background-size: cover"/>'}else{var p='<a class="rcp-thumb" href="'+t+'" style="background:url('+c+') no-repeat center center;background-size: cover"/>'}n+='<li><a href="/search/label/'+a+'" class="post-tag">'+a+"</a>"+p+'<div class="post-panel"><h3 class="rcp-title"><a href="'+t+'">'+s+'</a></h3><span class="recent-date">'+u+'</span><span class="recent-author2">'+o+"</span></div></li>"}n+='<div class="clear"/></ul>';$(".intro .widget-content").each(function(){if($(this).text().match("recent")){$(this).html(n);$(this).removeClass("widget-content").addClass("layout-content");$(".intro-loader").remove();$(this).find(".rcp-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}})}});$(".widget-content").each(function(){var e=$(this).text();if(e.match("recentcomments")){$.ajax({url:"/feeds/comments/default?alt=json-in-script&max-results=5",type:"get",dataType:"jsonp",success:function(e){var t="";var n='<ul class="commentswidget">';for(var r=0;r<e.feed.entry.length;r++){if(r==e.feed.entry.length)break;for(var i=0;i<e.feed.entry[r].link.length;i++){if(e.feed.entry[r].link[i].rel=="alternate"){t=e.feed.entry[r].link[i].href;break}}if("content"in e.feed.entry[r]){var s=e.feed.entry[r].content.$t}else if("summary"in b_rc){var s=e.feed.entry[r].summary.$t}else var s="";var o=/<\S[^>]*>/g;s=s.replace(o,"");if(s.length>90){s=""+s.substring(0,70)+"..."}var u=e.feed.entry[r].title.$t;var a=e.feed.entry[r].author[0].name.$t;var f=e.feed.entry[r].author[0].gd$image.src;if(f.match("https://img1.blogblog.com/img/blank.gif")){var l='<img class="rc-img" src="https://img1.blogblog.com/img/anon36.png"/>'}else{if(f.match("https://img2.blogblog.com/img/b16-rounded.gif")){var l='<img class="rc-img" src="https://img1.blogblog.com/img/anon36.png"/>'}else{var l='<div class="avatarImage avatarRound"><img class="avatarRound" src="'+f+'"/></div>'}}n+="<li>"+l+'<a href="'+t+'">'+a+'</a><span>"'+s+'"</span></li>'}n+='</ul><div class="clear"/>';$(".widget-content").each(function(){if($(this).text().match("recentcomments")){$(this).html(n);$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(e.match("randomposts")){$.ajax({url:"/feeds/posts/default?alt=json-in-script",type:"get",dataType:"jsonp",success:function(e){var t=e.feed.entry.length;var n=0;var r=t-5;var i=Math.floor(Math.random()*(r-n+1))+n;$.ajax({url:"/feeds/posts/default?alt=json-in-script&start-index="+i+"&max-results=5",type:"get",dataType:"jsonp",success:function(e){var t="";var n='<ul class="post-widget">';for(var r=0;r<e.feed.entry.length;r++){for(var i=0;i<e.feed.entry[r].link.length;i++){if(e.feed.entry[r].link[i].rel=="alternate"){t=e.feed.entry[r].link[i].href;break}}var s=e.feed.entry[r].title.$t;var o=e.feed.entry[r].author[0].name.$t;var u=e.feed.entry[r].published.$t.substring(0,10);var a=e.feed.entry[r].category[0].term;var f=e.feed.entry[r].content.$t;var l=$("<div>").html(f);var c=l.find("img:first").attr("src");var h=e.feed.entry[r].media$thumbnail.url;if(c===undefined){var p='<a class="rcp-thumb" href="'+t+'" style="background:url('+h+') no-repeat center center;background-size: cover"/>'}else{var p='<a class="rcp-thumb" href="'+t+'" style="background:url('+c+') no-repeat center center;background-size: cover"/>'}n+="<li>"+p+'<div class="post-panel"><h3 class="rcp-title"><a href="'+t+'">'+s+'</a></h3><span class="recent-date">'+u+'</span><span class="recent-author2">'+o+"</span></div></li>"}n+='</ul><div class="clear"/>';$(".widget-content").each(function(){if($(this).text().match("randomposts")){$(this).html(n);$(this).find(".rcp-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}})}if(e.match("recentposts")){$.ajax({url:"/feeds/posts/default?alt=json-in-script",type:"get",dataType:"jsonp",success:function(e){$.ajax({url:"/feeds/posts/default?alt=json-in-script&max-results=5",type:"get",dataType:"jsonp",success:function(e){var t="";var n='<ul class="post-widget">';for(var r=0;r<e.feed.entry.length;r++){for(var i=0;i<e.feed.entry[r].link.length;i++){if(e.feed.entry[r].link[i].rel=="alternate"){t=e.feed.entry[r].link[i].href;break}}var s=e.feed.entry[r].title.$t;var o=e.feed.entry[r].author[0].name.$t;var u=e.feed.entry[r].published.$t.substring(0,10);var a=e.feed.entry[r].category[0].term;var f=e.feed.entry[r].content.$t;var l=$("<div>").html(f);var c=l.find("img:first").attr("src");var h=e.feed.entry[r].media$thumbnail.url;if(c===undefined){var p='<a class="rcp-thumb" href="'+t+'" style="background:url('+h+') no-repeat center center;background-size: cover"/>'}else{var p='<a class="rcp-thumb" href="'+t+'" style="background:url('+c+') no-repeat center center;background-size: cover"/>'}n+="<li>"+p+'<div class="post-panel"><h3 class="rcp-title"><a href="'+t+'">'+s+'</a></h3><span class="recent-date">'+u+'</span><span class="recent-author2">'+o+"</span></div></li>"}n+='</ul><div class="clear"/>';$(".widget-content").each(function(){if($(this).text().match("recentposts")){$(this).html(n);$(this).find(".rcp-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}})}});
$(".recent-layout .widget-content").each(function(){var e=$(this).html(),t=$(this).prev("h2").text();var n=e.match(/[^[\]]+(?=])/g);$(this).html("<span>"+n[0]+"</span><span>"+n[1]+"</span><span>"+n[2]+"</span>");var r=$(this).text();var i=$(this).find("span").eq(0).text();var s=$(this).find("span").eq(1).text();var o=$(this).find("span").eq(2).text();if(s.match("fbig1")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=5",type:"get",dataType:"jsonp",success:function(e){var n="";var s="<ul>";for(var u=0;u<e.feed.entry.length;u++){for(var a=0;a<e.feed.entry[u].link.length;a++){if(e.feed.entry[u].link[a].rel=="alternate"){n=e.feed.entry[u].link[a].href;break}}var f=e.feed.entry[u].title.$t;var l=e.feed.entry[u].author[0].name.$t;var c=e.feed.entry[u].published.$t.substring(0,10);var h=e.feed.entry[u].content.$t;var p=$("<div>").html(h);var d=p.find("img:first").attr("src");var v=e.feed.entry[u].media$thumbnail.url;if(u==0){var m=/<\S[^>]*>/g;var y=h.replace(m,"");if(y.length>150){y=""+y.substring(0,150)+"..."}if(d===undefined){var b='<a class="first-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var b='<a class="first-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}}else{if(d===undefined){var b='<a class="recent-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var b='<a class="recent-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}}if(u==0){s+='<div class="first"><div class="rthumbc">'+b+'</div><div class="first-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span><p class="recent-des">'+y+'<p><div class="post-readmore"><a href="'+n+'"><i class="fa fa-long-arrow-right"></i></a></div></div></div>'}else{s+='<li><div class="rthumbc">'+b+'</div><div class="recent-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author22">'+l+'</span></div><div class="clear"/></li>'}}s+="</ul>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(s);$(this).parent().addClass("fbig1");$(this).parent().addClass("fbig");$(this).prev("h2").html('<a href="/search/label/'+i+'">'+t+"</a>");$(this).prev("h2").css("background",o);$(this).prev("h2").wrap('<div class="box-title"></div>');$(this).prev(".box-title").css("border-color",o);$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+i+'"></a>');$(this).find(".post-readmore a").css("background",o);$(this).removeClass("widget-content").addClass("layout-content");$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$(this).find(".first-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(s.match("fbig2")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=5",type:"get",dataType:"jsonp",success:function(e){var n="";var s="<ul>";for(var u=0;u<e.feed.entry.length;u++){for(var a=0;a<e.feed.entry[u].link.length;a++){if(e.feed.entry[u].link[a].rel=="alternate"){n=e.feed.entry[u].link[a].href;break}}var f=e.feed.entry[u].title.$t;var l=e.feed.entry[u].author[0].name.$t;var c=e.feed.entry[u].published.$t.substring(0,10);var h=e.feed.entry[u].content.$t;var p=$("<div>").html(h);var d=p.find("img:first").attr("src");var v=e.feed.entry[u].media$thumbnail.url;if(u==0){var m=/<\S[^>]*>/g;var y=h.replace(m,"");if(y.length>100){y=""+y.substring(0,100)+"..."}if(d===undefined){var b='<a class="first-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var b='<a class="first-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}}else{if(d===undefined){var b='<a class="recent-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var b='<a class="recent-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}}if(u==0){s+='<div class="first"><div class="rthumbc">'+b+'</div><div class="first-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span><p class="recent-des">'+y+"<p></div></div>"}else{s+='<li><div class="rthumbc">'+b+'</div><div class="recent-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span></div><div class="clear"/></li>'}}s+="</ul>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(s);$(this).parent().addClass("fbig2");$(this).parent().addClass("fbig");$(this).prev("h2").html('<a href="/search/label/'+i+'">'+t+"</a>");$(this).prev("h2").css("background",o);$(this).prev("h2").wrap('<div class="box-title"></div>');$(this).prev(".box-title").css("border-color",o);$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+i+'"></a>');$(this).removeClass("widget-content").addClass("layout-content");$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$(this).find(".first-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(s.match("column1")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=5",type:"get",dataType:"jsonp",success:function(e){var n="";var s="<ul>";for(var u=0;u<e.feed.entry.length;u++){for(var a=0;a<e.feed.entry[u].link.length;a++){if(e.feed.entry[u].link[a].rel=="alternate"){n=e.feed.entry[u].link[a].href;break}}var f=e.feed.entry[u].title.$t;var l=e.feed.entry[u].author[0].name.$t;var c=e.feed.entry[u].published.$t.substring(0,10);var h=e.feed.entry[u].content.$t;var p=$("<div>").html(h);var d=p.find("img:first").attr("src");var v=e.feed.entry[u].media$thumbnail.url;if(u==0){var m=/<\S[^>]*>/g;var y=h.replace(m,"");if(y.length>100){y=""+y.substring(0,100)+"..."}if(d===undefined){var b='<a class="first-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var b='<a class="first-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}}else{if(d===undefined){var b='<a class="recent-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var b='<a class="recent-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}}if(u==0){s+='<div class="first"><div class="rthumbc">'+b+'</div><div class="first-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span><p class="recent-des">'+y+"<p></div></div>"}else{s+='<li><div class="rthumbc">'+b+'</div><div class="recent-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span></div><div class="clear"/></li>'}}s+="</ul>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(s);$(this).parent().addClass("column");$(this).parent().addClass("column1");$(this).parent().addClass("fbig");$(this).prev("h2").html('<a href="/search/label/'+i+'">'+t+"</a>");$(this).prev("h2").css("background",o);$(this).prev("h2").wrap('<div class="box-title"></div>');$(this).prev(".box-title").css("border-color",o);$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+i+'"></a>');$(this).removeClass("widget-content").addClass("layout-content");$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$(this).find(".first-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(s.match("column2")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=5",type:"get",dataType:"jsonp",success:function(e){var n="";var s="<ul>";for(var u=0;u<e.feed.entry.length;u++){for(var a=0;a<e.feed.entry[u].link.length;a++){if(e.feed.entry[u].link[a].rel=="alternate"){n=e.feed.entry[u].link[a].href;break}}var f=e.feed.entry[u].title.$t;var l=e.feed.entry[u].author[0].name.$t;var c=e.feed.entry[u].published.$t.substring(0,10);var h=e.feed.entry[u].content.$t;var p=$("<div>").html(h);var d=p.find("img:first").attr("src");var v=e.feed.entry[u].media$thumbnail.url;if(d===undefined){var m='<a class="recent-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var m='<a class="recent-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}s+='<li><div class="rthumbc">'+m+'</div><div class="recent-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span></div><div class="clear"/></li>'}s+="</ul>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(s);$(this).parent().addClass("column");$(this).parent().addClass("column2");$(this).parent().addClass("fbig");$(this).prev("h2").html('<a href="/search/label/'+i+'">'+t+"</a>");$(this).prev("h2").css("background",o);$(this).prev("h2").wrap('<div class="box-title"></div>');$(this).prev(".box-title").css("border-color",o);$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+i+'"></a>');$(this).removeClass("widget-content").addClass("layout-content");$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(s.match("list")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=6",type:"get",dataType:"jsonp",success:function(e){var n="";var s="<ul>";for(var u=0;u<e.feed.entry.length;u++){for(var a=0;a<e.feed.entry[u].link.length;a++){if(e.feed.entry[u].link[a].rel=="alternate"){n=e.feed.entry[u].link[a].href;break}}var f=e.feed.entry[u].title.$t;var l=e.feed.entry[u].author[0].name.$t;var c=e.feed.entry[u].published.$t.substring(0,10);var h=e.feed.entry[u].content.$t;var p=$("<div>").html(h);var d=p.find("img:first").attr("src");var v=e.feed.entry[u].media$thumbnail.url;if(d===undefined){var m='<a class="recent-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var m='<a class="recent-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}s+='<li><div class="rthumbc">'+m+'</div><div class="recent-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span></div><div class="clear"/></li>'}s+="</ul>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(s);$(this).parent().addClass("list");$(this).parent().addClass("fbig");$(this).prev("h2").html('<a href="/search/label/'+i+'">'+t+"</a>");$(this).prev("h2").css("background",o);$(this).prev("h2").wrap('<div class="box-title"></div>');$(this).prev(".box-title").css("border-color",o);$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+i+'"></a>');$(this).removeClass("widget-content").addClass("layout-content");$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(s.match("gallery")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=9",type:"get",dataType:"jsonp",success:function(e){var n="";var s="<ul>";for(var u=0;u<e.feed.entry.length;u++){for(var a=0;a<e.feed.entry[u].link.length;a++){if(e.feed.entry[u].link[a].rel=="alternate"){n=e.feed.entry[u].link[a].href;break}}var f=e.feed.entry[u].title.$t;var l=e.feed.entry[u].author[0].name.$t;var c=e.feed.entry[u].published.$t.substring(0,10);var h=e.feed.entry[u].content.$t;var p=$("<div>").html(h);var d=p.find("img:first").attr("src");var v=e.feed.entry[u].media$thumbnail.url;if(d===undefined){var m='<a class="recent-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var m='<a class="recent-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}s+="<li>"+m+'<div class="recent-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span></div><div class="clear"/></li>'}s+="</ul>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(s);$(this).parent().addClass("gallery");$(this).parent().addClass("recent-block");$(this).prev("h2").html('<a href="/search/label/'+i+'">'+t+"</a>");$(this).prev("h2").css("background",o);$(this).prev("h2").wrap('<div class="box-title"></div>');$(this).prev(".box-title").css("border-color",o);$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+i+'"></a>');$(this).removeClass("widget-content").addClass("layout-content");$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(s.match("videos")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=6",type:"get",dataType:"jsonp",success:function(e){var n="";var s="<ul>";for(var u=0;u<e.feed.entry.length;u++){for(var a=0;a<e.feed.entry[u].link.length;a++){if(e.feed.entry[u].link[a].rel=="alternate"){n=e.feed.entry[u].link[a].href;break}}var f=e.feed.entry[u].title.$t;var l=e.feed.entry[u].author[0].name.$t;var c=e.feed.entry[u].media$thumbnail.url;var h=e.feed.entry[u].published.$t.substring(0,10);var p='<a class="recent-thumb" href="'+n+'" style="background:url('+c+') no-repeat center center;background-size: cover"/>';s+="<li>"+p+'<div class="recent-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+h+'</span><span class="recent-author2">'+l+'</span></div><div class="clear"/></li>'}s+="</ul>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(s);$(this).parent().addClass("videos");$(this).parent().addClass("recent-block");$(this).prev("h2").html('<a href="/search/label/'+i+'">'+t+"</a>");$(this).prev("h2").css("background",o);$(this).prev("h2").wrap('<div class="box-title"></div>');$(this).prev(".box-title").css("border-color",o);$(this).prev(".box-title").append('<a class="more-link" href="/search/label/'+i+'"></a>');$(this).removeClass("widget-content").addClass("layout-content");$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(s.match("carousel")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=9",type:"get",dataType:"jsonp",success:function(e){var n="";var s='<div class="owl-carousel carousel-items">';for(var u=0;u<e.feed.entry.length;u++){for(var a=0;a<e.feed.entry[u].link.length;a++){if(e.feed.entry[u].link[a].rel=="alternate"){n=e.feed.entry[u].link[a].href;break}}var f=e.feed.entry[u].title.$t;var l=e.feed.entry[u].author[0].name.$t;var c=e.feed.entry[u].published.$t.substring(0,10);var h=e.feed.entry[u].content.$t;var p=$("<div>").html(h);var d=p.find("img:first").attr("src");var v=e.feed.entry[u].media$thumbnail.url;if(d===undefined){var m='<a class="recent-thumb" href="'+n+'" style="background:url('+v+') no-repeat center center;background-size: cover"/>'}else{var m='<a class="recent-thumb" href="'+n+'" style="background:url('+d+') no-repeat center center;background-size: cover"/>'}s+="<li>"+m+'<div class="recent-content"><h3 class="recent-title"><a href="'+n+'">'+f+'</a></h3><span class="recent-date">'+c+'</span><span class="recent-author2">'+l+'</span></div><div class="clear"/></li>'}s+="</div>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(s);$(this).parent().addClass("carousel");$(this).parent().addClass("recent-block");$(this).prev("h2").html('<a href="/search/label/'+i+'">'+t+"</a>");$(this).prev("h2").css("background",o);$(this).prev("h2").wrap('<div class="box-title"></div>');$(this).prev(".box-title").css("border-color",o);$(this).removeClass("widget-content").addClass("layout-content");$(".carousel-items").owlCarousel({items:3,navigation:true,navigationText:["",""],itemsDesktop:[1e3,3],itemsDesktopSmall:[647,1],itemsTablet:[396,1],itemsMobile:false,pagination:false});var n=$(this).find(".owl-controls");$(this).prev(".box-title").append(n);$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}if(s.match("slider")){$.ajax({url:"/feeds/posts/default/-/"+i+"?alt=json-in-script&max-results=8",type:"get",dataType:"jsonp",success:function(e){var t="";var n='<div class="slider-items owl-carousel">';for(var i=0;i<e.feed.entry.length;i++){for(var s=0;s<e.feed.entry[i].link.length;s++){if(e.feed.entry[i].link[s].rel=="alternate"){t=e.feed.entry[i].link[s].href;break}}var u=e.feed.entry[i].title.$t;var a=e.feed.entry[i].author[0].name.$t;var f=e.feed.entry[i].published.$t.substring(0,10);var l=e.feed.entry[i].content.$t;var c=$("<div>").html(l);var h=c.find("img:first").attr("src");var p=e.feed.entry[i].media$thumbnail.url;var d=/<\S[^>]*>/g;var v=l.replace(d,"");if(v.length>150){v=""+v.substring(0,150)+"..."}if(h===undefined){var m='<a class="recent-thumb" href="'+t+'" style="background:url('+p+') no-repeat center center;background-size: cover"/>'}else{var m='<a class="recent-thumb" href="'+t+'" style="background:url('+h+') no-repeat center center;background-size: cover"/>'}n+="<li>"+m+'<div class="recent-content"><h3 class="recent-title"><a href="'+t+'">'+u+'</a></h3><span class="recent-date">'+f+'</span><span class="recent-author2">'+a+'</span><p class="recent-des">'+v+'<p></div><div class="clear"/></li>'}n+="</div>";$(".recent-layout .widget-content").each(function(){var e=$(this).text();if(e==r){$(this).html(n);$(this).parent().addClass("carousel");$(this).parent().addClass("slider");$(this).parent().addClass("recent-block");$(this).prev("h2").remove();$(this).prev("h2").css("background",o);$(this).removeClass("widget-content").addClass("layout-content");$(".slider-items").owlCarousel({items:1,navigation:true,navigationText:["",""],itemsDesktop:[1e3,1],itemsDesktopSmall:[647,1],itemsTablet:[396,1],autoPlay:true,autoPlay:5e3,itemsMobile:false,pagination:true});$(this).find(".recent-thumb").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})}})}});
$("#related-posts").each(function(){var e=$(this).html();$.ajax({url:"/feeds/posts/default/-/"+e+"?alt=json-in-script&max-results=9",type:"get",dataType:"jsonp",success:function(e){var t="";var n='<div class="rnav owl-carousel">';for(var r=0;r<e.feed.entry.length;r++){for(var i=0;i<e.feed.entry[r].link.length;i++){if(e.feed.entry[r].link[i].rel=="alternate"){t=e.feed.entry[r].link[i].href;break}}var s=e.feed.entry[r].title.$t;var o=e.feed.entry[r].content.$t;var u=$("<div>").html(o);var a=u.find("img:first").attr("src");var f=e.feed.entry[r].media$thumbnail.url;if(a===undefined){var l='<a class="rnav-img" href="'+t+'" style="background:url('+f+') no-repeat center center;background-size:cover"/>'}else{var l='<a class="rnav-img" href="'+t+'" style="background:url('+a+') no-repeat center center;background-size:cover"/>'}n+="<li>"+l+'<div class="rnav-conent"><h3 class="rnav-title"><a href="'+t+'">'+s+"</a></h3></div></li>"}n+='</div><div class="clear"/>';$("#related-posts").html(n);$(".rnav.owl-carousel").owlCarousel({items:3,navigation:true,navigationText:["",""],itemsDesktop:[1e3,3],itemsDesktopSmall:[647,1],itemsTablet:[396,1],itemsMobile:false,pagination:false});$(".rnav-img").each(function(){$(this).attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})}})});$(document).ready(function(){$("#sidebar-wrapper .widget h2").wrap("<div class='widget-title'/>");$("#footer-wrapper .widget h2").wrap("<div class='widget-title'/>");$("ul#sub-menu").parent("li").addClass("hasSub");$(".index .post-outer").each(function(){$(this).find(".post-thumb a").attr("style",function(e,t){return t.replace("/default.jpg","/mqdefault.jpg")}).attr("style",function(e,t){return t.replace("s72-c","s1600")})});$(".share-container").each(function(){var e=$(this);e.find(".post-sharebtn").click(function(){e.find(".post-share").fadeToggle("slow")});$(document).bind("click",function(e){if($(e.target).parents(".share-container").length===0){$(".post-share").fadeOut(300)}})});$(document).ready(function(e){e("abbr.timeago").timeago()});$("#header-search .search-icon").click(function(){var e=$("#header-search input");if(e.is(":hidden")){e.fadeIn(300);$(this).removeClass("icon-search");$(this).addClass("icon-cancel");$("#menu").hide()}else{e.fadeOut(300);$(this).removeClass("icon-cancel");$(this).addClass("icon-search");$("#menu").show()}return false});$(document).bind("click",function(e){if($(e.target).parents("#header-search").length===0){$("#header-search input").fadeOut(300);$("#header-search .search-icn").removeClass("icon-cancel");$("#header-search .search-icn").addClass("icon-search");$("#menu").show()}});$(".menu li").each(function(){$(this).hoverTimeout(0,function(){$(this).children("ul").slideDown()},0,function(){$(this).children("ul").hide()})});$(function(){$(".upbt").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);e=e.length?e:$("[name="+this.hash.slice(1)+"]");if(e.length){$("html,body").animate({scrollTop:e.offset().top},1e3);return false}}})});$(".widget-content").each(function(){var e=$(this).text();if(e.substr(0,10).match("fbbox")){e=e.replace("fbbox/","");$(this).html('<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//www.facebook.com/plugins/likebox.php?href='+e+'&width=340px&height=258&colorscheme=light&show_faces=true&header=false&stream=false&show_border=false&appId=492409184153294" style="border:none; overflow:hidden; width:100%; height:230px;"></iframe>')}});$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)});var e="[";var t="]";$(".menu li *").replaceText(e,'<span class="msubtitle">');$(".menu li *").replaceText(t,"</span>");$(".menu #nav").show();$(".social-counter").each(function(){var e=$(this);var t=$(this).find(".social-item");if(t.length===0){e.remove()}$(this).find(".widget").removeClass("LinkList");$(".social-counter .social-item.facebook").find(".item-text").text("Likes");$(".social-counter .social-item.rss,.social-counter .social-item.youtube").find(".item-text").text("Subscribes");var n="[";var r="]";$(".social-counter *").replaceText(n,'<span class="item-count">');$(".social-counter *").replaceText(r,"</span>");$(".social-item").each(function(){var e=$(this).find(".remove-count");var t=$(this).find(".item-count");$(e).before($(t));$(e).remove()})});$(".contact-button a").click(function(){var e=$(".contact-sec");if(e.is(":hidden")){e.fadeIn(300);e.addClass("contact-show");$("#outer-wrapper").addClass("pop_contact ")}return false});$(document).bind("click",function(e){if($(e.target).parents(".contact-sec").length===0){$(".contact-sec").fadeOut(300);$("#outer-wrapper").removeClass("pop_contact ");$(".contact-sec").removeClass("contact-show")}});$(".contact-close").click(function(){$(".contact-sec").fadeOut(300);$("#outer-wrapper").removeClass("pop_contact ");$(".contact-sec").removeClass("contact-show");return false});var n=$("#sidetabs #tabside1 .widget h2").text();$(".menu-tab .item-1 a").text(n);var r=$("#sidetabs #tabside2 .widget h2").text();$(".menu-tab .item-2 a").text(r);var i=$("#sidetabs #tabside3 .widget h2").text();$(".menu-tab .item-3 a").text(i);$("#tabside1 .widget h2,#tabside2 .widget h2,#tabside3 .widget h2,#tabside1 .widget-title,#tabside2 .widget-title,#tabside3 .widget-title").remove();$(".sidetabs").tabslet({mouseevent:"click",attribute:"href",animation:true});if($(".sidetabs .widget").length===0){$(".sidetabs").remove()}if($(".home .post-outer").length===0){$(".home #main-wrapper #main").remove();$(".posts-title").remove()}if($("#footer .widget").length===0){$("#footer").remove();$("#footer-wrapper").css("padding-bottom","0");$(".bottom-nav").css("margin-bottom","0");$(".bottom-nav").css("border-bottom","0")}if($("#ticker .widget").length===0){$("#ticker").remove()}var s="[full_width]";var o="[left_sidebar]";var u="[right_sidebar]";$(".post *").replaceText(s,"<style>.item #main-wrapper{width:100% !important;float:none!important;border-right:0!important;border-left:0!important}.item #sidebar-wrapper{display:none;}.item #main-wrapper #main{margin-left:0!important;margin-right:0!important}</style>");$(".post-body *").replaceText(o,"<style>@media screen and (min-width: 1000px){.item #main-wrapper{float:right!important;border-left:1px solid #EEE!important;border-right:0!important}.item #sidebar-wrapper{float:left!important;padding-left:0!important;padding-right:2%!important;border-right:1px solid #EEE!important;border-left:0!important;left:1px!important}.item #main-wrapper #main{margin-left:2.85%!important;margin-right:0!important}}</style>");$(".post-body *").replaceText(u,"<style>@media screen and (min-width: 1000px){.item #main-wrapper{float:left!important;border-right:1px solid #EEE!important;border-left:0!important}.item #sidebar-wrapper{float:right!important;padding-right:0!important;padding-left:2%!important;border-left:1px solid #EEE!important;left:-1px!important;border-right:0!important}.item #main-wrapper #main{margin-right:2.85%!important;margin-left:0!important}}</style>");(function(e){var t=e("a.newer-link");var n=e("a.older-link");e.get(t.attr("href"),function(n){t.html('<strong>Next <i class="fa fa-angle-double-right"></i></strong> <span>'+e(n).find(".post h1.post-title").text()+"</span>")},"html");e.get(n.attr("href"),function(t){n.html('<strong><i class="fa fa-angle-double-left"></i> Previous</strong> <span>'+e(t).find(".post h1.post-title").text()+"</span>")},"html")})(jQuery)});$(window).bind("load",function(){$(".intro-loader").remove();$("p.trans").each(function(){var e=$(this).text();var t=$(this).attr("data-tran");$("#pages-wrapper *").replaceText(e,t)})});
$(document).ready(function(){var e="[post_ad]";var t=$(".item .ad-inside");$(".item .post *").replaceText(e,'<div class="ad-inside-to"/>');$(".ad-inside-to").append(t);var n=$(".post-body .ad-inside").width();$(".post-body .ad-inside-to").width(n)});
$(document).ready(function(){$(".comments-tabs").simpleTab({active:1,fx:"fade",showSpeed:400,hideSpeed:400});$('.tab-blogger').append( $('#comments') );$(".comments-tabs.simpleTab .tab-wrapper").wrap("<div class='comments-tabs-header'/>");$('.comments-tabs-header')});


window.selectnav=function(){"use strict";var e=function(e,t){function c(e){var t;if(!e)e=window.event;if(e.target)t=e.target;else if(e.srcElement)t=e.srcElement;if(t.nodeType===3)t=t.parentNode;if(t.value)window.location.href=t.value}function h(e){var t=e.nodeName.toLowerCase();return t==="ul"||t==="ol"}function p(e){for(var t=1;document.getElementById("selectnav"+t);t++);return e?"selectnav"+t:"selectnav"+(t-1)}function d(e){a++;var t=e.children.length,n="",l="",c=a-1;if(!t){return}if(c){while(c--){l+=o}l+=" "}for(var v=0;v<t;v++){var m=e.children[v].children[0];if(typeof m!=="undefined"){var g=m.innerText||m.textContent;var y="";if(r){y=m.className.search(r)!==-1||m.parentNode.className.search(r)!==-1?f:""}if(i&&!y){y=m.href===document.URL?f:""}n+='<option value="'+m.href+'" '+y+">"+l+g+"</option>";if(s){var b=e.children[v].children[1];if(b&&h(b)){n+=d(b)}}}}if(a===1&&u){n='<option value="">'+u+"</option>"+n}if(a===1){n='<select class="selectnav" id="'+p(true)+'">'+n+"</select>"}a--;return n}e=document.getElementById(e);if(!e){return}if(!h(e)){return}if(!("insertAdjacentHTML"in window.document.documentElement)){return}document.documentElement.className+=" js";var n=t||{},r=n.activeclass||"active",i=typeof n.autoselect==="boolean"?n.autoselect:true,s=typeof n.nested==="boolean"?n.nested:true,o=n.indent||"?",u=n.label||"- «·ﬁ«∆„… -",a=0,f=" selected ";e.insertAdjacentHTML("afterend",d(e));var l=document.getElementById(p());if(l.addEventListener){l.addEventListener("change",c)}if(l.attachEvent){l.attachEvent("onchange",c)}return l};return function(t,n){e(t,n)}}();$(document).ready(function(){selectnav('nav1');selectnav('nav');});


$(document).ready(function(){

$(".search-button").click(function(){
$(".search-wrap").slideToggle();
return false;
});


$(".sidebar h2, .footer-wrapper h2").wrap("<div class='widget-title'></div>");

$(".post").each(function(){
var e = $(this);
e.find(".post-meta").appendTo( e.find(".post-info") );

});


$(".follow-by-email-address").attr("placeholder", "»—Ìœﬂ «·√·ﬂ —Ê‰Ì");
$(".follow-by-email-submit").attr("value", "√‘ —«ﬂ");


  if ( $("body").attr("class") == "archive" ){
$("body").addClass("index");
	}


});