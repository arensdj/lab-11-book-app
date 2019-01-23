
    $(".bookSelect").on('click', function(){
        if( $(".hiddenForm").attr('hidden', true)){
            $(".hiddenForm").attr('hidden', false);
        } else if($(".hiddenForm").attr('hidden', false)){
            $(".hiddenForm").attr('hidden', true);
        }
    });