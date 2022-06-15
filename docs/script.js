function MakeProjects() {
    for(let i = 0; i<10; ++i) {
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
        h1.innerText = "Hello, World!!!!";
        div3.appendChild(h1);
        var div4 = document.createElement("div");
        div4.classList = "uppercase tracking-wide text-sm text-amber-600 font-semibold";
        div4.id = "projTag";
        div4.innerText = "MOD";
        div3.appendChild(div4);
        var p = document.createElement("p");
        p.classList = "mt-2 text-gray-400";
        p.id = "projDesc";
        p.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate quia itaque, iste perferendis quasi molestias exercitationem omnis. Accusantium voluptatibus repellendus, itaque delectus sequi quae et, voluptates blanditiis doloremque consectetur qui?";
        div3.appendChild(p);
        var div5 = document.createElement("div");
        div5.classList = "flex items-center";
        div3.appendChild(div5);
        var button = document.createElement("button");
        button.classList = "mt-5 text-center flex-auto shadow-md max-w-md mx-auto h-8 hover:bg-slate-700 active:bg-slate-900 focus:outline-none bg-slate-800 text-white rounded-xl px-3 w-60";
        button.innerText = "View more";
        div5.appendChild(button);

        document.getElementById("projGrid").appendChild(div);
    }
}