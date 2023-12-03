window.onload = function () {

    $("li").on("click", function(){

        var item = $(this);
        if(item.context.classList.contains("active")){
            document.getElementById("img01").src = item.context.children[0].src;
            document.getElementById("modal01").style.display = "block";
        }else {
            if(item.index() === 0) {
                desplazamiento = 150;
            }else {

                desplazamiento = item.context.children[0].clientWidth / 2;
                desplazamiento += item.siblings()[0].children[0].clientWidth / 2 + 10;
                for (var i = 1; i < item.index(); i++) {
                    desplazamiento += item.siblings()[i].children[0].clientWidth + 40;
                }

                desplazamiento = 150 - desplazamiento;

            }
            pos = desplazamiento + "px";

            item.addClass("active");
            item.siblings().removeClass("active");

            $("ul").css("left", pos);
        }

    });
}