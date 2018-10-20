function initCourseList() {
    var courseArr = [];
    var coursesList;
    coursesList = document.getElementsByClassName('vr-courses-list')[0];
    coursesList.addEventListener('click', tabCourse);
    ajax({
        method: 'get',
        url: './course.json',
        success: function (data) {
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                courseArr.push(data[i].title);
            }
            var str = '';
            courseArr.forEach(function (title, idx) {
                if (idx == 0) {
                    str += ` <li class="ui-on">
                    <a href="###" class="vr-courses-item">${title}</a>
                </li>`;
                } else {
                    str += ` <li>
                    <a href="###"  class="vr-courses-item">${title}</a>
                </li>`;
                }
            });
            coursesList.innerHTML = str;
        }
    });
}

function tabCourse(e) {
    e = e || window.event;
    var coursesList = document.getElementsByClassName('vr-courses-list')[0];
    var courses = coursesList.getElementsByTagName('li');
    [].forEach.call(courses, function (li,idx) {
        if (li.contains(e.target)) {
            li.setAttribute('class', 'ui-on');
            loadCourses(idx*8);
        } else {
            li.setAttribute('class', '');
        }
    });
}
//分页
function pageGenerate(nowPage = 1) {
    var pageNum = 5,
        // nowPage = 1,
        oPager;
    var i = 1;
    var a;
    oPager = document.getElementsByClassName('vr-page')[0];
    oPager.innerHTML = '';
    if (nowPage <= 3) {
        for (i; i <= pageNum; i++) {
            a = document.createElement('a');
            a.textContent = i;
            a.setAttribute('class', 'vr-page__item');
            if (i == nowPage) {
                a.id = "page-on";
            }
            oPager.appendChild(a);
        }
    } else {
        var p = nowPage - 2;
        for (i; i <= pageNum; p++, i++) {
            a = document.createElement('a');
            a.textContent = p;
            a.setAttribute('class', 'vr-page__item');
            if (p == nowPage) {
                a.id = "page-on";
            }
            oPager.appendChild(a);
        }
    }
    loadCourses((nowPage-1)*8);
}

function openAdd() {
    var addBox = document.getElementById("add-box");
    addBox.style.display = "block";
}

function closeAdd() {
    var addBox = document.getElementById("add-box");
    addBox.style.display = "none";
    console.log(addBox.innerHTML);
}


function openAuthorslist() {
    var authorslist = document.getElementById("classmember");
    authorslist.style.opacity = "1";
}

function closeAuthorslist() {
    //关闭作者列表，更新当前作者
    var authorslistBox, authorslist, selected, li, names;
    authorslistBox = document.getElementById("classmember");
    authorslist = document.getElementsByClassName('authors-list')[0];
    selected = authorslistBox.getElementsByClassName('selected')[0];
    authorslistBox.style.opacity = "0";
    names = [].map.call(selected.options, function (option) {
        return option.text;
    });
    authorslist.innerHTML = '';
    names.forEach(function (name) {
        var str;
        str = `<li class="authors-list__item">
                <span class="author__name">
                    ${name}
                </span>
                <a src="" alt="" class="author-delete__btn" onclick="deleteAuthor(items)"></a>
            </li>`;
        authorslist.innerHTML += str;
    });
}

function deleteAuthor(obj) {
    var authorsList = document.getElementsByClassName('authors-list')[0];
    var author = authorsList.getElementsByClassName('authors-list__item');
    for (var i = 0; i < author.length; i++) {
        if (author[i].contains(obj)) {
            authorsList.removeChild(author[i]);
            break;
        }
    }
}

function uploadImage() {
    uploadFile.onchange = function () {
        var uploadFile = document.getElementById('uploadFile');
        var uploadInput = document.getElementById('uploadInput');
        var str = uploadFile.value;
        var reg = /\.jpg|\.gif|\.png/;
        str = str.split('\\').pop();
        console.log(str);
        if (reg.test(str)) {
            uploadInput.value = str;
            uploadInput.style.color = '#666';
        } else {
            uploadInput.style.color = 'red';
            uploadInput.value = '请上传图片';
        }
    }
}

function loadCourses(startIndex=0) {
    ajax({
        method: 'get',
        url: './works.json',
        success: function (data) {
            var str = '';
            var cardList = document.getElementsByClassName('vr-card-list')[0];
            var dataArr = JSON.parse(data); 
            for(var index = startIndex;index < startIndex+8;index++){
                var work = dataArr[index];
                str += ` 
                    <li>
                        <div class="vr-card-item">
                            <div class="vr-card-box">
                                <div class="vr-card-item__db">
                                    <img src=${work['pic']} alt="">
                                    <div class="vr-card-item__info">
                                        <div class="vr-card-item__name">${work['author']}</div>
                                        <div class="vr-card-item__date">2016/06/04 10:55</div>
                                    </div>
                                </div>
                                <div class="vr-card-item__btns">
                                    <button class="vr-btn vr-card-btn">
                                        <i class="vr-icon vr-icon-edit"></i>
                                        <span class="vr-btn__txt">编辑</span>
                                    </button>
                                    <button class="vr-btn vr-card-btn">
                                        <i class="vr-icon vr-icon-play"></i>
                                        <span class="vr-btn__txt">播放</span>
                                    </button>
                                    <button class="vr-btn vr-card-btn">
                                        <i class="vr-icon vr-icon-delete"></i>
                                        <span class="vr-btn__txt">删除</span>
                                    </button>
                                </div>
                            </div>
                            <p class="vr-card-item__ft">${work['title']}</p>
                        </div>
                    </li>`;
            }
            cardList.innerHTML = str;
        }
    });
}
//初始化作者列表
function createAuthorList() {
    var selectable, option, names;
    selectable = document.getElementsByClassName('selectable')[0];
    names = ['杨玉环', '张三丰', '赵飞燕', '诸葛孔明', '唐明皇', '赵云', '林黛玉', '南宫雪', '周公瑾', '鱼玄机', '房玄龄'];
    names.forEach(function (val, idx) {
        option = document.createElement('option');
        option.textContent = val;
        option.className += 'names-list__item';
        selectable.appendChild(option);
    });
}

function editAuthorList(opt) {
    var originList, targetList, option;
    if (opt === 1) {
        originList = document.getElementsByClassName('selectable')[0];
        targetList = document.getElementsByClassName('selected')[0];
    } else if (opt == 0) {
        targetList = document.getElementsByClassName('selectable')[0];
        originList = document.getElementsByClassName('selected')[0];
    }
    for (var i = 0; i < originList.options.length; i++) {
        if (originList.options[i].selected) {
            console.log(i, 'selected');
            option = new Option(originList.options[i].textContent);
            option.setAttribute('class', 'names-list__item');
            targetList.appendChild(option);
            //select 移除任意option
            //select 添加一个option
            //selectObj.remove(optionIndex)
            //selectObj.add(optionObj)
            originList.remove(i);
            //移除一个选项之后，下标需要停留在当前位置
            i--;
        }
    }
}

function ajax(opt) {
    var opt;
    var xhr = null;
    var param = [];
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'GET';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    for (var key in opt.data) {
        param.push(`${key} = ${opt.data[key]}`);
    }
    var postData = param.join('&');
    if (opt.method.toUpperCase() == 'POST') {
        xhr.open(opt.method, opt.url, opt.async);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(postData);
    } else if (opt.method.toUpperCase() == 'GET') {
        opt.url = (postData == [] ? opt.url : opt.url + '?' + postData);
        xhr.open(opt.method, opt.url);
        xhr.send(null);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            opt.success(xhr.responseText);
        }
    }
}
window.onload = function () {
    //初始化分页组件、作者列表、作品列表、上传图片组件
    initCourseList();
    loadCourses()
    pageGenerate();
    createAuthorList();
    uploadImage();
    var oPager = document.getElementsByClassName('vr-page')[0];
    oPager.addEventListener('click', function (e) {
        var items = this.getElementsByTagName('a');
        var clickPage = parseInt(e.target.textContent);
        console.dir(this);
        console.dir(items);
        console.dir('click page ' + clickPage);
        for (var i = 0; i < items.length; i++) {
            items[i].setAttribute('id', '');
        }
        e.target.setAttribute('id', 'page-on');
        pageGenerate(clickPage);
    });
}