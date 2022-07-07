

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

function FillProjectPage() {
    var details = GetJSONFile("projects.json");
    var projectName = new URLSearchParams(window.location.search).get("id");
    var projectInfo = GetSpecificProject(projectName, details);
    document.getElementById("Project Title").innerText = projectInfo["title"];
    document.getElementById("Project Tag").innerText = projectInfo["tag"];
    document.getElementById("Project Tag").classList = `uppercase tracking-wide text-sm text-${GetTagColour(projectInfo["tag"])} font-semibold`;
    document.getElementById("Project Brief").innerText = projectInfo["desc"];
    var x = document.getElementById("Project Description");
    var txtFileInfo = $.get(`Projects/${projectName}.txt`, function (data) {
        x.write(data);
    });
    console.log(projectName);
}
