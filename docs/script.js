

function GetJSONFile(url) {
    var json = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': url,
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })(); 
    return json;
}

function GetTagColour(tagName) {
    var c = "gray-600";
    var jsonFile = GetJSONFile("tagColours.json");
    jsonFile.forEach(element => {
        if(element["name"] == tagName) {
            c = element["colour"];
        }
    });
    return c;
}

function LoadNavbar() {
    var txtFileInfo = $.get(`nav.txt`, function (data) {
        document.getElementById("nav-placeholder").innerHTML = data;
    });
}

function MakeProjects() {
    var details = GetJSONFile("projects.json"); 
    details.forEach(e => {
        var div = document.createElement('div');
        div.classList = "max-w-md mx-auto bg-gray-900 rounded-xl shadow-xl overflow-hidden md:max-w-2x1 m-4";
        var div2 = document.createElement('div');
        div2.classList = "md:flex";
        div.appendChild(div2);
        var div3 = document.createElement("div");
        div3.classList = "p-8";
        div2.appendChild(div3);
        var h1 = document.createElement("h1");
        h1.classList = "h-12 text-3xl text-gray-300 font-semibold";
        h1.id = "projName";
        h1.innerText = `${e["title"]}`;
        div3.appendChild(h1);
        var div4 = document.createElement("div");
        c = GetTagColour(`${e["tag"]}`);
        div4.classList = `uppercase tracking-wide text-sm text-${c} font-semibold`;
        div4.id = "projTag";
        div4.innerText = `${e["tag"]}`;
        div3.appendChild(div4);
        var p = document.createElement("p");
        p.classList = "mt-2 text-gray-400";
        p.id = "projDesc";
        p.innerText = `${e["desc"]}`;
        div3.appendChild(p);
        var div5 = document.createElement("div");
        div5.classList = "flex items-center";
        div3.appendChild(div5);
        var button = document.createElement("button");
        button.classList = "mt-5 text-center flex-auto shadow-md max-w-md mx-auto h-8 hover:bg-slate-700 active:bg-slate-900 focus:outline-none bg-slate-800 text-white rounded-xl px-3 w-60";
        button.innerText = "View more";
        button.onclick = function() {
            location.href = `projectPage.html?id=${e["projID"]}`;
        };
        div5.appendChild(button);
        document.getElementById("projGrid").appendChild(div);
    });
}

function GetSpecificProject(projectID, projectsJSON) {
    var x;
    projectsJSON.forEach(e => {
        if(e["projID"] == projectID) {
            x = e;
        }
    });
    return x;
}

function FindReplaceEnd(highSyntax,file) {
    var endPoint = false;
    var c = file.indexOf(highSyntax);
    while(!endPoint) {
        if(file[c] == "}") {
            endPoint = true;
        }
        else {
            c++;
        }
    }
    return c;
}

function StringReplaceSyntax(highSyntax, file, replaceStart, replaceEnd) {
    var start = file.indexOf(highSyntax);
    while(start != -1) {
        var c = FindReplaceEnd(highSyntax, file);
        file = file.substring(0,c) + "" + file.substring(c+1);
        file = file.slice(0, c) + replaceEnd + file.slice(c);

        file = file.replace(highSyntax, replaceStart);
        start = file.indexOf(highSyntax);
    }
    return file;
}

function ButtonCreationFromSyntax(file) {
    var start = file.indexOf("§BTN{");
    while(start != -1) {
        var c = FindReplaceEnd("§BTN{", file);
        file = file.substring(0,c) + "" + file.substring(c+1);
        file = file.slice(0, c) + "</button>" + file.slice(c);
        var content = file.substring(start+5, c);
        var splitArray = content.split(",");
        var url = splitArray[0];
        var text = splitArray[1];
        file = file.substring(0,start+5) + "" + file.substring(start+5+url.length+1);
        file = file.replace("§BTN{", `<button class='mt-5 text-center flex-auto shadow-md max-w-md mx-auto h-8 hover:bg-slate-700
         active:bg-slate-900 focus:outline-none bg-slate-800 text-white rounded-xl px-3 w-60' onclick="window.location.href='${splitArray[0]}';">`);
        start = file.indexOf("§BTN{");
    }
    return file;
}

function ImageCreationFromSyntax(file) {
    var start = file.indexOf("§IMG{");
    while(start != -1) {
        var c = FindReplaceEnd("§IMG{", file);
        file = file.substring(0,c) + "" + file.substring(c+1);
        var content = file.substring(start+5, c);
        var splitArray = content.split(",");
        var loc = splitArray[0];
        var leng = splitArray[1];
        var wid = splitArray[2];
        file = file.substring(0,start) + `<img class='max-w-full h-auto rounded-lg inline-flex p-4' src="${loc}" length=${leng} width=${wid}>` + file.substring(c);
        start = file.indexOf("§IMG{");
    }
    return file;
}

function ProcessProjectDescription(file) {
    file = file.replaceAll("\\n","</br></br>");
    file = StringReplaceSyntax("§ST{", file, `<p class="text-lg text-gray-300">`, "</p>");
    file = ImageCreationFromSyntax(file);
    file = ButtonCreationFromSyntax(file);
    return file;
}

function FillProjectPage() {
    var details = GetJSONFile("projects.json");
    var projectName = new URLSearchParams(window.location.search).get("id");
    var projectInfo = GetSpecificProject(projectName, details);
    document.getElementById("Project Title").innerText = projectInfo["title"];
    document.getElementById("Project Tag").innerText = projectInfo["tag"];
    document.getElementById("Project Tag").classList = `uppercase tracking-wide text-sm text-${GetTagColour(projectInfo["tag"])} font-semibold`;
    var x = document.getElementById("Project Description");
    var txtFileInfo = $.get(`Projects/${projectName}.txt`, function (data) {
        document.getElementById("Project Description").innerHTML = ProcessProjectDescription(data);
    });
}
