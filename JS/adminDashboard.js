$(document).ready(function () {

    function showSection(section) {
        $(".dashboard-section").removeClass("active-section");
        $("#section-" + section).addClass("active-section");

        $(".menu-link").removeClass("active");
        $('.menu-link[data-section="' + section + '"]').addClass("active");

        var title = $('.menu-link[data-section="' + section + '"] span').text() || "Dashboard";
        $("#topTitle").text(title);

        if ($(window).width() < 992) {
            $("#sidebar").removeClass("open");
            $("#mobileOverlay").removeClass("show");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    $(document).on("click", ".menu-link[data-section], [data-section].view-all, .quick-actions button, .profile-menu a[data-section]", function (e) {
        e.preventDefault();
        var section = $(this).data("section");
        if (section) showSection(section);
    });

    $("#sidebarToggle").on("click", function () {
        if ($(window).width() < 992) {
            $("#sidebar").toggleClass("open");
            $("#mobileOverlay").toggleClass("show");
        } else {
            $("#sidebar").toggleClass("collapsed");
            if ($("#sidebar").hasClass("collapsed")) {
                $("#sidebar").css("width", "75px");
                $(".main-area").css({ "margin-left": "75px", "width": "calc(100% - 75px)" });
                $(".sidebar-brand div:last-child,.admin-mini div:last-child,.menu-title,.menu-link span").hide();
                $(".school-icon").css("margin-right", "0");
                $(".menu-link").css("justify-content", "center");
                $(".menu-link i").css("width", "auto");
            } else {
                $("#sidebar").css("width", "255px");
                $(".main-area").css({ "margin-left": "255px", "width": "calc(100% - 255px)" });
                $(".sidebar-brand div:last-child,.admin-mini div:last-child,.menu-title,.menu-link span").show();
                $(".school-icon").css("margin-right", "10px");
                $(".menu-link").css("justify-content", "flex-start");
                $(".menu-link i").css("width", "25px");
            }
        }
    });

    $("#mobileOverlay").on("click", function () {
        $("#sidebar").removeClass("open");
        $(this).removeClass("show");
    });

    $("#profileBtn").on("click", function (e) {
        e.stopPropagation();
        $("#profileMenu").toggle();
    });

    $(document).on("click", function () {
        $("#profileMenu").hide();
    });

    $(".local-search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        var target = $(this).data("target");
        $(target + " tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("#globalSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        var activeTable = $(".dashboard-section.active-section table");
        if (activeTable.length) {
            activeTable.find("tbody tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        }
    });

    $(".primary-action, .row-btn, .management-card button, .report-card button").on("click", function (e) {
        if ($(this).attr("data-section")) return;
        e.preventDefault();
        $("#toastMessage span").text("Frontend action clicked. Backend is not connected.");
        $("#toastMessage").fadeIn(200).delay(1800).fadeOut(300);
    });

    $("#logoutBtn, #logoutBtn2").on("click", function (e) {
        e.preventDefault();
        $("#toastMessage span").text("Logout button clicked. Backend authentication is not connected.");
        $("#toastMessage").fadeIn(200).delay(1800).fadeOut(300);
    });

    $(".icon-btn").on("click", function () {
        $("#toastMessage span").text("You have 3 new notifications.");
        $("#toastMessage").fadeIn(200).delay(1800).fadeOut(300);
    });

    $(window).on("resize", function () {
        if ($(window).width() >= 992) {
            $("#sidebar").removeClass("open");
            $("#mobileOverlay").removeClass("show");
        }
    });

});