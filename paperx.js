console.log("started");
window.status = 0;
window.counter = 0;
window.code = null;
window.limCounter = 10;
//window.positive = ["sim","bom","boa","bem","fácil","facil","legal"];

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
        return;
    }
    window.status = 1;
    const posts = document.querySelectorAll('[id^="mall_post"]');
    console.log("counter: "+window.counter);
    window.scrollTo(0,document.body.scrollHeight);
    console.log("posts: "+posts.length);
    window.status = 0;
    window.counter++;
    if (window.counter == 10) {
        clearInterval(window.code);
        // it's over
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
            console.log(datetime);
            contents = contents.concat(content);
        }
        const words = contents.split(" ");
        var dict = {};
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if(word in dict) {
                dict[word]++;
            }
            else {
                dict[word] = 1;
            }
        }
        var dict2 = [];
        for(let word in dict) {
            dict2.push({
                word: word,
                amount: dict[word]
            })
        }
        dict2.sort((a,b) => {
           return b.amount - a.amount;
        });
        downloadJSON(JSON.stringify(analysis));
        //console.log(dict2.slice(0,10)); // it works until here

        /*const positive = ["action","sim","bom","boa","bem","fácil","facil","legal"];
        for (let post in analysis) {
            for (let pos in positive) {
                if (post.content.includes(pos)) {
                    console.log(post.content);
                    break;
                }
            }
        }*/
        console.log("end");
    }
},200);
console.log("after");