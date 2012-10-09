$(function () {
    $('#answer-button').click(function () {
        var quiz_id = $('#quiz-id').val();
        var data = $.trim(answer.getValue());
        var first_char = data.charAt(0);
        console.log((first_char == '[' || first_char == "{") && data.indexOf(';') == -1)
        // Hacky injection test
        if ((first_char == '[' || first_char == "{") && data.indexOf(';') == -1) {
            $.globalEval("var data2 = [" + data + "]");
            data = data2;
            if ($.isArray(data[0])) {
                data = data[0];
            }
            data = JSON.stringify(data);
        }
        $.ajax({
            type:'POST',
            url:'/answer/' + quiz_id,
            data: data,
            success: function success(data) {
                var alert = $('#agg-message').show();
                var message = $('#agg-message #alert_msg');
                if (data['ok']) {
                    message.html("<h3>I say old bean nice one! Now try the next one!</h3>");
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