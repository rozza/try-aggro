$(function () {
    $('#answer-button').click(function () {
        var quiz_id = $('#quiz-id').val();
        $.ajax({
            type:'POST',
            url:'/answer/' + quiz_id,
            data: answer.getValue(),
            success: function success(data) {
                var message = $('#agg-message');
                message.show();
                if (data['ok']) {
                    message.html(data['message']).removeClass('alert-error').addClass('alert-success');
                } else {
                    message.html(data['error']).removeClass('alert-success').addClass('alert-error');
                }
                result.setValue(data['result']);

                $('#result-nav').show();
                $('#result-nav a').tab('show');
                $('#correct-output-tab').tab('show');

            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            },
            dataType:'json'
        });

        return false;
    });
});