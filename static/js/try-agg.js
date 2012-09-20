$(function () {
    $('#answer-form').submit(function () {
        $.ajax({
            type:'POST',
            url:'/answer',
            data:$('#answer-input').val(),
            success: function success(data) {
                var message = $('#agg-message').show();
                if (data['ok']) {
                    message.html(data['message']).removeClass('alert-error').addClass('alert-success');
                } else {
                    message.html(data['error']).removeClass('alert-success').addClass('alert-error');
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
