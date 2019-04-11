console.log("started");
window.status = 0;
window.counter = 0;
window.code = null;
window.limCounter = 100;
window.limPosts = 50;

downloadJSON = (fileContent) => {
    const filename = "facebook_group.json";
    const file = new Blob([fileContent], {type: 'text/plain'});
    var a = document.createElement('a');
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);  
}

window.code = setInterval(function(){
    if (window.status == 1) {
        console.log("busy");
        return;
    }
    window.status = 1;
    const posts = document.querySelectorAll('[id^="mall_post"]');
    console.log("counter: "+window.counter);
    window.scrollTo(0,document.body.scrollHeight);
    console.log("posts: "+posts.length);
    window.status = 0;
    window.counter++;
    if (posts.length >= window.limPosts) {
    //if (window.counter >= window.limCounter) {
        clearInterval(window.code);
        // scrolling is over
        var analysis = [];
        var contents = "";
        for(let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const a = post.getElementsByTagName("a");
            const user = post.getElementsByTagName("a")[2].textContent;
            const datetime = post.getElementsByTagName("abbr")[0].getAttribute("title");
            const content = post.getElementsByClassName("userContent")[0].textContent;
            analysis.push({
                user: user,
                content: content,
                datetime: datetime
            });
        }
        downloadJSON(JSON.stringify(analysis));
        console.log("end");
    }
},200);
console.log("after");