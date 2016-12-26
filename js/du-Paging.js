//数据源
var conArr;

getAllData();
function getAllData(){
    $.getScript("js/data/newsData.js",function(){
        conArr = newsData;
        initDuPaging();//加载完数据后开始执行
    })
}



var p_dNum = 3;  //每页显示5条数据
var p_now = 1;  //当前第几页
var p_pNum = 5; //显示几个页码(只能是基数)

var total;   //新闻总个数
var p_pTotal;//总共多少页

var $upBtn = $('#du-UpBtn');
var $downBtn = $('#du-DownBtn');
var $pNumBox = $('#du-numBox');
var $dataBox = $('#du-NewsUl');

//入口
function initDuPaging(){
    total = conArr.length;            //得到新闻总个数
    p_pTotal = Math.ceil(total/p_dNum);//得到总共多少页
    refDuPaging();
}

function refDuPaging(){
    arrInit(); //数据初始化
    pageInit();//页码初始化
}


function arrInit(){
    //根据当前页，找到新闻数组的下标范围
    var s = (p_now-1)*p_dNum;
    var n = p_now*p_dNum-1;
    n = n>total-1?total-1:n;
    applyDom(s,n);//根据起始和结束的下标渲染dom
}

//DOM数据渲染
function applyDom(start,end){
    $dataBox.html('');
    for(var i=start;i<=end;i++){
        var str = getDataDOM(conArr[i]);
        $dataBox.append(str);
    }
}
function getDataDOM(obj){
    return "<li>" +
                "<span>"+ obj.essence +" </span>" +
                "<span>"+obj.media+"</span>" +
                "<span>"+obj.title+"</span>" +
                "<span>"+ obj.time +"</span>" +
            "</li>";
}



function pageInit(){
    //上下页按钮初始化
    upDownEv();
    //清空页码
    $pNumBox.html('');

    var dif = Math.floor(p_pNum/2);

    var s = p_now-dif;
    var n = p_now+dif;

    if(p_pTotal<p_pNum){
        s = 1;
        n = p_pTotal;
    }else{
        if(s<1){
            s = 1;
            n = p_pNum;
        }
        if(n>p_pTotal){
            s = p_pTotal-p_pNum+1;
            n = p_pTotal;
        }
    }
    getPageDom(s,n);
}
//DOM页码渲染
function getPageDom(s,n){
    for(var i=s;i<=n;i++){
        var $li = $('<li>');
        $li.html(i);
        if(i == p_now){
            $li.addClass('pageNow');
        }else{
            $li.addClass('able');
        }
        (function(index){
            $li.click(function(){
                p_now = index;
                refDuPaging()//渲染
            })
        })(i);
        $pNumBox.append($li);
    }
}

//上一页下一页初始化
function upDownEv(){
    $upBtn.off('click');
    $downBtn.off('click');
    if(p_pTotal == 0){
    	//没有数据
    	$upBtn.attr('class','disable');
    	$downBtn.attr('class','disable');
    }else{            
    	//有数据
    	if(p_now==1){
            $upBtn.attr('class','disable');
        }else{
            $upBtn.attr('class','able');
            $upBtn.click(pageUpFn);
        }
        if(p_now==p_pTotal){
            $downBtn.attr('class','disable');
        }else{
            $downBtn.attr('class','able');
            $downBtn.click(pageDownFn);
        }
    }
}

//上一页
function pageUpFn(){
    p_now--;
    if(p_now<1){
        p_now = 1;
    }
    refDuPaging()//渲染
}
//下一页
function pageDownFn(){
    p_now++;
    if(p_now>p_pTotal){
        p_now = p_pTotal;
    }
    refDuPaging()//渲染
}
