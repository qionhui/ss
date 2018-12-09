function my$(e){
    if(document.getElementById(e) != null)
        return document.getElementById(e);
    else if(document.getElementsByName(e) != null)
        return document.getElementsByName(e);
    else if(document.getElementsByClassName(e).length != 0)
        return document.getElementsByClassName(e);
}
function exist(e){
    if(e)return e;
    else return false;
}