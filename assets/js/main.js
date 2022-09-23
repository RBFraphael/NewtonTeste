jQuery(document).ready(function(){
    jQuery("#hero .carousel").slick({
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4500,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "ease-in-out",
        speed: 1500
    });

    jQuery("#our-space .carousel").slick({
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "ease-in-out",
        speed: 1500
    });

    jQuery("button.carousel-nav").on("click", function(e){
        e.preventDefault();
        var btn = jQuery(e.currentTarget);
        var carousel = btn.attr("data-target");
        if(btn.hasClass("next")){
            jQuery(carousel).slick("slickNext");
        } else {
            jQuery(carousel).slick("slickPrev");
        }
    });

    jQuery("form#contact-form").on("submit", function(e){
        e.preventDefault();
        
        var form = jQuery(e.currentTarget);
        var target = form.attr("action");
        var method = form.attr("method");
        var data = {
            name: form.find("input#name").val(),
            email: form.find("input#email").val(),
            subject: form.find("select#subject").val(),
            message: form.find("textarea#message").val(),
        };

        jQuery.ajax({
            url: target,
            method,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function(result){
                if(result.status == "success"){
                    Swal.fire(
                        'Sucesso',
                        'Sua mensagem foi enviada com sucesso. Em breve, entraremos em contato via e-mail.',
                        'success'
                    );

                    form.find("input,select,textarea").val("");
                } else {
                    Swal.fire(
                        'Erro',
                        'Ocorreu um erro inesperado durante o envio da mensagem. Por favor, tente novamente.',
                        'error'
                    );
                }
            },
            error: function(error){
                Swal.fire(
                    'Erro',
                    'Ocorreu um erro inesperado durante o envio da mensagem. Por favor, tente novamente.',
                    'error'
                );
            }
        });
    });

    AOS.init({
        duration: 750,
        easing: "ease-in-out",
        once: true,
        offset: 200
    });
});