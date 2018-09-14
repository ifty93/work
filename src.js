let pf = function(str){
    console.log(str);
}

let places = [];
let fillTableNew = function()
{
    let body = $("#id-table-body");
    body.html("");
    for(let i=0; i<places.length; i++)
    {
        let tr = $("<tr></tr>");

        let td_name = $("<td>"+places[i].Name+"</td>");
        td_name.addClass("class-name");
        tr.append(td_name);

        let td_address = $("<td>"+places[i].Address+"</td>");
        td_address.addClass("class-address");
        tr.append(td_address);

        let td_rating = $("<td>"+places[i].Rating+"</td>");
        td_rating.addClass("class-rating");
        tr.append(td_rating);

        let td_pic = $("<td></td>");
        td_pic.html(`<img class="img" src="${places[i].Picture}" alt="No Image :(">`);
        td_pic.addClass("class-picture");
        tr.append(td_pic);

        let td_btn = $("<td></td>");
        let div_btn = $("<div></div>");

        let bt1 = $("<button type=\"button\">Update</button>");
        bt1.addClass("blu");
        bt1.addClass("action-update");
        bt1.attr("id", i);
        div_btn.append(bt1);

        let bt2 = $("<button type=\"button\">Delete</button>");
        bt2.addClass("red");
        bt2.addClass("action-delete");
        bt2.attr("id", i);
        div_btn.append(bt2);

        div_btn.addClass("btns");
    
        td_btn.addClass("class-action");
        td_btn.append(div_btn);
        tr.append(td_btn);
        body.append(tr);
    }
    addAction();
}

let resetData = function()
{
    $("#irat").val(1);
    $("#inam, #iadd, #files").val("");
}

let addData = function(){
    resetData();

    $("#content_add").css("display", "block");
    $("#content_view, #content_upd").css("display", "none");
}

let showData = function(e){
    if(e) e.preventDefault();

    $("#content_view").css("display", "block");
    $("#content_upd, #content_add").css("display", "none");
    fillTableNew();
}

let onSubmit = function(){
    let aPlace = {Picture: "default.jpg"}

    aPlace.Name = $("#inam").val();
    aPlace.Address = $("#iadd").val();
    aPlace.Rating = $("#irat").val();

    let file = $("#files").prop("files")[0];
    if(file === undefined) places.push(aPlace);
    else getBase64(file, aPlace, 1);

    showData(null);
}

let onUpdate = function(id){
    pf("Got ID: " + id);

    places[id].Name = $("#unam").val();
    places[id].Address = $("#uadd").val();
    places[id].Rating = $("#urat").val();

    let file = $("#ufiles").prop("files")[0];
    if(file === undefined) showData(null);
    else getBase64(file, places[id], 0);
}

function getBase64(file, obj, flg) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //console.log(reader.result);
      obj.Picture = reader.result;
      if(flg) places.push(obj);
      showData(null);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

let updatePlace = function(id){
    pf("updating.." + id);

    $("#updBtn").unbind();

    $("#unam").val(places[id].Name);
    $("#uadd").val(places[id].Address);
    $("#urat").val(places[id].Rating);
    $("#ufiles").val("");

    $("#updBtn").click(function(){
        onUpdate(id);
    });

    $("#content_upd").css("display", "block");
    $("#content_add, #content_view").css("display", "none");    
}

let deletePlace = function(id){
    pf("deleting.." + id);

    places.splice(id, 1);
    fillTableNew();
}

/* START */
let addAction = function()
{
    $(".action-update").click(function(e){
        updatePlace(this.id);
    });
    $(".action-delete").click(function(e){
        deletePlace(this.id);
    });
}

let adButtonAction = function(){
    $(".action-link-show").click(function(e){
        showData(e);
    });
    $(".action-submit-add").click(function(e){
        onSubmit();
    });
    $(".action-reset").click(function(e){
        resetData()
    });
    $(".action-add").click(function(e){
        addData()
    });
}
fillTableNew();
addData();
adButtonAction();