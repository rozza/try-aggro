$(function () {
    $('#answer-form').submit(function () {
        $.ajax({
            type:'POST',
            url:'/answer',
            data:$('#answer-input').val(),
            success: function success(data) {
                if (data['ok']) {
                    alert(data['message']);
                } else {
                    alert(data['error']);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            },
            dataType:'json'
        });

        return false;
    });
});
