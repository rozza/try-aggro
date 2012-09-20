$(function () {
    $('#answer-button').click(function () {
        var quiz_id = $('#quiz-id').val();
        $.ajax({
            type:'POST',
            url:'/answer/' + quiz_id,
            data: answer.getValue(),
            success: function success(data) {
                var alert = $('#agg-message').show();
                console.log(data)
                var message = $('#agg-message #alert_msg');
                if (data['ok']) {
                    message.html("<h3>AWESOME! Now try the next one!</h3>");
                    alert.removeClass('alert-block').addClass('alert-success');
                } else {
                    message.html("<h3>Unlucky, thats not quite right - please try again!</h3>");
                    alert.removeClass('alert-success').addClass('alert-block');
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

    $('.alert .close').live("click", function(e) {
        $(this).parent().hide();
    });
});