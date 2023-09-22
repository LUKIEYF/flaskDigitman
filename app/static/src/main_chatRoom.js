import {ModelSpeech} from "./modelSpeech.js";

const modelInstance = new ModelSpeech();



$(document).ready(function(){

    window.onload = async ()=>{
        await modelInstance.createLive2dModel();
        modelInstance.chatAndSpeech("I am lukiee, how can i help you?")
    };
    
    // Send the form on enter keypress and avoid if shift is pressed
    $('#prompt').keypress(function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        
        $('form').submit();
    }
    });
    $('form').on('submit', function(event) {

        // console.log("on submit !!!! ")

        var submitButton = $('form button[type="submit"]');
        submitButton.prop("disabled",true)

        event.preventDefault();
        // get the CSRF token from the cookie
        var csrftoken = Cookies.get('csrftoken');
        
        // set the CSRF token in the AJAX headers
        $.ajaxSetup({
            headers: { 'X-CSRFToken': csrftoken }
        });
        // Get the prompt
        var prompt = $('#prompt').val();

        $.ajax({
            url: '/chatBox',
            type: 'POST',
            data: {prompt: prompt},
            dataType: 'json',
            success: function(data) {
            /// call back for the interaction
            modelInstance.chatAndSpeech(data.response);
            submitButton.prop("disabled",false)
            }
        });
    });

});

// window.addEventListener('beforeunload', function(event) {
//     // set the CSRF token in the AJAX headers
//     $.ajaxSetup({
//         headers: { 'X-CSRFToken': csrftoken }
//     });
//     // Get the prompt
//     var prompt = $('#prompt').val();

//     $.ajax({
//         url: '/chatBox',
//         type: 'POST',
//         data: {prompt: "clear"},
//         dataType: 'json',
//         success: function(data) {}
//     });
// });

