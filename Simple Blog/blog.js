var postLocation = 0; 
var postObj = [];
var postString;
function addBlog(){
    var title = document.getElementById("title").value;
    var article = document.getElementById("desc").value;
    var image = document.getElementById("image").files[0].name;
    
    var obj = {};
    obj.title = document.getElementById("titleInfo"+String(postLocation)).innerHTML=title;
    obj.article = document.getElementById("articleInfo"+String(postLocation)).innerHTML=article;
    obj.image = document.getElementById("imageInfo"+String(postLocation)).src=image;
    postLocation = (postLocation + 1)%4
    postObj.push(obj);
    postString = JSON.stringify(postObj);
    storeInSession()
    resetFields();
}
function storeInSession() {
    sessionStorage.setItem("postInfo",postString);
}

function resetFields(){
    document.getElementById("title").value="";
    document.getElementById("desc").value="";
    document.getElementById("image").value="";
}