import React, { Component } from "react";

class KommunicateChat extends React.Component {

   constructor(props){

       super(props);

   } 

componentDidMount(){

   (function(d, m){

       var kommunicateSettings =
           {
                "appId":"236f666cc9db61b429eaf89f6d65bc441",
                "popupWidget":true,
                "automaticChatOpenOnNavigation":false
            };

       var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;

       s.src = "https://widget.kommunicate.io/v2/kommunicate.app";

       var h = document.getElementsByTagName("head")[0]; h.appendChild(s);

       window.kommunicate = m; m._globals = kommunicateSettings;

   })(document, window.kommunicate || {});

}

render() {
    return(
    <div></div>
)}


}
export default KommunicateChat;